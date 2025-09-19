/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

/* @refresh reload */

import {
  BlinkIdScanningResult,
  loadBlinkIdCore,
  RemoteScanningSession,
  BlinkIdCore,
  DocumentClassInfo,
} from "@microblink/blinkid-core";
import {
  BlinkIdUxManager,
  createBlinkIdFeedbackUi,
  BlinkIdProcessingError,
  BlinkIdUiState,
} from "@microblink/blinkid-ux-manager";
import {
  CameraError,
  CameraManager,
  CameraManagerComponent,
  createCameraManagerUi,
} from "@microblink/camera-manager";

import { Component, createSignal, onMount, Show } from "solid-js";
import {
  CoreErrorModal,
  CameraErrorModal,
  TimeoutErrorModal,
  UnsupportedDocumentModal,
  FilteredDocumentModal,
} from "./components";

/**
 * Configuration for camera UI elements.
 * These settings control which built-in UI components are shown to the user.
 * We disable default error handling to implement custom UI for better user experience.
 */
const CAMERA_UI_CONFIG = {
  showMirrorCameraButton: false, // Hide camera mirroring option
  showTorchButton: false, // Hide flashlight control
  showCloseButton: false, // Hide default close button
  showCameraErrorModal: false, // Use custom error handling UI instead
} as const;

/**
 * Configuration for the document scanning feedback UI.
 * These settings control the visibility of built-in feedback and error UI components.
 * We disable default modals to implement custom UI for better error handling and user guidance.
 */
const FEEDBACK_UI_CONFIG = {
  showOnboardingGuide: false, // Hide default guide - implement custom if needed
  showDocumentFilteredModal: false, // Handle filtered documents with custom UI
  showUnsupportedDocumentModal: false, // Handle unsupported documents with custom UI
  showTimeoutModal: false, // Handle timeouts with custom UI
  showHelpButton: false, // Hide default help - implement custom if needed
} as const;

/**
 * Main application component that demonstrates BlinkID SDK integration with custom UI.
 *
 * Features:
 * - Custom error handling for core initialization, camera, and scanning errors
 * - Document type filtering (US passports only in this example)
 * - Custom UI for various scanning states and error conditions
 * - Proper resource cleanup and state management
 */
export const App: Component = () => {
  /**
   * Portal configuration for UI rendering
   * When enabled, UI components will be rendered outside the root element,
   * which can help avoid z-index and styling conflicts with the main app.
   */
  const USE_PORTAL = true;
  const targetNode = !USE_PORTAL ? document.getElementById("root")! : undefined;

  // Application state management
  const [loadState, setLoadState] = createSignal<
    "not-loaded" | "loading" | "ready"
  >("not-loaded");

  /**
   * Core components
   *
   * These manage the lifecycle of different BlinkID components:
   * - BlinkID Core: Main SDK module with WASM and resources
   * - Scanning Session: Handles document scanning logic. Each session is independent and can be used to scan only one document.
   * - UX Manager: Coordinates UI and scanning operations
   * - Camera Manager: Controls camera access and frame capture
   */
  let blinkIdCore: BlinkIdCore | undefined;
  let scanningSession: RemoteScanningSession | undefined;
  let blinkIdUxManager: BlinkIdUxManager | undefined;
  let cameraManagerComponent: CameraManagerComponent | undefined;

  // Scanning result storage
  const [blinkIdScanningResult, setBlinkIdScanningResult] =
    createSignal<BlinkIdScanningResult>();

  /**
   * Error state signals for custom UI handling
   * Each signal manages a specific type of error that can occur during:
   * - Core initialization
   * - Camera access
   * - Scanning timeout
   * - Document validation
   * - Document type filtering
   */
  const [coreError, setCoreError] = createSignal<string | null>(null);
  const [cameraError, setCameraError] = createSignal<string | null>(null);
  const [timeoutError, setTimeoutError] = createSignal<boolean>(false);
  const [unsupportedDocumentError, setUnsupportedDocumentError] =
    createSignal<boolean>(false);
  const [filteredDocumentError, setFilteredDocumentError] = createSignal<
    string | null
  >(null);

  /**
   * Reset all error states to their initial values.
   * Called before starting new operations to ensure clean state.
   */
  const clearAllErrors = () => {
    setCoreError(null);
    setCameraError(null);
    setTimeoutError(false);
    setUnsupportedDocumentError(false);
    setFilteredDocumentError(null);
  };

  /**
   * Initialize the BlinkID Core SDK
   *
   * This is the first step in the initialization process:
   * 1. Loads the WASM module and required resources
   * 2. Unlocks the SDK with the license key
   * 3. Updates application state based on initialization result
   *
   * Note: This is automatically called when the component mounts
   */
  async function initBlinkIdCore() {
    console.debug("⏳ initCore");

    if (blinkIdCore) {
      return;
    }

    setLoadState("loading");
    clearAllErrors();

    try {
      const licenseKey = import.meta.env.VITE_LICENCE_KEY;

      if (!licenseKey) {
        throw new Error(
          "License key is not configured. Please check your environment variables.",
        );
      }

      // Initialize BlinkID Core
      blinkIdCore = await loadBlinkIdCore({ licenseKey });
      setLoadState("ready");
    } catch (error) {
      console.error("Failed to initialize BlinkID Core:", error);
      setLoadState("not-loaded");

      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to initialize BlinkID SDK. Please check your license key.";

      setCoreError(errorMessage);
    }
  }

  /**
   * Initialize a new BlinkID scanning session
   *
   * This step prepares the SDK for document scanning:
   * 1. Ensures BlinkID Core is initialized
   * 2. Creates a new scanning session for document processing. Each session is independent and can be used to scan only one document.
   *
   * Note: A new session is required for each scanning attempt
   */
  async function initBlinkIdScanningSession() {
    console.debug("⏳ initBlinkIdScanningSession");

    try {
      if (!blinkIdCore) {
        await initBlinkIdCore();

        if (coreError() !== null || !blinkIdCore) {
          return;
        }
      }

      scanningSession = await blinkIdCore.createBlinkIdScanningSession();
    } catch (error) {
      console.error("Failed to initialize session:", error);

      const errorMessage =
        error instanceof Error
          ? error.message
          : "An unexpected error occurred while initializing the session";

      setCoreError(errorMessage);
    }
  }

  /**
   * Start the document scanning process
   *
   * This is the main entry point for document scanning that:
   * 1. Ensures a valid scanning session exists
   * 2. Initializes camera and UI components
   * 3. Sets up error handling and event callbacks
   * 4. Configures document filtering (US passports only)
   * 5. Starts the camera stream for scanning
   *
   * Note: This is triggered by the "Start Scanning" button
   */
  async function startBlinkIdScanningSession() {
    console.debug("⏳ Starting BlinkID scanning session");

    // Ensure we have a valid scanning session
    if (!scanningSession) {
      await initBlinkIdScanningSession();
    }

    if (coreError() !== null || !scanningSession) {
      console.error("Failed to initialize scanning session");
      return;
    }

    setLoadState("loading");
    setBlinkIdScanningResult(undefined);
    clearAllErrors();

    let cameraManager: CameraManager | undefined;
    let unsubscribeCameraError: (() => void) | undefined;
    let unsubscribePlaybackState: (() => void) | undefined;

    try {
      // Initialize camera manager and UX manager
      cameraManager = new CameraManager();
      blinkIdUxManager = new BlinkIdUxManager(cameraManager, scanningSession);
      blinkIdUxManager.setTimeoutDuration(15000); // 15 seconds timeout

      // Create and configure camera UI
      cameraManagerComponent = await createCameraManagerUi(
        cameraManager,
        targetNode,
        CAMERA_UI_CONFIG,
      );

      /**
       * Monitor camera errors and update UI accordingly.
       * Provides real-time feedback about camera access and operation issues.
       *
       * @param errorState Current error state of the camera, if any
       */
      unsubscribeCameraError = cameraManager.subscribe(
        (s) => s.errorState,
        (errorState) => {
          setCameraError(errorState?.message ?? null);
        },
      );

      /**
       * Handle scanning process errors.
       * Currently configured to handle timeout scenarios after 15 seconds of scanning.
       *
       * @param error Type of error that occurred during scanning
       */
      blinkIdUxManager.addOnErrorCallback((error: BlinkIdProcessingError) => {
        if (error === "timeout") {
          setTimeoutError(true);
        }
      });

      /**
       * Monitor UI state changes to handle unsupported document scenarios.
       * When UNSUPPORTED_DOCUMENT state is detected, show appropriate error UI.
       */
      blinkIdUxManager.addOnUiStateChangedCallback(
        (uiState: BlinkIdUiState) => {
          if (uiState.key === "UNSUPPORTED_DOCUMENT") {
            setUnsupportedDocumentError(true);
          }
        },
      );

      /**
       * Configure document type filtering
       * This example demonstrates how to restrict scanning to specific document types.
       * Here we only allow US passports - all other documents will be filtered out
       * and trigger the onDocumentFiltered callback.
       *
       * @param documentClassInfo Contains information about the detected document
       * @returns boolean - true if the document should be processed, false to filter it out
       */
      blinkIdUxManager.addDocumentClassFilter(
        (documentClassInfo: DocumentClassInfo) => {
          return !(
            documentClassInfo.country === "usa" &&
            documentClassInfo.type === "passport"
          );
        },
      );

      /**
       * Handle filtered documents
       * This callback is triggered when a document is detected but filtered out by
       * the document class filter above. It allows us to provide specific feedback
       * to the user about why their document was not accepted.
       *
       * @param documentClassInfo Contains details about the filtered document including
       *                         its type and country of origin
       */
      blinkIdUxManager.addOnDocumentFilteredCallback(
        (documentClassInfo: DocumentClassInfo) => {
          setFilteredDocumentError(
            `Document filtered: ${documentClassInfo.type} from ${documentClassInfo.country} is not supported. Please use a US passport.`,
          );
        },
      );

      /**
       * Process successful scanning results.
       * When a document is successfully scanned:
       * 1. Store the scanning result
       * 2. Stop the camera feed by dismounting the UI
       *
       * @param result The successfully scanned document data
       */
      blinkIdUxManager.addOnResultCallback((result) => {
        setBlinkIdScanningResult(result);
        // Dismount the camera UI to stop frame capturing - this triggers the cameraUi.addOnDismountCallback callback
        cameraManagerComponent?.dismount();
      });

      /**
       * Monitor camera playback state changes.
       * When playback is ready:
       * 1. Initialize the feedback UI
       * 2. Start frame capture if onboarding guide is not shown
       * 3. Update application state
       *
       * @param state Current playback state of the camera
       */
      unsubscribePlaybackState = cameraManager.subscribe(
        (s) => s.playbackState,
        (state) => {
          if (state === "playback") {
            createBlinkIdFeedbackUi(
              blinkIdUxManager!,
              cameraManagerComponent!,
              FEEDBACK_UI_CONFIG,
            );

            // Start frame capturing (processing frames) only if the onboarding guide is not shown
            // Otherwise, the onboarding guide will be shown and frame capturing will already be started in the background
            if (cameraManager && !FEEDBACK_UI_CONFIG.showOnboardingGuide) {
              void cameraManager.startFrameCapture();
            }
            setLoadState("ready");
            unsubscribePlaybackState?.();
          }
        },
      );

      /**
       * Clean up resources when camera UI is dismounted.
       * Performs cleanup by:
       * 1. Removing event subscriptions
       * 2. Resetting UI manager and session states
       * 3. Clearing camera component reference
       */
      cameraManagerComponent.addOnDismountCallback(() => {
        console.debug("⏳🟢 Cleaning up camera UI resources");

        // Unsubscribe from the camera manager subscriptions
        unsubscribePlaybackState?.();
        unsubscribeCameraError?.();

        // Reset the BlinkID UX Manager and scanning session
        blinkIdUxManager = undefined;
        scanningSession = undefined;
        cameraManagerComponent = undefined;
      });

      // Start the camera stream
      await cameraManager.startCameraStream();
    } catch (error) {
      setLoadState("ready"); // Core is still ready, just session failed

      // Clean up any subscriptions that might have been created
      unsubscribePlaybackState?.();
      unsubscribeCameraError?.();

      const errorMessage =
        error instanceof CameraError
          ? error.message
          : "Failed to start camera capturing. Please try again.";

      setCameraError(errorMessage);
      console.error("Camera initialization failed:", error);
    }
  }

  /**
   * Get the result from the scanning session. It will also dismount the camera UI.
   */
  async function getScanningSessionResult() {
    console.debug("⏳🟢 getScanningSessionResult");
    clearAllErrors();

    if (blinkIdUxManager) {
      // example of getting the result before session is closed
      const result = await blinkIdUxManager.getSessionResult(true);
      setBlinkIdScanningResult(result);
    }

    // Dismount the camera UI to stop frame capturing - this triggers the cameraUi.addOnDismountCallback callback
    cameraManagerComponent?.dismount();
  }

  /**
   * Clean up everything
   */
  const terminateBlinkIdCore = async () => {
    console.debug("⏳🟢 terminateBlinkIdCore");
    await blinkIdCore?.terminate();
    setBlinkIdScanningResult(undefined);
    blinkIdCore = undefined;
    blinkIdUxManager = undefined;
    scanningSession = undefined;
    setLoadState("not-loaded");
  };

  /**
   * Restart the scanning process
   */
  const restartScanning = async () => {
    console.debug("⏳🟢 restartScanning");
    clearAllErrors();
    await blinkIdUxManager?.resetScanningSession(true);
  };

  onMount(() => {
    void initBlinkIdCore();
  });

  return (
    <div class="container">
      <h1>BlinkID UI Customization Examples</h1>

      <p>
        This example demonstrates how to implement custom UI for various error
        states in the BlinkID SDK. The SDK core loads automatically, then click
        the button to start scanning and see custom error dialogs.
      </p>

      {/* Start button and status */}
      <div style={{ "margin-bottom": "20px" }}>
        <button
          class="primary-button"
          disabled={loadState() === "loading"}
          onClick={() => void startBlinkIdScanningSession()}
        >
          {loadState() === "loading"
            ? "Starting..."
            : "Start BlinkID Scanning Session"}
        </button>

        <span class={`status-indicator status-${loadState().replace("-", "")}`}>
          {loadState().toUpperCase().replace("-", " ")}
        </span>
      </div>

      {/* Results display */}
      <Show when={blinkIdScanningResult()}>
        <div class="demo-section">
          <h3>✅ Scan Results</h3>
          <pre>{JSON.stringify(blinkIdScanningResult(), null, 2)}</pre>
          <button
            class="danger-button"
            onClick={() => {
              void terminateBlinkIdCore();
            }}
          >
            Close and Terminate
          </button>
        </div>
      </Show>

      {/* CUSTOM ERROR UI IMPLEMENTATIONS */}

      {/* Core Error Modal */}
      <CoreErrorModal
        open={!!coreError()}
        errorMessage={coreError() ?? ""}
        onRetry={() => {
          setCoreError(null);
          void initBlinkIdCore();
        }}
        onCancel={() => setCoreError(null)}
      />

      {/* Camera Error Modal */}
      <CameraErrorModal
        open={!!cameraError()}
        errorMessage={cameraError() ?? ""}
        onRetry={() => void restartScanning()}
        onCancel={() => void getScanningSessionResult()}
      />

      {/* Timeout Error Modal */}
      <TimeoutErrorModal
        open={timeoutError()}
        onTryAgain={() => void restartScanning()}
        onCancel={() => void getScanningSessionResult()}
      />

      {/* Unsupported Document Modal */}
      <UnsupportedDocumentModal
        open={unsupportedDocumentError()}
        onTryDifferent={() => void restartScanning()}
        onCancel={() => void getScanningSessionResult()}
      />

      {/* Filtered Document Modal */}
      <FilteredDocumentModal
        open={!!filteredDocumentError()}
        filterMessage={filteredDocumentError() ?? ""}
        onTryDifferent={() => void restartScanning()}
        onCancel={() => void getScanningSessionResult()}
      />
    </div>
  );
};
