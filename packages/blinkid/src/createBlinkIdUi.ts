/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import {
  type BlinkIdCore,
  loadBlinkIdCore,
  type BlinkIdInitSettings,
  BlinkIdSessionSettings,
} from "@microblink/blinkid-core";
import {
  BlinkIdUxManager,
  createBlinkIdFeedbackUi,
  FeedbackUiOptions,
  LocalizationStrings,
} from "@microblink/blinkid-ux-manager";
import {
  CameraManager,
  CameraManagerComponent,
  CameraManagerUiOptions,
  createCameraManagerUi,
} from "@microblink/camera-manager";
import { Simplify } from "type-fest";

/**
 * Configuration options for creating a BlinkID component.
 *
 * This type combines options with core initialization and session settings.
 * It allows customization of the UI elements, localization, and scanning behavior.
 */
export type BlinkIdComponentOptions = Simplify<
  {
    /**
     * The HTML element where the BlinkID UI will be mounted.
     * If not provided, the UI will be mounted to the document body.
     */
    targetNode?: HTMLElement;

    /**
     * Custom localization strings for the feedback UI.
     * Allows overriding default text messages shown during scanning.
     */
    feedbackLocalization?: Partial<LocalizationStrings>;

    /**
     * Customization options for the camera manager UI.
     * Controls camera-related UI elements like the video feed container and camera selection.
     */
    cameraManagerUiOptions?: Partial<CameraManagerUiOptions>;

    /**
     * Customization options for the feedback UI.
     * Controls the appearance and behavior of scanning feedback elements.
     */
    feedbackUiOptions?: Partial<FeedbackUiOptions>;
  } & BlinkIdInitSettings &
    Partial<Omit<BlinkIdSessionSettings, "inputImageSource">>
>;

/**
 * Represents the BlinkID component with all SDK instances and UI elements.
 * @public
 */
export type BlinkIdComponent = {
  /** The BlinkID Core SDK instance. */
  blinkIdCore: BlinkIdCore;
  /** The Camera Manager instance. */
  cameraManager: CameraManager;
  /** The BlinkID UX Manager instance. */
  blinkIdUxManager: BlinkIdUxManager;
  /** The Camera Manager UI instance. */
  cameraUi: CameraManagerComponent;
  /**
   * Destroys the BlinkID component and releases all resources.
   */
  destroy: () => Promise<void>;
  /**
   * Adds a callback function to be called when a result is obtained.
   */
  addOnResultCallback: InstanceType<
    typeof BlinkIdUxManager
  >["addOnResultCallback"];
  /**
   * Adds a callback function to be called when an error occurs.
   */
  addOnErrorCallback: InstanceType<
    typeof BlinkIdUxManager
  >["addOnErrorCallback"];
};

/**
 * Creates a BlinkID component with all necessary SDK instances and UI elements.
 *
 * This function initializes the complete BlinkID scanning system including:
 * - BlinkID Core SDK for document processing
 * - Camera Manager for video capture and camera control
 * - UX Manager for coordinating scanning workflow
 * - Camera UI for video display and camera controls
 * - Feedback UI for scanning guidance and status
 *
 * The function sets up the entire scanning pipeline and returns a component
 * object that provides access to all SDK instances and destruction capabilities.
 *
 * @param options - Configuration options for the BlinkID component
 * @returns Promise that resolves to a BlinkIdComponent with all SDK instances and UI elements
 *
 * @example
 * ```typescript
 * const blinkId = await createBlinkId({
 *   licenseKey: "your-license-key",
 *   targetNode: document.getElementById("blinkid-container"),
 *   feedbackUiOptions: {
 *     showOnboardingGuide: false
 *   }
 * });
 *
 * // Add result callback
 * blinkId.addOnResultCallback((result) => {
 *   console.log("Scanning result:", result);
 * });
 *
 * // Clean up when done
 * await blinkId.destroy();
 * ```
 */
export const createBlinkId = async ({
  licenseKey,
  microblinkProxyUrl,
  targetNode,
  cameraManagerUiOptions,
  initialMemory,
  resourcesLocation,
  scanningSettings,
  useLightweightBuild,
  wasmVariant,
  scanningMode,
  feedbackUiOptions,
}: BlinkIdComponentOptions) => {
  // we first initialize the direct API. This loads the WASM module and initializes the engine
  const blinkIdCore = await loadBlinkIdCore({
    licenseKey,
    microblinkProxyUrl,
    initialMemory,
    resourcesLocation,
    useLightweightBuild,
    wasmVariant,
  });

  const scanningSession = await blinkIdCore.createBlinkIdScanningSession({
    scanningMode,
    scanningSettings,
  });

  // we create the camera manager
  const cameraManager = new CameraManager();

  // we create the UX manager
  const blinkIdUxManager = new BlinkIdUxManager(cameraManager, scanningSession);

  // this creates the UI and attaches it to the DOM
  const cameraUi = await createCameraManagerUi(
    cameraManager,
    targetNode,
    cameraManagerUiOptions,
  );

  const unsub = cameraManager.subscribe(
    (s) => s.playbackState,
    (state) => {
      if (state === "playback") {
        // this creates the feedback UI and attaches it to the camera UI
        createBlinkIdFeedbackUi(blinkIdUxManager, cameraUi, feedbackUiOptions);

        if (feedbackUiOptions?.showOnboardingGuide === false) {
          void cameraManager.startFrameCapture();
        }

        unsub(); // unsubscribe from the playback state
      }
    },
  );

  // selects the camera and starts the stream
  await cameraManager.startCameraStream();

  const destroy = async () => {
    cameraUi.dismount();
    try {
      await blinkIdCore.terminate();
    } catch (error) {
      console.warn(error);
    }
  };

  const returnObject: BlinkIdComponent = {
    blinkIdCore,
    cameraManager,
    blinkIdUxManager,
    cameraUi,
    destroy,
    addOnErrorCallback:
      blinkIdUxManager.addOnErrorCallback.bind(blinkIdUxManager),
    addOnResultCallback:
      blinkIdUxManager.addOnResultCallback.bind(blinkIdUxManager),
  };

  return returnObject;
};
