/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import { ConnectionObserver } from "@wessberg/connection-observer";
import { radEventListener } from "rad-event-listener";

import { Camera, FacingMode, VideoResolutionName } from "./Camera";
import { CameraError } from "./cameraError";
import {
  askForCameraPermission,
  createCameras,
  findIdealCamera,
  obtainVideoInputDevices,
} from "./cameraUtils";

import {
  PlaybackState,
  resetCameraManagerStore as resetStore,
  cameraManagerStore as store,
} from "./cameraManagerStore";

import { stripIndents } from "common-tags";
import { Promisable } from "type-fest";
import { asError } from "./utils";
import {
  ExtractionArea,
  isBufferDetached,
  VideoFrameProcessor,
  VideoFrameProcessorInitOptions,
} from "./VideoFrameProcessor";

/**
 * The CameraManager class.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack/getCapabilities for more details.
 */
export class CameraManager {
  #resumeRequest?: Exclude<PlaybackState, "idle">;

  /**
   * The desired video resolution for camera streams. This is used as the ideal resolution
   * when starting camera streams. If a camera doesn't support the specified resolution,
   * the camera will automatically fall back to the next lower supported resolution in this order:
   * 4k → 1080p → 720p. The actual resolution used may differ from this setting based on
   * camera capabilities and system constraints.
   */
  #resolution: VideoResolutionName;

  #videoFrameRequestId:
    | ReturnType<HTMLVideoElement["requestVideoFrameCallback"]>
    | undefined;
  #videoFrameProcessor: VideoFrameProcessor;
  #mirrorFrontCameras: boolean;

  #eventListenerCleanup?: () => void;

  /**
   * If true, the user has initiated an abort. This will prevent the
   * CameraManager from throwing errors when the user interrupts the process.
   */
  #userInitiatedAbort = false;

  /**
   * If true, the user has initiated an abort. This will prevent the
   * CameraManager from throwing errors when the user interrupts the process.
   */
  get userInitiatedAbort() {
    return this.#userInitiatedAbort;
  }

  set userInitiatedAbort(value: boolean) {
    this.#userInitiatedAbort = value;
  }

  /**
   * Sets the area of the video frame that will be extracted.
   *
   * @param extractionArea The area of the video frame that will be extracted.
   */
  setExtractionArea(extractionArea: ExtractionArea) {
    const currentExtractionArea = store.getState().extractionArea;

    // shallow compare to prevent frequent updates
    if (
      currentExtractionArea &&
      currentExtractionArea.x === extractionArea.x &&
      currentExtractionArea.y === extractionArea.y &&
      currentExtractionArea.width === extractionArea.width &&
      currentExtractionArea.height === extractionArea.height
    ) {
      return;
    }
    store.setState({
      extractionArea,
    });
  }

  /**
   * Gets the area of the video frame that will be extracted.
   *
   * @returns The area of the video frame that will be extracted.
   */
  get extractionArea() {
    return store.getState().extractionArea;
  }

  /**
   * Callbacks that will be triggered on each frame when the playback state is
   * "capturing".
   */
  #frameCaptureCallbacks = new Set<FrameCaptureCallback>();

  /**
   * Creates a new CameraManager instance.
   *
   * @param options - The options for the CameraManager.
   * @param videoFrameProcessorOptions - The options for the VideoFrameProcessor.
   */
  constructor(
    options: Partial<CameraManagerOptions> = {},
    videoFrameProcessorOptions?: VideoFrameProcessorInitOptions,
  ) {
    const { mirrorFrontCameras, preferredResolution }: CameraManagerOptions = {
      ...defaultCameraManagerOptions,
      ...options,
    };

    this.#resolution = preferredResolution;
    this.#videoFrameProcessor = new VideoFrameProcessor(
      videoFrameProcessorOptions,
    );
    this.#mirrorFrontCameras = mirrorFrontCameras;
  }

  /**
   * Sets the desired video resolution for camera streams. This is used as the ideal resolution
   * when starting camera streams. If a camera doesn't support the specified resolution,
   * the camera will automatically fall back to the next lower supported resolution in this order:
   * 4k → 1080p → 720p. If there's an active stream, it will be restarted with the new resolution.
   *
   * @param resolution - The ideal resolution to set for camera streams.
   */
  setResolution = async (resolution: VideoResolutionName) => {
    this.#resolution = resolution;

    const playbackState = this.getState().playbackState;

    if (playbackState !== "idle") {
      this.#resumeRequest = playbackState;
      this.stopStream();
      await this.startCameraStream();
    }
  };

  /**
   * The desired video resolution for camera streams. This is used as the ideal resolution
   * when starting camera streams. If a camera doesn't support the specified resolution,
   * the camera will automatically fall back to the next lower supported resolution in this order:
   * 4k → 1080p → 720p. The actual resolution used may differ from this setting based on
   * camera capabilities and system constraints.
   */
  get resolution() {
    return this.#resolution;
  }

  /**
   * True if there is a video playing or capturing
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/MediaSession/playbackState for more details.
   */
  get isActive() {
    // TODO: see if we can simplify this, by observing the video playback state
    return store.getState().playbackState !== "idle";
  }

  /**
   * Sets the facing filter.
   *
   * @param facingFilter - The facing filter.
   */
  setFacingFilter(facingFilter: FacingMode[]) {
    store.setState({
      facingFilter,
    });
  }

  /**
   * Returns the cameras that are available to the user, filtered by the facing mode.
   * If no facing mode is set, all cameras are returned.
   *
   * @returns The cameras that are available to the user, filtered by the facing mode.
   */
  async getCameraDevices() {
    let allCameras = store.getState().cameras;
    const facingFilter = store.getState().facingFilter;

    if (!allCameras.length) {
      await this.refreshCameraDevices();
    }

    // get fresh state
    allCameras = store.getState().cameras;

    if (!facingFilter) {
      return allCameras;
    }

    const filteredCameras = allCameras.filter((camera) =>
      facingFilter.includes(camera.facingMode),
    );

    return filteredCameras;
  }

  get selectedCamera() {
    return store.getState().selectedCamera;
  }

  /**
   * Single-time setup for a video element.
   *
   * @param videoElement - The video element to initialize.
   */
  #initVideoElement(videoElement: HTMLVideoElement) {
    if (!(videoElement instanceof HTMLVideoElement)) {
      throw new Error(
        `Expected an HTMLVideoElement, got ${typeof videoElement}`,
        {
          cause: videoElement,
        },
      );
    }

    store.setState({
      videoElement,
    });

    /**
     * Added additional listener to "resize" event on the video element because some iPhone devices
     * do not have updated video dimensions when the resize observer callback is called.
     */
    const videoResolutionChangeCleanup = radEventListener(
      videoElement,
      "resize",
      () => {
        const prev = store.getState().videoResolution;

        // shallow compare to prevent frequent updates
        if (
          prev?.width === videoElement.videoWidth &&
          prev?.height === videoElement.videoHeight
        ) {
          return;
        }

        store.setState({
          videoResolution: {
            width: videoElement.videoWidth,
            height: videoElement.videoHeight,
          },
        });
      },
    );

    // video disconnect / dismount callback
    const connectionObserver = new ConnectionObserver((entries) => {
      if (!entries[0].connected) {
        this.releaseVideoElement();
      }
    });
    connectionObserver.observe(videoElement);

    // set up video for autoplay
    videoElement.setAttribute("playsInline", "");
    videoElement.setAttribute("muted", "");
    videoElement.controls = false;

    // add event listener which will pause the stream
    // when the website is in the background
    let previousPlaybackState: PlaybackState = "idle";

    // TODO: doesn't work if document is unfocused during stream starting
    const cleanupVisibilityListener = radEventListener(
      document,
      "visibilitychange",
      async () => {
        const isHidden = document.hidden;

        if (isHidden) {
          previousPlaybackState = store.getState().playbackState;
          this.stopStream();
          return;
        }

        // Visible again
        // Resume stream when document becomes visible
        switch (previousPlaybackState) {
          case "playback":
            await this.startCameraStream();
            await this.startPlayback();
            break;
          case "capturing":
            await this.startCameraStream();
            await this.startFrameCapture();
            break;
        }
      },
    );

    this.#eventListenerCleanup = () => {
      cleanupVisibilityListener();
      videoResolutionChangeCleanup();
      connectionObserver.disconnect();
    };
  }

  /**
   * Initializes the CameraManager with a video element.
   *
   * @param videoElement - The video element to initialize.
   */
  initVideoElement(videoElement: HTMLVideoElement) {
    try {
      this.#initVideoElement(videoElement);
    } catch (error) {
      if (this.userInitiatedAbort) {
        this.reset();
      } else {
        throw error;
      }
    }
  }

  /**
   * Adds a callback that will be triggered on each frame when the playback state
   * is "capturing".
   *
   * @param frameCaptureCallback - The callback to add.
   * @returns a cleanup function to remove the callback
   */
  addFrameCaptureCallback(frameCaptureCallback: FrameCaptureCallback) {
    this.#frameCaptureCallbacks.add(frameCaptureCallback);
    return () => this.#frameCaptureCallbacks.delete(frameCaptureCallback);
  }

  /**
   * Cleans up the video element, and stops the stream.
   */
  releaseVideoElement() {
    this.#eventListenerCleanup?.();
    store.setState({
      videoElement: undefined,
    });
    this.stopStream();
  }

  // TODO: might become a private method in the future as an implementation detail of `startStream`
  /**
   * Select a camera device from available ones.
   *
   * @param camera - The camera to select.
   */
  async selectCamera(camera: Camera) {
    // DOES NOT MODIFY playbackState

    // if playing or capturing frames, we need to resume after we're done swapping
    const playbackState = store.getState().playbackState;

    if (playbackState !== "idle") {
      this.#resumeRequest = playbackState;
    }

    const state = store.getState();

    // no-op if we're already selected
    if (state.selectedCamera === camera) {
      console.debug("Already selected");
      return;
    }

    // prevent race conditions
    if (state.isSwappingCamera) {
      console.debug("Already swapping");
      return;
    }

    store.setState({
      isSwappingCamera: true,
    });

    // stop the previous camera stream if it exists
    if (state.selectedCamera?.activeStream) {
      console.debug("Stopping previous stream");
      state.selectedCamera.stopStream();
    }

    // clear the video element source
    if (state.videoElement) {
      state.videoElement.srcObject = null;
    }

    store.setState({
      selectedCamera: camera,
      isSwappingCamera: false,
    });

    if (this.#resumeRequest === "playback") {
      console.debug("Starting new stream");
      await this.startPlayback();
    }

    if (this.#resumeRequest === "capturing") {
      console.debug("Resuming frame capture");
      await this.startFrameCapture();
    }

    // remove the resume request
    this.#resumeRequest = undefined;
  }

  /**
   * Refreshes available devices on the system and updates the state.
   *
   * @returns resolves when the camera devices are refreshed
   */
  async refreshCameraDevices() {
    // prevent race conditions
    if (
      store.getState().isQueryingCameras ||
      store.getState().isSwappingCamera
    ) {
      console.debug("Already querying cameras");
      return;
    }

    if (store.getState().cameraPermission === "prompt") {
      console.debug("Still waiting for user to respond");
      return;
    }

    store.setState({
      isQueryingCameras: true,
    });

    // run as a macrotask in parallel with `obtainVideoInputDevices`
    window.setTimeout(() => {
      // fetch new state because of stale closures
      const newState = store.getState();
      if (newState.isQueryingCameras) {
        store.setState({
          cameraPermission: "prompt",
        });
      }

      if (
        !newState.isQueryingCameras &&
        newState.cameraPermission === "denied"
      ) {
        store.setState({
          cameraPermission: "blocked",
        });
      }
    }, 100);

    const availableCameras = await obtainVideoInputDevices().catch((err) => {
      if (err instanceof CameraError && err.code === "PERMISSION_DENIED") {
        store.setState({
          errorState: asError(err),
          cameraPermission: "denied",
          isQueryingCameras: false,
        });
      }

      // rethrow error
      throw err;
    });

    // We won't reach here due to rethrowing
    store.setState({
      cameraPermission: "granted",
    });

    const cameras = createCameras(availableCameras);

    cameras.forEach((camera) => {
      // avoid reassigning listeners
      camera.unsubscribeAll();

      // Subscription to reflect the camera state changes in the selected camera state
      camera.subscribe((cameraState) => {
        // Camera state has changed, update the camera list in the manager state
        window.queueMicrotask(() => {
          const cameraManagerState = store.getState();
          const selectedCamera = cameraManagerState.selectedCamera;

          // only update the selected camera to trigger state updates
          if (camera === selectedCamera) {
            store.setState({
              selectedCamera: camera,
            });
          }

          let permissionRevoked = false;
          let permissionError: Error;

          if (cameraState.error?.code === "STREAM_ENDED_UNEXPECTEDLY") {
            askForCameraPermission()
              .catch((err) => {
                if (
                  err instanceof CameraError &&
                  err.code === "PERMISSION_DENIED"
                ) {
                  permissionRevoked = true;
                  permissionError = err;
                }
              })
              .finally(() => {
                store.setState({
                  errorState: permissionError,
                  playbackState: "idle",
                  cameraPermission: permissionRevoked ? "denied" : "granted",
                });
              });
          }
        });
      });

      // subscribe to camera state changes and reflect them in the manager state
      camera.subscribe(
        // need a custom selector to be able to use a custom `equalityFn` with zustand middleware
        (cameraState) => cameraState,
        () => {
          // Camera state has changed, update the camera list in the manager state
          window.queueMicrotask(() => {
            store.setState({
              cameras: [...store.getState().cameras],
            });
          });
        },
        // Use a custom equality function to prevent updating all cameras list for
        // every minor change in camera state
        {
          equalityFn: (a, b) => {
            const keysToCompare: (keyof typeof a)[] = [
              "torchSupported",
              "singleShotSupported",
              "facingMode",
              "maxSupportedResolution",
              "name",
            ];

            return keysToCompare.every((key) => a[key] === b[key]);
          },
        },
      );
    });

    store.setState({
      cameras: cameras,
      isQueryingCameras: false,
    });
  }

  /**
   * Starts the video playback
   *
   * @returns resolves when playback starts
   */
  async startPlayback() {
    const state = store.getState();

    // No-op if we're already playing.
    if (this.isActive && !this.#resumeRequest) {
      // console.debug("Already playing");
      return;
    }

    if (!state.videoElement) {
      console.warn("Starting playback - no video element present.");
      return;
    }

    if (!state.selectedCamera) {
      console.warn("Select a camera first.");
      return;
    }

    // assign new stream if it doesn't exist
    if (!state.selectedCamera.activeStream) {
      const stream = await state.selectedCamera.startStream(this.resolution);
      state.videoElement.srcObject = stream;
    }

    try {
      this.#applyMirrorIfNeeded();

      await state.videoElement.play();
      store.setState({
        playbackState: "playback",
      });
    } catch (error) {
      console.error("Failed to start playback", error);
      store.setState({
        errorState: asError(error),
      });
      throw error;
    }
  }

  /**
   * Starts playback and frame capturing.
   *
   * @returns resolves when frame capture starts
   */
  async #startFrameCapture() {
    const state = store.getState();

    if (this.userInitiatedAbort) {
      return;
    }

    // No-op if we're already capturing frames
    if (
      state.playbackState === "capturing" &&
      this.#resumeRequest !== "capturing"
    ) {
      return;
    }
    // otherwise, we're resuming or starting

    if (!state.videoElement) {
      console.warn(
        "Missing video element. Setup a video element first using `initVideoElement`",
      );
      return;
    }

    if (!state.selectedCamera) {
      console.warn(
        "No active camera! Select a camera first, or use `startCameraStream`",
      );
      return;
    }

    await this.startPlayback();

    store.setState({
      playbackState: "capturing",
    });

    this.#queueFrame();

    this.#resumeRequest = undefined;
  }

  /**
   * Starts capturing frames from the video element.
   *
   * @returns resolves when frame capture starts
   */
  startFrameCapture = async () => {
    try {
      await this.#startFrameCapture();
    } catch (error) {
      if (this.userInitiatedAbort) {
        this.reset();
      } else {
        throw error;
      }
    }
  };

  /**
   * Starts a camera stream.
   *
   * @param params - The parameters for the camera stream.
   * @returns resolves when the camera stream starts
   */
  async #startCameraStream({
    autoplay = true,
    preferredCamera,
    preferredFacing = "back",
  }: StartCameraStreamOptions = {}) {
    const videoElement = store.getState().videoElement;

    if (!videoElement) {
      console.warn("Can't start stream without a video element");
      return;
    }

    if (this.isActive && !this.#resumeRequest) {
      console.warn("Already streaming");
      return;
    }

    // Use the preferred camera if provided
    if (preferredCamera instanceof Camera) {
      await this.selectCamera(preferredCamera);
    }

    if (!store.getState().selectedCamera) {
      // Select a camera if none is preselected
      try {
        // This returns a list of cameras filtered by facing mode
        const cameras = await this.getCameraDevices();

        let selectedCamera: Camera | undefined;

        if (!cameras.length) {
          console.warn("Camera list is empty");
          throw new Error(
            `No cameras found matching the filter ${preferredFacing}`,
          );
        }

        // If a camera getter is provided, use it to select the camera
        // from the available cameras
        if (typeof preferredCamera === "function") {
          selectedCamera = preferredCamera(cameras);
          if (!selectedCamera) {
            console.warn(
              `No camera found matching the preferred camera function, falling back to facing mode`,
            );
          }
        }

        // Otherwise, use use the `findIdealCamera` function to select the camera
        if (!selectedCamera) {
          selectedCamera = await findIdealCamera(
            cameras,
            this.resolution,
            preferredFacing,
          );
        }

        if (!selectedCamera) {
          throw new Error(
            `No cameras found matching the filter ${preferredFacing}`,
          );
        }

        await this.selectCamera(selectedCamera);

        // clear error state if the error was a permission error
        // and the user has granted permission
        if (this.#hasPermissionError()) {
          store.setState({
            errorState: undefined,
          });
        }
      } catch (error) {
        store.setState({
          errorState: asError(error),
        });
        throw error;
      }
    }

    // capture new state as it's been modified
    const selectedCamera = store.getState().selectedCamera;

    // something went wrong during camera selection?
    if (!selectedCamera) {
      console.warn("No selected camera!");
      throw new Error("No selected camera");
    }

    const stream = await selectedCamera.startStream(this.#resolution);

    if (!videoElement.isConnected) {
      throw new Error("Video element needs to be in the document!");
    }

    videoElement.srcObject = stream;

    store.setState({
      videoElement,
    });

    if (autoplay) {
      await this.startPlayback();
    }

    if (this.#resumeRequest === "capturing") {
      console.debug("Resuming frame capture");
      await this.startFrameCapture();
    }

    if (this.#resumeRequest === "playback") {
      console.debug("Resuming playback");
      await this.startPlayback();
    }
  }

  /**
   * Starts a best-effort camera stream. Will pick a camera automatically if
   * none is selected.
   *
   * @param params - The parameters for the camera stream.
   * @returns resolves when the camera stream starts
   */
  async startCameraStream(params: StartCameraStreamOptions = {}) {
    try {
      await this.#startCameraStream(params);
    } catch (error) {
      if (this.userInitiatedAbort) {
        this.reset();
      } else {
        throw error;
      }
    }
  }

  /**
   * Checks if the error state is a permission error.
   *
   * @returns true if the error state is a permission error
   */
  #hasPermissionError = () => {
    const errorState = store.getState().errorState;

    return (
      errorState instanceof CameraError &&
      errorState.code === "PERMISSION_DENIED"
    );
  };

  /**
   * Pauses capturing frames, without stopping playback.
   */
  stopFrameCapture() {
    store.setState({
      playbackState: "playback",
    });
  }

  /**
   * Stops the currently active stream. Also stops the video playback and capturing process.
   */
  stopStream() {
    console.debug("stopStream called");
    const state = store.getState();
    this.pausePlayback();

    state.selectedCamera?.stopStream();

    if (state.videoElement) {
      state.videoElement.srcObject = null;
    }
  }

  /**
   * Pauses the video playback. This will also stop the capturing process.
   */
  pausePlayback() {
    console.debug("pausePlayback called");
    const video = store.getState().videoElement;

    store.setState({
      playbackState: "idle",
    });

    if (!video) {
      return;
    }

    if (this.#videoFrameRequestId) {
      video.cancelVideoFrameCallback(this.#videoFrameRequestId);
    }

    video.pause();
  }

  /**
   * The main recognition loop. Do not call this method directly, use `#queueFrame` instead.
   */
  async #loop() {
    const state = store.getState();

    if (this.#videoFrameRequestId === undefined) {
      console.error("Missing request ID");
      return;
    }

    if (!state.videoElement) {
      // shouldn't happen as disconnecting is handled by an observer which will
      // pause the loop
      console.warn("Missing video element, should not happen");
      return;
    }

    if (!state.extractionArea) {
      console.warn(
        "Stream started before extraction area was set, skipping frame.",
      );
      return;
    }

    const isSameOrientation =
      state.videoElement.videoHeight >= state.videoElement.videoWidth ===
      state.extractionArea.height >= state.extractionArea.width;

    if (!isSameOrientation) {
      // elements not in sync, wait for next frame
      return this.#queueFrame();
    }

    if (this.#frameCaptureCallbacks.size !== 0) {
      const capturedFrame = this.#videoFrameProcessor.getImageData(
        state.videoElement,
        state.extractionArea,
      );

      // Iterate over all frame capture callbacks
      for (const callback of this.#frameCaptureCallbacks) {
        const workingFrame = isBufferDetached(capturedFrame.data.buffer)
          ? this.#videoFrameProcessor.getCurrentImageData()
          : capturedFrame;

        // Process the frame and potentially get a new buffer back
        const returnedBuffer = await callback(workingFrame);

        // Exit current iteration if we didn't get a buffer back
        if (!returnedBuffer) {
          continue;
        }

        if (!(returnedBuffer instanceof ArrayBuffer)) {
          throw new Error(
            stripIndents`
              Frame capture callback did not return an ArrayBuffer.
              Make sure to return the underlying buffer, not the view.
            `,
          );
        }

        // Return the buffer to the processor
        this.#videoFrameProcessor.reattachArrayBuffer(returnedBuffer);
      }
    }

    this.#queueFrame();
  }

  /**
   * Queues the next frame to be processed.
   */
  #queueFrame() {
    const state = store.getState();

    if (state.playbackState !== "capturing") {
      return;
    }

    if (!state.videoElement) {
      console.warn("Missing video element, should not happen");
      return;
    }

    // clean up previous frame callback if it exists
    if (this.#videoFrameRequestId) {
      state.videoElement.cancelVideoFrameCallback(this.#videoFrameRequestId);
    }

    this.#videoFrameRequestId = state.videoElement.requestVideoFrameCallback(
      () => void this.#loop(),
    );
  }

  /**
   * Applies a mirror effect to the video if the camera is front-facing.
   * Assumes that desktop devices don't return a facing mode and that they are front-facing.
   */
  #applyMirrorIfNeeded() {
    const camera = store.getState().selectedCamera;

    if (!camera) {
      console.warn("No camera selected");
      return;
    }

    if (!this.#mirrorFrontCameras) {
      return;
    }

    if (camera.facingMode !== "back") {
      this.setCameraMirrorX(true);
    } else {
      this.setCameraMirrorX(false);
    }
  }

  /**
   * If true, the video and captured frames will be mirrored horizontally.
   *
   * @param mirrorX - If true, the video and captured frames will be mirrored horizontally.
   */
  setCameraMirrorX(mirrorX: boolean) {
    const currentState = store.getState();
    const videoElement = currentState.videoElement;

    if (!videoElement) {
      console.warn("Mirror video - no video element present.");
      return;
    }

    // Skip if the mirror state is already what we want
    if (currentState.mirrorX === mirrorX) {
      return;
    }

    if (mirrorX) {
      videoElement.style.scale = "-1 1";
    } else {
      videoElement.style.removeProperty("scale");
    }

    store.setState({ mirrorX });
  }

  // The "typeof" is necessary to avoid a circular dependency when resolving types

  /**
   * Allows the user to subscribe to state changes inside the Camera Manager.
   * Implemented using Zustand. For usage information, see
   * @see https://github.com/pmndrs/zustand#using-subscribe-with-selector for more details.
   *
   * @returns a cleanup function to remove the subscription
   */
  subscribe: typeof store.subscribe = store.subscribe;

  /**
   * Gets the current internal state of the CameraManager.
   *
   * @returns the current state of the CameraManager
   */
  getState: typeof store.getState = store.getState;

  /**
   * Resets the CameraManager and stops all streams.
   */
  reset() {
    console.debug("Resetting camera manager");
    this.#frameCaptureCallbacks.clear();
    this.userInitiatedAbort = false;
    this.stopStream();
    resetStore();
  }
}

/**
 * A callback that will be triggered on each frame when the playback state is
 * "capturing".
 *
 * @param frame - The frame to capture.
 * @returns The frame.
 */
export type FrameCaptureCallback = (
  frame: ImageData,
) => Promisable<ArrayBufferLike | void>;

/**
 * A camera getter.
 *
 * @param cameras - The cameras to get.
 * @returns The camera.
 */
type CameraGetter = (cameras: Camera[]) => Camera | undefined;

/**
 * A camera preference.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackConstraints/facingMode for facing mode details.
 */
export type CameraPreference =
  | {
      // Only a camera is provided.
      preferredCamera: Camera | undefined; // undefined means "auto"
      preferredFacing?: undefined;
    }
  | {
      // Only a camera getter is provided.
      preferredCamera: CameraGetter | undefined; // undefined means "auto"
      preferredFacing?: undefined;
    }
  | {
      // Only a facing is provided.
      preferredFacing: FacingMode;
      preferredCamera?: undefined;
    }
  | {
      // Neither is provided.
      preferredCamera?: undefined;
      preferredFacing?: undefined;
    };

/**
 * Options for starting a camera stream.
 *
 * @param autoplay - If true, the camera stream will be started automatically.
 * @param preferredCamera - The camera to start the stream with.
 * @param preferredFacing - The facing mode to start the stream with.
 */
export type StartCameraStreamOptions = {
  autoplay?: boolean;
} & CameraPreference;

/**
 * Options for the CameraManager.
 *
 * @param mirrorFrontCameras - If true, front-facing cameras will be mirrored horizontally when started.
 * @param preferredResolution - The desired video resolution for camera streams. This is used as the ideal resolution when starting camera streams. If a camera doesn't support the specified resolution, the camera will automatically fall back to the next lower supported resolution in this order: 4k → 1080p → 720p.
 */
export type CameraManagerOptions = {
  /** If true, the camera stream will be mirrored horizontally when started. */
  mirrorFrontCameras: boolean;
  /**
   * The desired video resolution for camera streams. This is used as the ideal resolution
   * when starting camera streams. If a camera doesn't support the specified resolution,
   * the camera will automatically fall back to the next lower supported resolution in this order:
   * 4k → 1080p → 720p. The actual resolution used may differ from this setting based on
   * camera capabilities and system constraints.
   */
  preferredResolution: VideoResolutionName;
};

/**
 * Default options for the CameraManager.
 */
export const defaultCameraManagerOptions: CameraManagerOptions = {
  mirrorFrontCameras: true,
  preferredResolution: "1080p",
} as const;
