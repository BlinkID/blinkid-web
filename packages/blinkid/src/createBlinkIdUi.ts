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

export type BlinkIdComponentOptions = Simplify<
  {
    targetNode?: HTMLElement;
    feedbackLocalization?: Partial<LocalizationStrings>;
    cameraManagerUiOptions?: Partial<CameraManagerUiOptions>;
    feedbackUiOptions?: Partial<FeedbackUiOptions>;
  } & BlinkIdInitSettings &
    Partial<Omit<BlinkIdSessionSettings, "inputImageSource">>
>;

export type BlinkIdComponent = {
  blinkIdCore: BlinkIdCore;
  cameraManager: CameraManager;
  blinkIdUxManager: BlinkIdUxManager;
  cameraUi: CameraManagerComponent;
  /**
   * Destroys the BlinkID UI and releases all resources.
   */
  destroy: () => Promise<void>;
  addOnResultCallback: InstanceType<
    typeof BlinkIdUxManager
  >["addOnResultCallback"];
  addOnErrorCallback: InstanceType<
    typeof BlinkIdUxManager
  >["addOnErrorCallback"];
};

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
