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
 * This example demonstrates how to implement custom UI for various error states
 * in the BlinkID SDK, including:
 * - Camera errors (permission denied, device not found, etc.)
 * - Timeout errors (when scanning takes too long)
 * - Unsupported document errors (when document type is not supported)
 * - Filtered document errors (when document doesn't match custom filters)
 */

/**
 * Portal configuration - renders UI outside of root element
 */
const USE_PORTAL = true;
const targetNode = !USE_PORTAL ? document.getElementById("root")! : undefined;

/**
 * The main application component
 */
export const App: Component = () => {
  const [result, setResult] = createSignal<BlinkIdScanningResult>();
  const [blinkIdUxManager, setBlinkIdUxManager] =
    createSignal<BlinkIdUxManager>();
  const [cameraUi, setCameraUi] = createSignal<CameraManagerComponent>();
  const [loadState, setLoadState] = createSignal<
    "not-loaded" | "loading" | "ready"
  >("not-loaded");
  const [blinkIdCore, setBlinkIdCore] = createSignal<BlinkIdCore>();
  const [scanningSession, setScanningSession] =
    createSignal<RemoteScanningSession>();

  // Error state signals for custom UI
  const [coreError, setCoreError] = createSignal<string | null>(null);
  const [cameraError, setCameraError] = createSignal<string | null>(null);
  const [timeoutError, setTimeoutError] = createSignal<boolean>(false);
  const [unsupportedDocumentError, setUnsupportedDocumentError] =
    createSignal<boolean>(false);
  const [filteredDocumentError, setFilteredDocumentError] = createSignal<
    string | null
  >(null);

  /**
   * Clear all error states
   */
  const clearAllErrors = () => {
    setCoreError(null);
    setCameraError(null);
    setTimeoutError(false);
    setUnsupportedDocumentError(false);
    setFilteredDocumentError(null);
  };

  /**
   * Initialize the BlinkID Core and create scanning session - called on mount
   */
  async function initCore() {
    console.debug("⏳ initCore");
    setLoadState("loading");
    clearAllErrors();

    try {
      // Initialize BlinkID Core
      const core = await loadBlinkIdCore({
        licenseKey: import.meta.env.VITE_LICENCE_KEY,
      });
      setBlinkIdCore(() => core);
      setLoadState("ready");
    } catch (error) {
      console.error("Failed to initialize BlinkID Core/Session:", error);
      setLoadState("not-loaded");

      if (error instanceof Error) {
        setCoreError(error.message);
      } else {
        setCoreError(
          "Failed to initialize BlinkID SDK. Please check your license key.",
        );
      }
    }
  }

  async function initSession() {
    console.debug("⏳ initSession");
    let core = blinkIdCore();
    if (!core) {
      await initCore();
      core = blinkIdCore();
    }

    if (!core) {
      throw new Error("BlinkID Core not initialized");
    }

    // Create scanning session
    try {
      const session = await core.createBlinkIdScanningSession();
      setScanningSession(() => session);
    } catch (error) {
      console.error("Failed to create scanning session:", error);
      if (error instanceof Error) {
        setCoreError(error.message);
      } else {
        setCoreError("Failed to create scanning session. Please try again.");
      }
    }
  }

  /**
   * Start camera and UI - session already created in initCore
   */
  async function startSession() {
    console.debug("⏳ startSession");
    if (!scanningSession()) {
      await initSession();
    }

    const session = scanningSession();

    if (!session) {
      console.debug("⏳ startSession no session");
      return;
    }

    setLoadState("loading");
    setResult(undefined);
    clearAllErrors();

    try {
      // Create camera manager
      const cameraManager = new CameraManager();

      // Create UX manager
      const uxManager = new BlinkIdUxManager(cameraManager, session);
      uxManager.setTimeoutDuration(15000); // 15 seconds timeout

      setBlinkIdUxManager(uxManager);

      // Create camera UI (disable built-in error modal)
      const cameraUi = await createCameraManagerUi(cameraManager, targetNode, {
        showMirrorCameraButton: false,
        showTorchButton: false,
        showCloseButton: false,
        showCameraErrorModal: false, // We'll handle camera errors with custom UI
      });

      setCameraUi(cameraUi);

      // === CAMERA ERROR HANDLING ===
      // We want to handle camera errors with custom UI, so we subscribe to the camera error state.
      const unsubscribeCameraError = cameraManager.subscribe(
        (s) => s.errorState,
        (errorState) => {
          if (errorState) {
            setCameraError(errorState.message || "Camera access failed");
          } else {
            setCameraError(null);
          }
        },
      );

      // === TIMEOUT ERROR HANDLING ===
      // This callback is called when the scanning session times out, or other error occurs.
      uxManager.addOnErrorCallback((error: BlinkIdProcessingError) => {
        if (error === "timeout") {
          setTimeoutError(true);
        }
      });

      // === UI STATE CHANGE HANDLING (for unsupported documents) ===
      // This callback is called when the UI state changes. UI state is used to determine which UI to show.
      uxManager.addOnUiStateChangedCallback((uiState: BlinkIdUiState) => {
        if (uiState.key === "UNSUPPORTED_DOCUMENT") {
          setUnsupportedDocumentError(true);
        }
      });

      // === DOCUMENT FILTER HANDLING ===
      // Example: Only allow US passports
      uxManager.addDocumentClassFilter(
        (documentClassInfo: DocumentClassInfo) => {
          // condition should return true if the document is supported
          return (
            documentClassInfo.country === "usa" &&
            documentClassInfo.type === "passport"
          );
        },
      );

      // === DOCUMENT FILTERED HANDLING ===
      // This callback is called when the document is filtered out by the document class filter
      uxManager.addOnDocumentFilteredCallback(
        (documentClassInfo: DocumentClassInfo) => {
          setFilteredDocumentError(
            `Document filtered: ${documentClassInfo.type} from ${documentClassInfo.country} is not supported. Please use a US passport.`,
          );
        },
      );

      // === SUCCESS HANDLING ===
      // This callback is called when the document is successfully scanned
      uxManager.addOnResultCallback((result) => {
        setResult(result);
        cameraUi.dismount();
        // Core termination will be handled by the Close button
      });

      // === START CAMERA AND UI ===
      // This callback is called when the camera playback state changes.
      // We use it to mount the feedback UI and start frame capturing.
      const unsubscribePlaybackState = cameraManager.subscribe(
        (s) => s.playbackState,
        (state) => {
          if (state === "playback") {
            // Create feedback UI (disable built-in error modals)
            createBlinkIdFeedbackUi(uxManager, cameraUi, {
              showOnboardingGuide: false, // Hide onboarding guide
              showDocumentFilteredModal: false, // We'll handle with custom UI
              showUnsupportedDocumentModal: false, // We'll handle with custom UI
              showTimeoutModal: false, // We'll handle with custom UI
              showHelpButton: false, // Hide help button
            });

            // Start frame capturing only after feedback UI is mounted
            void cameraManager.startFrameCapture();
            setLoadState("ready");
            unsubscribePlaybackState();
          }
        },
      );

      // === CLEANUP ===
      // This callback is called when the camera UI is dismounted
      cameraUi.addOnDismountCallback(() => {
        console.debug("⏳🟢 cameraUi.addOnDismountCallback");

        unsubscribePlaybackState();
        unsubscribeCameraError();
        setBlinkIdUxManager(undefined);
        setScanningSession(undefined);
        setCameraUi(undefined);
      });

      await cameraManager.startCameraStream();
    } catch (error) {
      setLoadState("ready"); // Core is still ready, just session failed

      if (error instanceof CameraError) {
        setCameraError(error.message);
      } else {
        setCameraError("Failed to start camera capturing. Please try again.");
      }
    }
  }

  /**
   * Close the current session, and get final result before the session is closed.
   */
  async function closeSession() {
    console.debug("⏳🟢 closeSession");
    clearAllErrors();

    const session = scanningSession();
    if (session) {
      // example of getting the result before session is closed
      const result = await session.getResult();
      console.debug("🟢🟢🟢 current result", JSON.stringify(result, null, 2));
    }

    // Dismount the camera UI to stop frame capturing
    cameraUi()?.dismount();
  }

  /**
   * Clean up everything
   */
  const terminateBlinkIdCore = async () => {
    console.debug("⏳🟢 terminateBlinkIdCore");
    await blinkIdCore()?.terminate();
    setResult(undefined);
    setBlinkIdCore(undefined);
    setBlinkIdUxManager(undefined);
    setScanningSession(undefined);
    setLoadState("not-loaded");
  };

  /**
   * Restart the scanning process
   */
  const restartScanning = async () => {
    console.debug("⏳🟢 restartScanning");
    clearAllErrors();
    const manager = blinkIdUxManager();
    if (manager) {
      await manager.resetScanningSession(true);
    }
  };

  onMount(() => {
    void initCore();
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
          onClick={() => void startSession()}
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
      <Show when={result()}>
        <div class="demo-section">
          <h3>✅ Scan Results</h3>
          <pre>{JSON.stringify(result(), null, 2)}</pre>
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

      {/* === CUSTOM ERROR UI IMPLEMENTATIONS === */}

      {/* Core Error Modal */}
      <CoreErrorModal
        open={!!coreError()}
        errorMessage={coreError() ?? ""}
        onRetry={() => {
          setCoreError(null);
          void initCore();
        }}
        onCancel={() => setCoreError(null)}
      />

      {/* Camera Error Modal */}
      <CameraErrorModal
        open={!!cameraError()}
        errorMessage={cameraError() ?? ""}
        onRetry={() => void restartScanning()}
        onCancel={() => void closeSession()}
      />

      {/* Timeout Error Modal */}
      <TimeoutErrorModal
        open={timeoutError()}
        onTryAgain={() => void restartScanning()}
        onCancel={() => void closeSession()}
      />

      {/* Unsupported Document Modal */}
      <UnsupportedDocumentModal
        open={unsupportedDocumentError()}
        onTryDifferent={() => void restartScanning()}
        onCancel={() => void closeSession()}
      />

      {/* Filtered Document Modal */}
      <FilteredDocumentModal
        open={!!filteredDocumentError()}
        filterMessage={filteredDocumentError() ?? ""}
        onTryDifferent={() => void restartScanning()}
        onCancel={() => void closeSession()}
      />
    </div>
  );
};
