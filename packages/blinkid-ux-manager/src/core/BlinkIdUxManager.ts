/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import {
  BlinkIdScanningResult,
  BlinkIdSessionSettings,
  DocumentClassInfo,
  ProcessResultWithBuffer,
  RemoteScanningSession,
} from "@microblink/blinkid-core";
import { type CameraManager } from "@microblink/camera-manager";
import { FeedbackStabilizer } from "@microblink/feedback-stabilizer";
import { BlinkIdProcessingError } from "./BlinkIdProcessingError";
import {
  BlinkIdUiState,
  BlinkIdUiStateKey,
  blinkIdUiStateMap,
  firstSideCapturedStates,
  getUiStateKey,
} from "./blinkid-ui-state";
import { sleep } from "./utils";
import { DocumentClassFilter } from "./DocumentClassFilter";

/**
 * Manages the UX of the BlinkID SDK.
 */
export class BlinkIdUxManager {
  declare cameraManager: CameraManager;
  declare scanningSession: RemoteScanningSession;
  declare showDemoOverlay: boolean;
  declare showProductionOverlay: boolean;
  declare uiState: BlinkIdUiState;
  declare rawUiStateKey: BlinkIdUiStateKey;
  declare feedbackStabilizer: FeedbackStabilizer<typeof blinkIdUiStateMap>;
  declare sessionSettings: BlinkIdSessionSettings;

  #successProcessResult: ProcessResultWithBuffer | undefined;
  #threadBusy = false;
  #timeoutId?: number;
  /** Timeout duration in ms */
  #timeoutDuration = 10000; // 10s

  #onUiStateChangedCallbacks = new Set<(uiState: BlinkIdUiState) => void>();
  #onResultCallbacks = new Set<(result: BlinkIdScanningResult) => void>();
  #onFrameProcessCallbacks = new Set<
    (frameResult: ProcessResultWithBuffer) => void
  >();
  #onErrorCallbacks = new Set<(errorState: BlinkIdProcessingError) => void>();
  #onDocumentFilteredCallbacks = new Set<
    (documentClassInfo: DocumentClassInfo) => void
  >();
  #documentClassFilter?: DocumentClassFilter;

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

    // clear timeout when we stop processing and add one when we start
    const unsubscribePlaybackState = this.cameraManager.subscribe(
      (s) => s.playbackState,
      (playbackState) => {
        console.debug(`⏯️ ${playbackState}`);
        if (playbackState !== "capturing") {
          this.clearScanTimeout();
        } else {
          // Trigger for initial scan and pause/resume
          console.debug("🔁 continuing timeout");
          this.#setTimeout(this.uiState);
        }
      },
    );

    // We unsubscribe the video observer when the video element is removed from the DOM
    const unsubscribeVideoObserver = cameraManager.subscribe(
      (s) => s.videoElement,
      (videoElement) => {
        if (!videoElement) {
          console.debug("Removing timeout subscriptions");
          this.reset();
          unsubscribeVideoObserver();
          unsubscribePlaybackState();
        }
      },
    );

    // will only trigger if the camera manager is processing frames
    cameraManager.addFrameCaptureCallback(this.#frameCaptureCallback);
  }

  /**
   * Indicates whether the UI should display the demo overlay. Controlled by the license property.
   */
  getShowDemoOverlay(): boolean {
    return this.showDemoOverlay;
  }

  /**
   * Indicates whether the UI should display the production overlay. Controlled by the license property.
   */
  getShowProductionOverlay(): boolean {
    return this.showProductionOverlay;
  }

  /**
   * Adds a callback function to be executed when the UI state changes.
   * @param callback - Function to be called when UI state changes. Receives the new UI state as parameter.
   * @returns A cleanup function that removes the callback when called.
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
   * @param callback - A function that will be called with the scan result.
   * @returns A cleanup function that, when called, will remove the registered callback.
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
   * @param callback - A function that will be called with the document class info.
   * @returns A cleanup function that, when called, will remove the registered callback.
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
   * @param callback - A function that will be called with the frame analysis result.
   * @returns A cleanup function that, when called, will remove the registered callback.
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
   * Registers a callback function to be called when an error occurs during processing.
   * @param callback - A function that will be called with the error state.
   * @returns A cleanup function that, when called, will remove the registered callback.
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

  #invokeOnErrorCallbacks = (errorState: BlinkIdProcessingError) => {
    for (const callback of this.#onErrorCallbacks) {
      try {
        callback(errorState);
      } catch (e) {
        console.error("Error in onError callback", e);
      }
    }
  };

  addOnDocumentFilteredCallback(
    callback: (documentClassInfo: DocumentClassInfo) => void,
  ) {
    this.#onDocumentFilteredCallbacks.add(callback);
    return () => {
      this.#onDocumentFilteredCallbacks.delete(callback);
    };
  }

  #invokeOnDocumentFilteredCallbacks = (
    documentClassInfo: DocumentClassInfo,
  ) => {
    for (const callback of this.#onDocumentFilteredCallbacks) {
      try {
        callback(documentClassInfo);
      } catch (e) {
        console.error("Error in onDocumentFiltered callback", e);
      }
    }
  };

  #invokeOnResultCallbacks = (result: BlinkIdScanningResult) => {
    for (const callback of this.#onResultCallbacks) {
      try {
        callback(result);
      } catch (e) {
        console.error("Error in onResult callback", e);
      }
    }
  };

  #invokeOnFrameProcessCallbacks = (frameResult: ProcessResultWithBuffer) => {
    for (const callback of this.#onFrameProcessCallbacks) {
      try {
        callback(frameResult);
      } catch (e) {
        console.error("Error in onFrameProcess callback", e);
      }
    }
  };

  #invokeOnUiStateChangedCallbacks = (uiState: BlinkIdUiState) => {
    for (const callback of this.#onUiStateChangedCallbacks) {
      try {
        callback(uiState);
      } catch (e) {
        console.error("Error in onUiStateChanged callback", e);
      }
    }
  };

  #frameCaptureCallback = async (imageData: ImageData) => {
    if (this.#threadBusy) {
      return;
    }

    this.#threadBusy = true;

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
          throw new Error("No success process result, should not happen");
        }
        this.#handleUiStateChanges(this.#successProcessResult);
      }, blinkIdUiStateMap.DOCUMENT_CAPTURED.minDuration);
      return;
    }

    const processResult = await this.scanningSession.process(imageDataLike);

    this.#threadBusy = false;

    // document class filter
    if (this.#documentClassFilter !== undefined) {
      const documentClassInfo = this.#extractDocumentClassInfo(processResult);

      if (
        this.#isDocumentClassified(documentClassInfo) &&
        !this.#documentClassFilter(documentClassInfo)
      ) {
        this.#invokeOnDocumentFilteredCallbacks(documentClassInfo);
      }
    }

    // Handle UI state changes
    this.#handleUiStateChanges(processResult);
    this.#invokeOnFrameProcessCallbacks(processResult);

    return processResult.arrayBuffer;
  };

  /**
   * Set the duration of the timeout in milliseconds.
   */
  setTimeoutDuration(duration: number) {
    this.#timeoutDuration = duration;
  }

  #setTimeout = (uiState: BlinkIdUiState) => {
    this.clearScanTimeout();
    console.debug(`⏳🟢 starting timeout for ${uiState.key}`);

    this.#timeoutId = window.setTimeout(() => {
      this.cameraManager.stopFrameCapture();

      this.#invokeOnErrorCallbacks("timeout");

      // Reset the feedback stabilizer to clear the state
      // We handle this as a new scan attempt

      this.feedbackStabilizer.reset();
      this.uiState = this.feedbackStabilizer.currentState;
    }, this.#timeoutDuration);
  };

  #handleUiStateChanges = (processResult: ProcessResultWithBuffer) => {
    const nextUiStateKey = getUiStateKey(
      processResult,
      this.sessionSettings.scanningSettings,
    );

    if (nextUiStateKey === "DOCUMENT_CAPTURED") {
      // TODO: check if the buffer is still reachable
      this.#successProcessResult = processResult;
    }

    this.rawUiStateKey = nextUiStateKey;

    const newUiState = this.feedbackStabilizer.getNewUiState(nextUiStateKey);

    // Skip if the state is the same
    if (newUiState.key === this.uiState.key) {
      return;
    }

    this.uiState = newUiState;

    this.#invokeOnUiStateChangedCallbacks(newUiState);
    void this.#handleUiStateChange(newUiState);
  };

  // Side-effects are handled here
  #handleUiStateChange = async (uiState: BlinkIdUiState) => {
    this.#setTimeout(uiState);

    // Handle all first side captured states to display both the
    // animation to reposition the document and the success animation
    if (firstSideCapturedStates.includes(uiState.key)) {
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
      this.cameraManager.stopFrameCapture();
      return;
    }

    // handle DOCUMENT_CAPTURED
    if (uiState.key === "DOCUMENT_CAPTURED") {
      this.cameraManager.stopFrameCapture();
      await sleep(uiState.minDuration); // allow animation to play out

      const result = await this.scanningSession.getResult();
      this.#invokeOnResultCallbacks(result);
      return;
    }
  };

  #extractDocumentClassInfo(processResult: ProcessResultWithBuffer) {
    return processResult.inputImageAnalysisResult.documentClassInfo;
  }

  #isDocumentClassified(documentClassInfo: DocumentClassInfo): boolean {
    return (
      documentClassInfo?.country !== undefined &&
      documentClassInfo?.type !== undefined
    );
  }

  /**
   * Clears any active timeout.
   */
  clearScanTimeout = () => {
    console.debug("⏳🔴 clearing timeout");
    window.clearTimeout(this.#timeoutId);
  };

  /**
   * Resets the manager and clears all callbacks.
   *
   * Does not reset the camera manager or the BlinkID core instance.
   */
  reset() {
    this.clearScanTimeout();
    this.#threadBusy = false;
    this.#successProcessResult = undefined;
    this.#onUiStateChangedCallbacks.clear();
    this.#onResultCallbacks.clear();
    this.#onFrameProcessCallbacks.clear();
    this.#onErrorCallbacks.clear();
    this.#onDocumentFilteredCallbacks.clear();
  }
}
