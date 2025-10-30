/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import {
  BlinkIdScanningResult,
  BlinkIdSessionSettings,
  DocumentClassInfo,
  getDeviceInfo,
  ProcessResultWithBuffer,
  RemoteScanningSession,
  SdkScanConditionsData,
} from "@microblink/blinkid-core";
import type {
  CameraManager,
  CameraPermission,
} from "@microblink/camera-manager";
import { FeedbackStabilizer } from "@microblink/feedback-stabilizer";
import {
  PingBrowserDeviceInfoImpl,
  PingHardwareCameraInfoImpl,
  PingSdkCameraPermissionImpl,
  PingSdkScanConditionsImpl,
  PingSdkUxEventImpl,
} from "../shared/ping-implementations";
import { createErrorMessagePingFromUiState } from "../shared/uiEventFeedbackMapper";
import { BlinkIdProcessingError } from "./BlinkIdProcessingError";
import { DocumentClassFilter } from "./DocumentClassFilter";
import { HapticFeedbackManager } from "./HapticFeedback";
import {
  BlinkIdUiState,
  BlinkIdUiStateKey,
  blinkIdUiStateMap,
  errorUiStateKeys,
  firstSideCapturedUiStateKeys,
  getUiStateKey,
} from "./blinkid-ui-state";
import {
  convertCameraToPingCamera,
  createCameraInputInfo,
  PingCamera,
} from "./ping-camera-utils";
import { sleep } from "./utils";

/**
 * The BlinkIdUxManager class. This is the main class that manages the UX of
 * the BlinkID SDK. It is responsible for handling the UI state, the timeout,
 * the help tooltip, and the document class filter.
 */
export class BlinkIdUxManager {
  /** The camera manager. */
  declare cameraManager: CameraManager;
  /** The scanning session. */
  declare scanningSession: RemoteScanningSession;
  /** Whether the demo overlay should be shown. */
  declare showDemoOverlay: boolean;
  /** Whether the production overlay should be shown. */
  declare showProductionOverlay: boolean;
  /** The current UI state. */
  declare uiState: BlinkIdUiState;
  /** The raw UI state key. */
  declare rawUiStateKey: BlinkIdUiStateKey;
  /** The feedback stabilizer. */
  declare feedbackStabilizer: FeedbackStabilizer<typeof blinkIdUiStateMap>;
  /** The session settings. */
  declare sessionSettings: BlinkIdSessionSettings;

  #isFirstFrame = true;

  /** The success process result. */
  #successProcessResult: ProcessResultWithBuffer | undefined;
  /** Whether the thread is busy. */
  #threadBusy = false;
  /** The scanning session timeout ID. */
  #timeoutId?: number;
  /** Timeout duration in ms for the scanning session. If null, timeout won't be triggered ever. */
  #timeoutDuration: number | null = 10000; // 10s
  /** Time in ms before the help tooltip is shown. If null, tooltip won't be auto shown. */
  #helpTooltipShowDelay: number | null = 5000; // 5s
  /** Time in ms before the help tooltip is hidden. If null, tooltip won't be auto hidden. */
  #helpTooltipHideDelay: number | null = 5000; // 5s

  /** The callbacks for when the UI state changes. */
  #onUiStateChangedCallbacks = new Set<(uiState: BlinkIdUiState) => void>();
  /** The callbacks for when a scan result is available. */
  #onResultCallbacks = new Set<(result: BlinkIdScanningResult) => void>();
  /** The callbacks for when a frame is processed. */
  #onFrameProcessCallbacks = new Set<
    (frameResult: ProcessResultWithBuffer) => void
  >();
  /** The callbacks for when an error occurs during processing. */
  #onErrorCallbacks = new Set<(errorState: BlinkIdProcessingError) => void>();
  /** The callbacks for when a document is filtered. */
  #onDocumentFilteredCallbacks = new Set<
    (documentClassInfo: DocumentClassInfo) => void
  >();
  /** Clean up observers, store subscriptions and event listeners. */
  #cleanupCallbacks = new Set<() => void>();
  /** The document class filter. */
  #documentClassFilter?: DocumentClassFilter;
  /** The haptic feedback manager. */
  #hapticFeedbackManager = new HapticFeedbackManager();

  /**
   * The constructor for the BlinkIdUxManager class.
   *
   * @param cameraManager - The camera manager.
   * @param scanningSession - The scanning session.
   */
  constructor(
    cameraManager: CameraManager,
    scanningSession: RemoteScanningSession,
  ) {
    this.cameraManager = cameraManager;
    this.scanningSession = scanningSession;
    this.feedbackStabilizer = new FeedbackStabilizer(
      blinkIdUiStateMap,
      "SENSING_FRONT",
    );
    this.uiState = this.feedbackStabilizer.currentState;
    void this.scanningSession.getSettings().then((settings) => {
      this.sessionSettings = settings;
    });
    void this.scanningSession.showDemoOverlay().then((showDemoOverlay) => {
      this.showDemoOverlay = showDemoOverlay;
    });
    void this.scanningSession
      .showProductionOverlay()
      .then((showProductionOverlay) => {
        this.showProductionOverlay = showProductionOverlay;
      });

    // Device info ping
    void getDeviceInfo().then(
      (deviceInfo) =>
        void this.scanningSession.ping(
          new PingBrowserDeviceInfoImpl(deviceInfo),
        ),
    );

    this.#setupObservers();

    const removeFrameCaptureCallback =
      this.cameraManager.addFrameCaptureCallback(this.#frameCaptureCallback);

    this.#cleanupCallbacks.add(removeFrameCaptureCallback);
  }

  #setupObservers() {
    // clear timeout when we stop processing and add one when we start
    const unsubscribeCaptureState = this.cameraManager.subscribe(
      (s) => s.playbackState,
      (playbackState) => {
        console.debug(`⏯️ ${playbackState}`);

        // if timeout duration is null, we don't want to start a timeout
        if (this.#timeoutDuration === null) {
          return;
        }

        if (playbackState !== "capturing") {
          this.clearScanTimeout();
        } else {
          // Trigger for initial scan and pause/resume
          console.debug("🔁 continuing timeout");
          this.#setTimeout(this.uiState);
        }
      },
    );
    this.#cleanupCallbacks.add(unsubscribeCaptureState);

    const unsubscribeCameraActive = this.cameraManager.subscribe(
      (s) => s.playbackState !== "idle",
      (active) => {
        if (active) {
          void this.scanningSession.ping(
            new PingSdkUxEventImpl({
              eventType: "CameraStarted",
            }),
          );
        } else {
          void this.scanningSession.ping(
            new PingSdkUxEventImpl({
              eventType: "CameraClosed",
            }),
          );
        }
        void this.scanningSession.sendPinglets();
      },
    );

    this.#cleanupCallbacks.add(unsubscribeCameraActive);

    const unsubscribeCameras = this.cameraManager.subscribe(
      (s) => s.cameras,
      (cameras) => {
        const pingCameras: PingCamera[] = cameras.map((cam) =>
          convertCameraToPingCamera(cam),
        );

        void this.scanningSession.ping(
          new PingHardwareCameraInfoImpl({
            availableCameras: pingCameras,
          }),
        );
      },
    );

    this.#cleanupCallbacks.add(unsubscribeCameras);

    const visibilityChangeCallback = () => {
      if (document.visibilityState === "hidden") {
        void this.scanningSession.ping(
          new PingSdkUxEventImpl({
            eventType: "AppMovedToBackground",
          }),
        );
      }
      void this.scanningSession.sendPinglets();
    };

    document.addEventListener("visibilitychange", visibilityChangeCallback);

    this.#cleanupCallbacks.add(() => {
      document.removeEventListener(
        "visibilitychange",
        visibilityChangeCallback,
      );
    });

    const unsubscribeSelectedCamera = this.cameraManager.subscribe(
      (s) => s.selectedCamera,
      (selectedCamera) => {
        if (!selectedCamera) {
          return;
        }

        const state = this.cameraManager.getState();

        // just selected, not active
        if (!state.videoResolution) {
          return;
        }

        void this.scanningSession.ping(
          createCameraInputInfo({
            extractionArea: state.extractionArea,
            videoResolution: state.videoResolution,
            selectedCamera,
          }),
        );
      },
    );

    this.#cleanupCallbacks.add(unsubscribeSelectedCamera);

    const unsubResizeVideo = this.cameraManager.subscribe(
      (s) => s.videoResolution,
      (resolution) => {
        if (!resolution) {
          return;
        }

        const state = this.cameraManager.getState();

        if (!state.selectedCamera) {
          return;
        }

        void this.scanningSession.ping(
          createCameraInputInfo({
            extractionArea: state.extractionArea,
            videoResolution: state.videoResolution!,
            selectedCamera: state.selectedCamera,
          }),
        );
      },
    );

    this.#cleanupCallbacks.add(unsubResizeVideo);

    const unsubExtractionArea = this.cameraManager.subscribe(
      (s) => s.extractionArea,
      () => {
        const state = this.cameraManager.getState();

        if (!state.selectedCamera) {
          return;
        }

        if (!state.videoResolution) {
          return;
        }

        void this.scanningSession.ping(
          createCameraInputInfo({
            extractionArea: state.extractionArea,
            videoResolution: state.videoResolution,
            selectedCamera: state.selectedCamera,
          }),
        );
      },
    );

    this.#cleanupCallbacks.add(unsubExtractionArea);

    const unsubscribeCameraPermission = this.cameraManager.subscribe(
      (s) => s.cameraPermission,
      this.#handleCameraPermissionChange,
    );

    this.#cleanupCallbacks.add(unsubscribeCameraPermission);

    // Orientation pings
    const reportOrientation = (orientation: ScreenOrientation) => {
      let deviceOrientation: SdkScanConditionsData["deviceOrientation"];

      switch (orientation.type) {
        case "portrait-primary":
          deviceOrientation = "Portrait";
          break;
        case "portrait-secondary":
          deviceOrientation = "PortraitUpside";
          break;
        case "landscape-primary":
          deviceOrientation = "LandscapeLeft";
          break;
        case "landscape-secondary":
          deviceOrientation = "LandscapeRight";
          break;
      }

      void this.scanningSession.ping(
        new PingSdkScanConditionsImpl({
          updateType: "DeviceOrientation",
          deviceOrientation,
        }),
      );
    };

    const orientationChangeHandler = (event: Event) => {
      const target = event.target as ScreenOrientation;
      reportOrientation(target);
    };

    screen.orientation.addEventListener("change", orientationChangeHandler);

    // initial report
    reportOrientation(screen.orientation);

    this.#cleanupCallbacks.add(() => {
      screen.orientation.removeEventListener(
        "change",
        orientationChangeHandler,
      );
    });

    // Torch ping
    const unsubTorch = this.cameraManager.subscribe(
      (state) => state.selectedCamera?.torchEnabled,
      (torchEnabled) => {
        // no-op if torch is not supported or camera is changing
        if (torchEnabled === undefined) {
          return;
        }

        void this.scanningSession.ping(
          new PingSdkScanConditionsImpl({
            updateType: "FlashlightState",
            flashlightOn: torchEnabled,
          }),
        );
      },
    );

    this.#cleanupCallbacks.add(unsubTorch);

    // Subscribe to torch state changes for haptic feedback
    const unsubscribeTorchState = this.cameraManager.subscribe(
      (s) => s.selectedCamera?.torchEnabled,
      (torchEnabled) => {
        // Only trigger haptic feedback when torch is turned on
        // (not when it's turned off or when camera changes)
        if (torchEnabled === true) {
          this.#hapticFeedbackManager.triggerShort();
        }
      },
    );

    this.#cleanupCallbacks.add(unsubscribeTorchState);

    // We unsubscribe the video observer when the video element is removed from the DOM
    const unsubscribeVideoObserver = this.cameraManager.subscribe(
      (s) => s.videoElement,
      (videoElement) => {
        if (!videoElement) {
          console.debug("Removing camera manager subscriptions");
          this.reset();
          this.cleanupAllObservers();
        }
      },
    );

    this.#cleanupCallbacks.add(unsubscribeVideoObserver);
  }

  #handleCameraPermissionChange = (
    curr: CameraPermission,
    prev: CameraPermission,
  ) => {
    if (prev === undefined) {
      // startup
      if (curr === "granted") {
        console.debug("previously granted");
        void this.scanningSession.ping(
          new PingSdkCameraPermissionImpl({
            eventType: "CameraPermissionCheck",
            cameraPermissionGranted: true,
          }),
        );
      } else if (curr === "denied") {
        console.debug("previously blocked");
        void this.scanningSession.ping(
          new PingSdkCameraPermissionImpl({
            eventType: "CameraPermissionCheck",
            cameraPermissionGranted: false,
          }),
        );
      } else if (curr === "prompt") {
        console.debug("Waiting for user response");
        void this.scanningSession.ping(
          new PingSdkCameraPermissionImpl({
            eventType: "CameraPermissionRequest",
          }),
        );
      }
    }

    if (prev === "prompt") {
      if (curr === "granted") {
        console.debug("user granted permission");
        void this.scanningSession.ping(
          new PingSdkCameraPermissionImpl({
            eventType: "CameraPermissionUserResponse",
            cameraPermissionGranted: true,
          }),
        );
      } else if (curr === "denied") {
        console.debug("user denied permission");
        void this.scanningSession.ping(
          new PingSdkCameraPermissionImpl({
            eventType: "CameraPermissionUserResponse",
            cameraPermissionGranted: false,
          }),
        );
      }
    }

    if (prev === "denied") {
      if (curr === "granted") {
        console.debug("user gave permission in browser settings");
      } else if (curr === "prompt") {
        console.debug("retrying for camera permission");
        void this.scanningSession.ping(
          new PingSdkCameraPermissionImpl({
            eventType: "CameraPermissionRequest",
            cameraPermissionGranted: true,
          }),
        );
      } else if (curr === undefined) {
        console.debug("user reset permission");
      }
    }

    if (prev === "granted") {
      if (curr === "denied") {
        console.debug("user revoked permission");
      } else if (curr === "prompt") {
        console.debug("user reset permission after granting v1");
      }
    }

    void this.scanningSession.sendPinglets();
  };

  /**
   * Indicates whether the UI should display the demo overlay. Controlled by the
   * license property.
   */
  getShowDemoOverlay(): boolean {
    return this.showDemoOverlay;
  }

  /**
   * Indicates whether the UI should display the production overlay. Controlled by
   * the license property.
   */
  getShowProductionOverlay(): boolean {
    return this.showProductionOverlay;
  }

  /**
   * Returns the timeout duration in ms. Null if timeout won't be triggered ever.
   */
  getTimeoutDuration(): number | null {
    return this.#timeoutDuration;
  }

  /**
   * Returns the time in ms before the help tooltip is shown. Null if tooltip won't be auto shown.
   */
  getHelpTooltipShowDelay(): number | null {
    return this.#helpTooltipShowDelay;
  }

  /**
   * Returns the time in ms before the help tooltip is hidden. Null if tooltip won't be auto hidden.
   */
  getHelpTooltipHideDelay(): number | null {
    return this.#helpTooltipHideDelay;
  }

  /**
   * Gets the haptic feedback manager instance.
   *
   * @returns The haptic feedback manager
   */
  getHapticFeedbackManager(): HapticFeedbackManager {
    return this.#hapticFeedbackManager;
  }

  /**
   * Enable or disable haptic feedback.
   *
   * @param enabled - Whether haptic feedback should be enabled
   */
  setHapticFeedbackEnabled(enabled: boolean): void {
    this.#hapticFeedbackManager.setEnabled(enabled);
  }

  /**
   * Check if haptic feedback is currently enabled.
   *
   * @returns true if haptic feedback is enabled
   */
  isHapticFeedbackEnabled(): boolean {
    return this.#hapticFeedbackManager.isEnabled();
  }

  /**
   * Check if haptic feedback is supported by the current browser/device.
   *
   * @returns true if haptic feedback is supported
   */
  isHapticFeedbackSupported(): boolean {
    return this.#hapticFeedbackManager.isSupported();
  }

  /**
   * Adds a callback function to be executed when the UI state changes.
   *
   * @param callback - Function to be called when UI state changes. Receives the
   * new UI state as parameter.
   * @returns A cleanup function that removes the callback when called.
   *
   * @example
   * const cleanup = manager.addOnUiStateChangedCallback((newState) => {
   *   console.log('UI state changed to:', newState);
   * });
   *
   * cleanup();
   */
  addOnUiStateChangedCallback(callback: (uiState: BlinkIdUiState) => void) {
    this.#onUiStateChangedCallbacks.add(callback);
    return () => {
      this.#onUiStateChangedCallbacks.delete(callback);
    };
  }

  /**
   * Registers a callback function to be called when a scan result is available.
   *
   * @param callback - A function that will be called with the scan result.
   * @returns A cleanup function that, when called, will remove the registered
   * callback.
   *
   * @example
   *
   * const cleanup = manager.addOnResultCallback((result) => {
   *   console.log('Scan result:', result);
   * });
   *
   * // Later, to remove the callback:
   * cleanup();
   */
  addOnResultCallback(callback: (result: BlinkIdScanningResult) => void) {
    this.#onResultCallbacks.add(callback);
    return () => {
      this.#onResultCallbacks.delete(callback);
    };
  }

  /**
   * Registers a callback function to filter document classes.
   *
   * @param callback - A function that will be called with the document class
   * info.
   * @returns A cleanup function that, when called, will remove the registered
   * callback.
   *
   * @example
   * const cleanup = manager.addDocumentClassFilter((docClassInfo) => {
   *   return docClassInfo.country === 'usa';
   * });
   *
   * // Later, to remove the callback:
   * cleanup();
   */
  addDocumentClassFilter(callback: DocumentClassFilter) {
    this.#documentClassFilter = callback;
    return () => {
      this.#documentClassFilter = undefined;
    };
  }

  /**
   * Registers a callback function to be called when a frame is processed.
   *
   * @param callback - A function that will be called with the frame analysis
   * result.
   * @returns A cleanup function that, when called, will remove the registered
   * callback.
   *
   * @example
   * const cleanup = manager.addOnFrameProcessCallback((frameResult) => {
   *   console.log('Frame processed:', frameResult);
   * });
   *
   * // Later, to remove the callback:
   * cleanup();
   */
  addOnFrameProcessCallback(
    callback: (frameResult: ProcessResultWithBuffer) => void,
  ) {
    this.#onFrameProcessCallbacks.add(callback);
    return () => {
      this.#onFrameProcessCallbacks.delete(callback);
    };
  }

  /**
   * Registers a callback function to be called when an error occurs during
   * processing.
   *
   * @param callback - A function that will be called with the error state.
   * @returns A cleanup function that, when called, will remove the registered
   * callback.
   *
   * @example
   * const cleanup = manager.addOnErrorCallback((error) => {
   *   console.error('Processing error:', error);
   * });
   *
   * // Later, to remove the callback:
   * cleanup();
   */
  addOnErrorCallback(callback: (errorState: BlinkIdProcessingError) => void) {
    this.#onErrorCallbacks.add(callback);
    return () => {
      this.#onErrorCallbacks.delete(callback);
    };
  }

  /**
   * Invokes the onError callbacks.
   *
   * @param errorState - The error state.
   */
  #invokeOnErrorCallbacks = (errorState: BlinkIdProcessingError) => {
    this.#hapticFeedbackManager.triggerLong();

    for (const callback of this.#onErrorCallbacks) {
      try {
        callback(errorState);
      } catch (e) {
        console.error("Error in onError callback", e);
      }
    }
  };

  /**
   * Registers a callback function to be called when a document is filtered.
   *
   * @param callback - A function that will be called with the document class
   * info.
   * @returns A cleanup function that, when called, will remove the registered
   * callback.
   *
   * @example
   * const cleanup = manager.addOnDocumentFilteredCallback((docClassInfo) => {
   *   console.log('Document filtered:', docClassInfo);
   * });
   *
   * // Later, to remove the callback:
   * cleanup();
   */
  addOnDocumentFilteredCallback(
    callback: (documentClassInfo: DocumentClassInfo) => void,
  ) {
    this.#onDocumentFilteredCallbacks.add(callback);
    return () => {
      this.#onDocumentFilteredCallbacks.delete(callback);
    };
  }

  /**
   * Invokes the onDocumentFiltered callbacks.
   *
   * @param documentClassInfo - The document class info.
   */
  #invokeOnDocumentFilteredCallbacks = (
    documentClassInfo: DocumentClassInfo,
  ) => {
    this.#hapticFeedbackManager.triggerLong();

    for (const callback of this.#onDocumentFilteredCallbacks) {
      try {
        callback(documentClassInfo);
      } catch (e) {
        console.error("Error in onDocumentFiltered callback", e);
      }
    }
  };

  /**
   * Invokes the onResult callbacks.
   *
   * @param result - The scan result.
   */
  #invokeOnResultCallbacks = (result: BlinkIdScanningResult) => {
    for (const callback of this.#onResultCallbacks) {
      try {
        callback(result);
      } catch (e) {
        console.error("Error in onResult callback", e);
      }
    }
  };

  /**
   * Invokes the onFrameProcess callbacks.
   *
   * @param frameResult - The frame result.
   */
  #invokeOnFrameProcessCallbacks = (frameResult: ProcessResultWithBuffer) => {
    for (const callback of this.#onFrameProcessCallbacks) {
      try {
        callback(frameResult);
      } catch (e) {
        console.error("Error in onFrameProcess callback", e);
      }
    }
  };

  /**
   * Invokes the onUiStateChanged callbacks.
   *
   * @param uiState - The UI state.
   */
  #invokeOnUiStateChangedCallbacks = (uiState: BlinkIdUiState) => {
    for (const callback of this.#onUiStateChangedCallbacks) {
      try {
        callback(uiState);
      } catch (e) {
        console.error("Error in onUiStateChanged callback", e);
      }
    }
  };

  /**
   * Handles document class filtering if configured.
   * Returns true if the document should be processed, false if it was filtered out.
   *
   * @param processResult - The result of processing the current frame
   * @returns boolean indicating if the document should be processed
   */
  #handleDocumentClassFiltering(
    processResult: ProcessResultWithBuffer,
  ): boolean {
    // Skip filtering if no filter is configured
    if (this.#documentClassFilter === undefined) {
      return true;
    }

    const documentClassInfo = this.#extractDocumentClassInfo(processResult);

    // If document is not classified or passes the filter, continue processing
    if (
      !this.#isDocumentClassified(documentClassInfo) ||
      this.#documentClassFilter(documentClassInfo)
    ) {
      return true;
    }

    // Document was classified but filtered out by client's criteria
    this.cameraManager.stopFrameCapture();

    // Notify relevant callbacks but skip UI updates since the document is rejected
    this.#invokeOnDocumentFilteredCallbacks(documentClassInfo);

    // Still invoke frame process callbacks to maintain consistent callback flow
    this.#invokeOnFrameProcessCallbacks(processResult);

    return false;
  }

  /**
   * The frame capture callback. This is the main function that is called when a
   * new frame is captured. It is responsible for processing the frame and
   * updating the UI state.
   *
   * @param imageData - The image data.
   * @returns The processed frame's ArrayBuffer, or undefined if not applicable.
   */
  #frameCaptureCallback = async (
    imageData: ImageData,
  ): Promise<ArrayBuffer | void> => {
    if (this.#threadBusy) {
      console.debug("🚦🔴 Thread is busy, skipping frame capture");
      return;
    }

    this.#threadBusy = true;

    try {
      // https://issues.chromium.org/issues/379999322
      const imageDataLike = {
        data: imageData.data,
        width: imageData.width,
        height: imageData.height,
        colorSpace: "srgb",
      } satisfies ImageData;

      /**
       * `scanningSession.process()` errors on calls after the document is captured and
       * the success state is placed on the queue to be shown after the current message's
       * minimum duration is reached.
       *
       * However, we still need to call `#handleUiStateChange()` to update the UI state, so
       * we stop the loop here by not setting `this.#threadBusy` to `true` and manually
       * calling `#handleUiStateChange()` with the `DOCUMENT_CAPTURED` state after the
       * minimum duration of the state is reached.
       */
      if (this.#successProcessResult) {
        window.setTimeout(() => {
          if (!this.#successProcessResult) {
            console.error("No success process result, should not happen");
            return;
          }
          this.#updateUiStateFromProcessResult(this.#successProcessResult);
        }, blinkIdUiStateMap.DOCUMENT_CAPTURED.minDuration);
        return;
      }

      const processResult = await this.scanningSession.process(imageDataLike);

      if (this.#isFirstFrame) {
        this.#isFirstFrame = false;
        void this.scanningSession.sendPinglets();
      }

      // Check if document should be processed or filtered out
      if (!this.#handleDocumentClassFiltering(processResult)) {
        return processResult.arrayBuffer;
      }

      // Document passed filtering or no filtering was configured
      // Update UI state based on recognition results and notify callbacks
      this.#updateUiStateFromProcessResult(processResult);
      this.#invokeOnFrameProcessCallbacks(processResult);

      return processResult.arrayBuffer;
    } finally {
      this.#threadBusy = false;
    }
  };

  /**
   * Sets the duration after which the scanning session will timeout. The
   * timeout can occur in various scenarios and may be restarted by different
   * scanning events.
   *
   * @param duration The timeout duration in milliseconds. If null, timeout won't
   * be triggered ever.
   * @param setHelpTooltipShowDelay If true, also sets the help tooltip show
   * delay to half of the provided duration. If timeout duration is null, help
   * tooltip show delay will be set to null. Defaults to true.
   * @throws {Error} Throws an error if duration is less than or equal to 0 when not null.
   */
  setTimeoutDuration(duration: number | null, setHelpTooltipShowDelay = true) {
    if (duration !== null && duration <= 0) {
      throw new Error("Timeout duration must be greater than 0");
    }

    this.#timeoutDuration = duration;

    if (setHelpTooltipShowDelay) {
      this.setHelpTooltipShowDelay(duration !== null ? duration / 2 : null);
    }
  }

  /**
   * Sets the duration in milliseconds before the help tooltip is shown.
   * A value of null means the help tooltip will not be auto shown.
   *
   * @param duration The duration in milliseconds before the help tooltip is
   * shown. If null, tooltip won't be auto shown.
   * @throws {Error} Throws an error if duration is less than or equal to 0 when
   * not null.
   */
  setHelpTooltipShowDelay(duration: number | null) {
    if (duration !== null && duration <= 0) {
      throw new Error("Help tooltip show delay must be greater than 0");
    }

    this.#helpTooltipShowDelay = duration;
  }

  /**
   * Sets the duration in milliseconds before the help tooltip is hidden.
   * A value of null means the help tooltip will not be auto hidden.
   *
   * @param duration The duration in milliseconds before the help tooltip is
   * hidden. If null, tooltip won't be auto hidden.
   * @throws {Error} Throws an error if duration is less than or equal to 0 when
   * not null.
   */
  setHelpTooltipHideDelay(duration: number | null) {
    if (duration !== null && duration <= 0) {
      throw new Error("Help tooltip display duration must be greater than 0");
    }

    this.#helpTooltipHideDelay = duration;
  }

  /**
   * Sets the timeout for the scanning session.
   *
   * @param uiState - The UI state.
   */
  #setTimeout = (uiState: BlinkIdUiState) => {
    if (this.#timeoutDuration === null) {
      console.debug("⏳🟢 timeout duration is null, not starting timeout");
      return;
    }

    this.clearScanTimeout();
    console.debug(`⏳🟢 starting timeout for ${uiState.key}`);

    this.#timeoutId = window.setTimeout(() => {
      console.debug("⏳🟢 timeout triggered");
      this.cameraManager.stopFrameCapture();

      this.#invokeOnErrorCallbacks("timeout");

      void this.scanningSession.ping(
        new PingSdkUxEventImpl({
          eventType: "StepTimeout",
        }),
      );
      void this.scanningSession.sendPinglets();

      // Reset the feedback stabilizer to clear the state
      // We handle this as a new scan attempt
      this.#resetUiState();
    }, this.#timeoutDuration);
  };

  /**
   * Handles haptic feedback based on UI state changes.
   *
   * @param uiStateKey - The new UI state key
   */
  #handleHapticFeedback = (uiStateKey: BlinkIdUiStateKey) => {
    // First side success states (before barcode scanning)
    if (firstSideCapturedUiStateKeys.includes(uiStateKey)) {
      this.#hapticFeedbackManager.triggerShort();
      return;
    }

    // Final success state (document fully captured)
    if (uiStateKey === "DOCUMENT_CAPTURED") {
      this.#hapticFeedbackManager.triggerLong();
      return;
    }

    // Error states (excluding unsupported document which is handled separately)
    if (
      uiStateKey !== "UNSUPPORTED_DOCUMENT" &&
      errorUiStateKeys.includes(uiStateKey)
    ) {
      this.#hapticFeedbackManager.triggerShort();
      return;
    }
  };

  /**
   * Updates the UI state based on the process result. This is called after a frame has been processed
   * to update the UI state according to the recognition results.
   *
   * @param processResult - The process result from frame processing.
   */
  #updateUiStateFromProcessResult = (
    processResult: ProcessResultWithBuffer,
  ) => {
    const uiStateKeyCandidate = getUiStateKey(
      processResult,
      this.sessionSettings.scanningSettings,
    );

    // first side captured
    if (firstSideCapturedUiStateKeys.includes(uiStateKeyCandidate)) {
      void this.scanningSession.sendPinglets();
    }

    if (uiStateKeyCandidate === "DOCUMENT_CAPTURED") {
      // TODO: check if the buffer is still reachable
      this.#successProcessResult = processResult;
      void this.scanningSession.sendPinglets();
    }

    this.rawUiStateKey = uiStateKeyCandidate;

    const newUiState =
      this.feedbackStabilizer.getNewUiState(uiStateKeyCandidate);

    // Skip if the state is the same
    if (newUiState.key === this.uiState.key) {
      return;
    }

    // Trigger haptic feedback based on UI state changes
    this.#handleHapticFeedback(newUiState.key);

    this.uiState = newUiState;

    this.#invokeOnUiStateChangedCallbacks(newUiState);
    void this.#handleUiStateChange(newUiState);
  };

  /**
   * Handles the UI state change. This is the main function that is called
   * when a new UI state is set. It is responsible for handling the timeout,
   * handling the first side captured states, and handling the UNSUPPORTED_DOCUMENT
   * state.
   *
   * @param uiState - The UI state.
   */
  #handleUiStateChange = async (uiState: BlinkIdUiState) => {
    if (this.#timeoutDuration !== null) {
      this.#setTimeout(uiState);
    }

    // queue error ping if applicable
    const errorPing = createErrorMessagePingFromUiState(uiState.key);
    if (errorPing) {
      void this.scanningSession.ping(errorPing);
    }

    // Handle all first side captured states to display both the
    // animation to reposition the document and the success animation
    if (firstSideCapturedUiStateKeys.includes(uiState.key)) {
      this.cameraManager.stopFrameCapture();
      // we need to wait for the compound duration
      // The DOCUMENT_CAPTURED state is the checkbox animation

      await sleep(
        uiState.minDuration + blinkIdUiStateMap.DOCUMENT_CAPTURED.minDuration,
      );
      await this.cameraManager.startFrameCapture();
      return;
    }

    // handle UNSUPPORTED_DOCUMENT
    if (uiState.key === "UNSUPPORTED_DOCUMENT") {
      console.debug("🔴 Unsupported document");

      this.cameraManager.stopFrameCapture();
      this.#invokeOnErrorCallbacks("unsupported_document");
      return;
    }

    // handle DOCUMENT_CAPTURED
    if (uiState.key === "DOCUMENT_CAPTURED") {
      this.cameraManager.stopFrameCapture();
      await sleep(uiState.minDuration); // allow animation to play out

      // get the result and delete the session object
      const result = await this.getSessionResult(true);

      this.#invokeOnResultCallbacks(result);
      return;
    }
  };

  /**
   * Extracts the document class info from the process result.
   *
   * @param processResult - The process result.
   * @returns The document class info.
   */
  #extractDocumentClassInfo(processResult: ProcessResultWithBuffer) {
    return processResult.inputImageAnalysisResult.documentClassInfo;
  }

  /**
   * Checks if the document class is classified.
   *
   * @param documentClassInfo - The document class info.
   * @returns Whether the document class is classified.
   */
  #isDocumentClassified(documentClassInfo: DocumentClassInfo): boolean {
    return (
      documentClassInfo?.country !== undefined &&
      documentClassInfo?.type !== undefined
    );
  }

  /**
   * Resets the feedback stabilizer and invokes the onUiStateChanged callbacks.
   */
  #resetUiState = () => {
    this.feedbackStabilizer.reset();
    this.uiState = this.feedbackStabilizer.currentState;
    this.#invokeOnUiStateChangedCallbacks(this.uiState);
  };

  /**
   * Clears the scanning session timeout.
   */
  clearScanTimeout = () => {
    if (!this.#timeoutId) {
      return;
    }

    console.debug("⏳🔴 clearing timeout");
    window.clearTimeout(this.#timeoutId);
    this.#timeoutId = undefined;
  };

  /**
   * Gets the result from the scanning session.
   *
   * @param deleteSession - Whether to delete the session after getting the result. Note that
   * it is not possible to get the result a second time after the document has been fully captured,
   * so in this case we should delete the scanning session since it is no longer needed.
   * @returns The result.
   */
  async getSessionResult(
    deleteSession = false,
  ): Promise<BlinkIdScanningResult> {
    const result = await this.scanningSession.getResult();

    // cleanup memory, as session cannot be reused for another scan
    if (deleteSession) {
      await this.safelyDeleteScanningSession();
    }

    return result;
  }

  /**
   * Safely deletes the scanning session.
   */
  async safelyDeleteScanningSession() {
    // we need to check if the session is deleted, as it might be deleted already
    const isScanningSessionDeleted = await this.scanningSession.isDeleted();

    if (!isScanningSessionDeleted) {
      await this.scanningSession.delete();
    }
  }

  /**
   * Resets the scanning session.
   *
   * @param startFrameCapture Whether to start frame processing.
   */
  async resetScanningSession(startFrameCapture = true) {
    console.debug("🔁 Resetting scanning session");
    this.clearScanTimeout();
    this.#threadBusy = false;
    this.#successProcessResult = undefined;
    this.#resetUiState();
    this.#documentClassFilter = undefined;

    await this.scanningSession.reset();

    if (startFrameCapture) {
      // Check if camera is active before starting frame capture
      if (!this.cameraManager.isActive) {
        await this.cameraManager.startCameraStream();
      }
      await this.cameraManager.startFrameCapture();
    }
  }

  clearUserCallbacks() {
    console.debug("🧹 Clearing all BlinkIdUxManager user callbacks");

    this.#onUiStateChangedCallbacks.clear();
    this.#onResultCallbacks.clear();
    this.#onFrameProcessCallbacks.clear();
    this.#onErrorCallbacks.clear();
    this.#onDocumentFilteredCallbacks.clear();
  }

  cleanupAllObservers() {
    console.debug("🧹 Removing all BlinkIdUxManager observers");
    this.#cleanupCallbacks.forEach((cleanup) => cleanup());
    this.#cleanupCallbacks.clear();
  }

  /**
   * Resets the BlinkIdUxManager. Clears all callbacks.
   *
   * Does not reset the camera manager or the scanning session.
   */
  reset() {
    console.debug("🔁 Resetting BlinkIdUxManager");
    this.clearScanTimeout();
    this.#threadBusy = false;
    this.#successProcessResult = undefined;
    this.clearUserCallbacks();
    this.#documentClassFilter = undefined;
  }
}
