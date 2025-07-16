/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import { isBackCameraName, isFrontCameraName } from "./cameraNames";
import { closeStreamTracks, createConstraints } from "./cameraUtils";

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

/**
 * Represents a camera device and its active stream.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack/getCapabilities for more details.
 */
export class Camera {
  /**
   * The device info.
   */
  deviceInfo: InputDeviceInfo;

  /**
   * Stream capabilities as reported by the stream.
   *
   * On iOS it's the same as `deviceCapabilities`. Firefox is only reporting
   * rudimentary capabilities, so we can't rely on this for picking the right
   * camera.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack/getCapabilities
   */
  streamCapabilities?: ReturnType<MediaStreamTrack["getCapabilities"]>;
  activeStream: MediaStream | undefined;
  name: string;
  facingMode: FacingMode;
  torchSupported = false;
  torchEnabled = false;
  singleShotSupported = false;
  maxSupportedResolution?: VideoResolutionName;

  /**
   * Reference to the original instance before it was proxied.
   */
  original = this;

  notify: (reason?: unknown) => void;
  notifyStateChange?: (camera: Camera, reason?: unknown) => void;

  /**
   * Device capabilities as reported by the device.
   *
   * Not available on Firefox.
   * Chrome doesn't report the torch capability, so we have to check for it on the stream.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/InputDeviceInfo/getCapabilities
   *
   * @deprecated Not used. Reconsider using once Firefox and Chrome align on this.
   */
  #deviceCapabilities?: ReturnType<InputDeviceInfo["getCapabilities"]>;

  /**
   * Creates a new Camera instance.
   *
   * @param deviceInfo - The device info.
   */
  constructor(deviceInfo: InputDeviceInfo) {
    if (deviceInfo.kind !== "videoinput") {
      throw new Error("Device is not a video input device");
    }

    this.deviceInfo = deviceInfo;
    this.name = deviceInfo.label;

    if (isFrontCameraName(deviceInfo.label)) {
      this.facingMode = "front";
    }

    if (isBackCameraName(deviceInfo.label)) {
      this.facingMode = "back";
    }

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const originalRef = this;

    // Apply the proxy to the instance
    const proxy = new Proxy(this, {
      set(target, property, value, receiver) {
        const oldValue = Reflect.get(target, property, receiver);

        const change = {
          property,
          oldValue,
          value,
        };

        originalRef.notify(change);

        return Reflect.set(target, property, value, receiver);
      },
    });

    this.notify = (reason?: unknown) => {
      this.notifyStateChange?.(proxy, reason);
    };

    // randomly rename the camera every 1-2 seconds
    // setInterval(
    //   () => {
    //     proxy.name = `${deviceInfo.label} ${Math.random()}`;
    //   },
    //   Math.random() * 1000 + 1000,
    // );

    return proxy;
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
    this.activeStream = stream;

    const videoTrack = stream.getVideoTracks()[0];

    // Happens when camera device disconnects
    videoTrack.onended = (e) => {
      this.stopStream();
      this.notify({
        event: e,
        payload: "TRACK_END",
      });
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

      let currentResolutionIndex =
        Object.keys(videoResolutions).indexOf(resolution);

      if (currentResolutionIndex === 0) {
        throw new Error("Failed to get camera stream");
      }

      // try a lower index
      const fallbackResolution = Object.keys(videoResolutions)[
        currentResolutionIndex - 1
      ] as VideoResolutionName;

      return await this.acquireStreamWithFallback(fallbackResolution);
    }
  }

  /**
   * Populates the camera instance with capabilities from the stream.
   *
   * @param stream - The stream to populate the capabilities from.
   */
  private populateCapabilities(stream: MediaStream) {
    this.streamCapabilities = stream.getVideoTracks()[0].getCapabilities();

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

    // store the max supported resolution
    if (!this.maxSupportedResolution && resolutionKey) {
      this.maxSupportedResolution = resolutionKey;
    }

    if ("torch" in this.streamCapabilities) {
      this.torchSupported = true;
    }

    if (
      "focusMode" in this.streamCapabilities &&
      this.streamCapabilities.focusMode?.includes("single-shot")
    ) {
      this.singleShotSupported = true;
    }

    // check for front/back mismatch and correct it
    if (
      this.facingMode === "front" &&
      this.streamCapabilities.facingMode?.includes("environment")
    ) {
      this.facingMode = "back";
      console.warn("Front camera selected, but facingMode is environment");
    }

    if (
      this.facingMode === "back" &&
      this.streamCapabilities.facingMode?.includes("user")
    ) {
      this.facingMode = "front";
      console.warn("Back camera selected, but facingMode is user");
    }

    // no facing mode present on construction
    if (!this.facingMode) {
      if (this.streamCapabilities.facingMode?.includes("environment")) {
        this.facingMode = "back";
      }
      if (this.streamCapabilities.facingMode?.includes("user")) {
        this.facingMode = "front";
      }
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
      this.torchEnabled = !this.torchEnabled;
    } catch (error) {
      console.error("Failed to toggle torch", error);
      // TODO: check assumption - can it fail even if supported?
      this.torchEnabled = false;
      this.torchSupported = false;
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
      this.activeStream = undefined;
      this.streamCapabilities = undefined;
      this.torchEnabled = false;
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
