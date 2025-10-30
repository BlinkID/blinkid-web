/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import { subscribeWithSelector } from "zustand/middleware";
import { createStore } from "zustand/vanilla";
import { CameraError } from "./cameraError";
import { isBackCameraName, isFrontCameraName } from "./cameraNames";
import { closeStreamTracks, createConstraints } from "./cameraUtils";
import { shallow } from "zustand/shallow";

interface CameraState {
  deviceInfo: InputDeviceInfo;
  activeStream: MediaStream | undefined;
  name: string;
  facingMode: FacingMode;
  torchSupported: boolean;
  torchEnabled: boolean;
  singleShotSupported: boolean;
  maxSupportedResolution?: VideoResolutionName;
  streamCapabilities?: ReturnType<MediaStreamTrack["getCapabilities"]>;
  error?: CameraError;
}

/**
 * The initial state of the camera.
 *
 * It's important to cast as `CameraState` to avoid TypeScript errors. We use
 * this for better type inferrence in the store, as some types can't be imported
 * directly.
 */
const initialCameraState: CameraState = {
  deviceInfo: {},
  name: "",
  facingMode: undefined,
  activeStream: undefined,
  torchSupported: false,
  torchEnabled: false,
  singleShotSupported: false,
  maxSupportedResolution: undefined,
  streamCapabilities: undefined,
  error: undefined,
} as CameraState;

/**
 * Represents a camera device and its active stream.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack/getCapabilities for more details.
 */
export class Camera {
  /**
   * The internal state of the camera, implemented as a Zustand store.
   */
  store = createStore<CameraState>()(
    subscribeWithSelector(() => initialCameraState),
  );

  #subscribers = new Set<() => void>();

  /**
   * The device info.
   */
  get deviceInfo(): InputDeviceInfo {
    return this.store.getState().deviceInfo;
  }

  /**
   * Stream capabilities as reported by the stream.
   *
   * On iOS it's the same as `deviceCapabilities`. Firefox is only reporting
   * rudimentary capabilities, so we can't rely on this for picking the right
   * camera.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack/getCapabilities
   */
  get streamCapabilities() {
    return this.store.getState().streamCapabilities;
  }

  get activeStream() {
    return this.store.getState().activeStream;
  }

  get name() {
    return this.store.getState().name;
  }

  get facingMode() {
    return this.store.getState().facingMode;
  }

  get torchSupported() {
    return this.store.getState().torchSupported;
  }

  get torchEnabled() {
    return this.store.getState().torchEnabled;
  }

  get singleShotSupported() {
    return this.store.getState().singleShotSupported;
  }

  get maxSupportedResolution(): VideoResolutionName | undefined {
    return this.store.getState().maxSupportedResolution;
  }

  /**
   * Creates a new Camera instance.
   *
   * @param deviceInfo - The device info.
   */
  constructor(deviceInfo: InputDeviceInfo) {
    if (deviceInfo.kind !== "videoinput") {
      throw new Error("Device is not a video input device");
    }

    let facingMode: FacingMode;
    if (isFrontCameraName(deviceInfo.label)) {
      facingMode = "front";
    }

    if (isBackCameraName(deviceInfo.label)) {
      facingMode = "back";
    }

    this.store.setState({
      deviceInfo,
      name: deviceInfo.label || "Unknown Camera",
      facingMode,
    });
  }

  // We need to re-implement subscribe here to add side effects, and the
  // typing is quite complex due to overloads.

  /**
   * Subscribe to camera state changes.
   *
   * @param listener - Listener function that gets called when state changes
   * @returns Unsubscribe function
   */
  subscribe(
    listener: (
      selectedState: CameraState,
      previousSelectedState: CameraState,
    ) => void,
  ): () => void;
  /**
   * Subscribe to camera state changes with selector.
   *
   * @param selector - Function to select specific state slice
   * @param listener - Listener function that gets called when selected state changes
   * @param options - Optional subscription options
   * @returns Unsubscribe function
   */
  subscribe<U>(
    selector: (state: CameraState) => U,
    listener: (selectedState: U, previousSelectedState: U) => void,
    options?: {
      equalityFn?: (a: U, b: U) => boolean;
      fireImmediately?: boolean;
    },
  ): () => void;
  subscribe(
    selectorOrListener:
      | ((
          selectedState: CameraState,
          previousSelectedState: CameraState,
        ) => void)
      | ((state: CameraState) => unknown),
    listener?: (selectedState: unknown, previousSelectedState: unknown) => void,
    options?: {
      equalityFn?: (a: unknown, b: unknown) => boolean;
      fireImmediately?: boolean;
    },
  ): () => void {
    // Add your side effects here
    console.debug(`Creating subscription for camera: ${this.name}`);

    // Call original method with proper argument handling
    let unsubscribe: () => void;

    if (listener) {
      // Called with selector
      unsubscribe = this.store.subscribe(
        selectorOrListener as (state: CameraState) => unknown,
        listener,
        options,
      );
    } else {
      // Called with just listener
      unsubscribe = this.store.subscribe(
        selectorOrListener as (
          selectedState: CameraState,
          previousSelectedState: CameraState,
        ) => void,
      );
    }

    this.#subscribers.add(unsubscribe);

    // Wrap unsubscribe with side effects if needed
    return () => {
      console.debug(`Removing subscription for camera: ${this.name}`);
      this.#subscribers.delete(unsubscribe);
      return unsubscribe();
    };
  }

  unsubscribeAll() {
    this.#subscribers.forEach((unsubscribe) => unsubscribe());
    this.#subscribers.clear();
  }

  /**
   * Starts a stream with the specified resolution.
   *
   * @param resolution - The resolution to start the stream with.
   * @returns The stream.
   */
  async startStream(resolution: VideoResolutionName): Promise<MediaStream> {
    if (this.activeStream) {
      return this.activeStream;
    }

    // use max supported resolution if we know it
    if (this.maxSupportedResolution) {
      resolution = this.maxSupportedResolution;
    }

    const stream = await this.acquireStreamWithFallback(resolution);

    this.populateCapabilities(stream);
    this.store.setState({ activeStream: stream });

    const videoTrack = stream.getVideoTracks()[0];

    // Happens when camera device disconnects
    videoTrack.onended = () => {
      this.store.setState({
        error: new CameraError(
          "Camera stream ended unexpectedly",
          "STREAM_ENDED_UNEXPECTEDLY",
        ),
      });
      this.stopStream();
    };

    return stream;
  }

  /**
   * Acquires a camera stream with the specified resolution.
   * If acquisition fails, it tries a lower resolution as fallback.
   *
   * @param resolution - The resolution to acquire the stream with.
   * @returns The stream.
   */
  private async acquireStreamWithFallback(
    resolution: VideoResolutionName,
  ): Promise<MediaStream> {
    try {
      const constraints = createConstraints(
        resolution,
        this.facingMode,
        this.deviceInfo.deviceId,
      );

      // can throw if device is currently in use by another process
      return await navigator.mediaDevices.getUserMedia(constraints);
    } catch (error) {
      // This branch shouldn't happen as we are using `ideal` when making
      // constraints, however it's a good fallback to have
      console.warn(
        `Can't get camera stream for ${this.name} at ${resolution}`,
        error,
      );

      const currentResolutionIndex =
        Object.keys(videoResolutions).indexOf(resolution);

      if (currentResolutionIndex === 0) {
        throw new Error("Failed to get camera stream");
      }

      // try a lower index
      const fallbackResolution = Object.keys(videoResolutions)[
        currentResolutionIndex - 1
      ] as VideoResolutionName;

      return this.acquireStreamWithFallback(fallbackResolution);
    }
  }

  /**
   * Populates the camera instance with capabilities from the stream.
   *
   * @param stream - The stream to populate the capabilities from.
   */
  private populateCapabilities(stream: MediaStream) {
    const streamCapabilities = stream.getVideoTracks()[0].getCapabilities();

    // shallow compare and set to avoid unnecessary updates
    const same = shallow(streamCapabilities, this.streamCapabilities);

    if (!same) {
      this.store.setState({ streamCapabilities });
    }

    const videoTrack = stream.getVideoTracks()[0];
    const trackSettings = videoTrack.getSettings();

    if (!trackSettings.width || !trackSettings.height) {
      throw new Error(
        "Video track resolution not available. Should not happen.",
      );
    }

    const videoTrackResolution = {
      width: trackSettings.width,
      height: trackSettings.height,
    };

    const resolutionKey = findResolutionKey(videoTrackResolution);

    const newState: Partial<CameraState> = {};

    // store the max supported resolution
    if (!this.maxSupportedResolution && resolutionKey) {
      newState.maxSupportedResolution = resolutionKey;
    }

    if ("torch" in streamCapabilities) {
      newState.torchSupported = true;
    }

    if (
      "focusMode" in streamCapabilities &&
      streamCapabilities.focusMode?.includes("single-shot")
    ) {
      newState.singleShotSupported = true;
    }

    // check for front/back mismatch and correct it
    if (
      this.facingMode === "front" &&
      streamCapabilities.facingMode?.includes("environment")
    ) {
      newState.facingMode = "back";
      console.warn("Front camera selected, but facingMode is environment");
    }

    if (
      this.facingMode === "back" &&
      streamCapabilities.facingMode?.includes("user")
    ) {
      newState.facingMode = "front";
      console.warn("Back camera selected, but facingMode is user");
    }

    // no facing mode present on construction
    if (!this.facingMode) {
      if (streamCapabilities.facingMode?.includes("environment")) {
        newState.facingMode = "back";
      }
      if (streamCapabilities.facingMode?.includes("user")) {
        newState.facingMode = "front";
      }
    }

    // another manual shallow compare and set to avoid unnecessary updates
    const sameState = shallow(newState, this.store.getState());
    if (!sameState) {
      this.store.setState(newState);
    }
  }

  /**
   * Toggles the torch on the camera.
   *
   * @returns The torch status.
   */
  async toggleTorch() {
    const videoTrack = this.getVideoTrack();

    if (!videoTrack) {
      throw new Error("No active stream on Camera instance.");
    }

    if (!this.torchSupported) {
      throw new Error("Torch not supported on this device.");
    }

    try {
      await videoTrack.applyConstraints({
        advanced: [
          {
            torch: !this.torchEnabled,
          },
        ],
      });
      this.store.setState({ torchEnabled: !this.torchEnabled });
    } catch (error) {
      console.error("Failed to toggle torch", error);
      // TODO: check assumption - can it fail even if supported?
      this.store.setState({ torchEnabled: false, torchSupported: false });
      throw new Error("Failed to toggle torch", { cause: error });
    }

    return this.torchEnabled;
  }

  /**
   * Stops the stream on the camera.
   */
  stopStream() {
    if (this.activeStream) {
      console.debug(`Stopping active stream on ${this.name}`);
      closeStreamTracks(this.activeStream);
      this.store.setState({
        activeStream: undefined,
        streamCapabilities: undefined,
        torchEnabled: false,
      });
    }
  }

  /**
   * Gets the video track on the camera.
   *
   * @returns The video track.
   */
  getVideoTrack() {
    if (!this.activeStream) {
      console.warn(`No active stream on Camera instance: ${this.name}.`);
      return;
    }

    return this.activeStream.getVideoTracks()[0];
  }
}

export type FacingMode = "front" | "back" | undefined;

/**
 * Available video resolutions for the camera stream.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackConstraints/width for width details.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackConstraints/height for height details.
 */
export const videoResolutions = {
  "720p": { width: 1280, height: 720 },
  "1080p": { width: 1920, height: 1080 },
  "4k": { width: 3840, height: 2160 },
} as const satisfies Record<string, Resolution>;

/**
 * Represents a video resolution.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackConstraints/width for width details.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackConstraints/height for height details.
 */
export type Resolution = {
  width: number;
  height: number;
};

/**
 * Represents a video resolution name.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackConstraints/width for width details.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackConstraints/height for height details.
 */
export type VideoResolutionName = keyof typeof videoResolutions;

/**
 * Returns the longer side of a resolution.
 *
 * @param resolution - The resolution to get the longer side of.
 * @returns The longer side of the resolution.
 */
export function returnLongerSide(resolution: Resolution): number {
  return Math.max(resolution.width, resolution.height);
}

/**
 * Normalizes a resolution to the longer side.
 *
 * @param resolution - The resolution to normalize.
 * @returns The normalized resolution.
 */
export function getNormalizedResolution(resolution: Resolution): Resolution {
  const normalized = {
    width: Math.max(resolution.width, resolution.height),
    height: Math.min(resolution.width, resolution.height),
  };

  // account for errors in floating point calculations
  const epsilon = 0.0001;
  if (Math.abs(normalized.width / normalized.height - 16 / 9) > epsilon) {
    console.warn(
      `Resolution ${JSON.stringify(
        resolution,
      )} is not 16:9, may cause issues with some video players.`,
    );
  }

  return normalized;
}

/**
 * Matches the closest resolution to the given resolution.
 *
 * @param resolution - The resolution to match.
 * @returns The closest resolution.
 */
export function matchClosestResolution(
  resolution: Resolution,
): VideoResolutionName {
  const actualWidth = returnLongerSide(resolution);
  if (actualWidth > 1920) {
    return "4k";
  } else if (actualWidth > 1280) {
    return "1080p";
  } else {
    return "720p";
  }
}

/**
 * Finds the closest resolution key to the given resolution.
 *
 * @param videoTrackResolution - The resolution to find the closest key for.
 * @returns The closest resolution key.
 */
export function findResolutionKey(
  videoTrackResolution: Resolution,
): VideoResolutionName {
  // can be inverted in portrait mode on mobile
  const normalizedResolution = getNormalizedResolution(videoTrackResolution);
  // find a matching resolution in `videoResolutions`
  const resolutionMatch = Object.entries(videoResolutions).find(
    ([key, value]) => {
      return (
        value.width === normalizedResolution.width &&
        value.height === normalizedResolution.height
      );
    },
  );

  if (!resolutionMatch) {
    const closestMatch = matchClosestResolution(videoTrackResolution);

    console.warn(
      `No exact resolution match found for ${JSON.stringify(videoTrackResolution)}, categorizing as ${closestMatch}`,
    );

    return closestMatch;
  }

  const resolutionKey = resolutionMatch[0] as keyof typeof videoResolutions;

  return resolutionKey;
}
