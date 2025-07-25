/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

/* @refresh reload */

import {
  BlinkIdScanningResult,
  loadBlinkIdCore,
  BlinkIdProcessResult,
} from "@microblink/blinkid-core";
import {
  BlinkIdUxManager,
  createBlinkIdFeedbackUi,
} from "@microblink/blinkid-ux-manager";
import {
  CameraManager,
  createCameraManagerUi,
} from "@microblink/camera-manager";

import { Component, createSignal, onMount, Show } from "solid-js";
import { ScoreDisplay } from "./ScoreDisplay";

/**
 * Debug info will be displayed in the UI.
 */
const SHOW_DEBUG = true;

/**
 * If you are using a portal, you can set this to true. Portal is a way to render the UI outside of the root element.
 * This is useful if you want to use the SDK in a modal or a popup.
 */
const USE_PORTAL = true;

/**
 * If the onboarding guide should be shown.
 */
const SHOW_ONBOARDING = false;

/**
 * This is the target node for the UI.
 */
const targetNode = !USE_PORTAL ? document.getElementById("root")! : undefined;

/**
 * This is the main component of the application.
 */
export const App: Component = () => {
  const [result, setResult] = createSignal<BlinkIdScanningResult>();
  const [blinkIdUxManager, setBlinkIdUxManager] =
    createSignal<BlinkIdUxManager>();
  const [loadState, setLoadState] = createSignal<
    "not-loaded" | "loading" | "ready"
  >("not-loaded");

  /**
   * This function removes the images from the result object. This is done only so we don't display raw images data in the UI.
   */
  const resultWithoutImages = () => {
    const resultCopy = structuredClone(result());

    for (const subResult of resultCopy?.subResults ?? []) {
      // remove the images from the sub result
      delete subResult?.inputImage;
      delete subResult?.documentImage;
      delete subResult?.faceImage;
      delete subResult?.signatureImage;
      delete subResult?.barcodeInputImage;
    }

    return resultCopy;
  };

  async function init() {
    setLoadState("loading");
    setResult(undefined);

    /*
     * We first initialize the direct API. This loads the WASM module and initializes the engine.
     * For additional configuration look at the BlinkIdInitSettings type.
     *
     * @see https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-core/docs/type-aliases/BlinkIdInitSettings.md
     */
    const blinkIdCore = await loadBlinkIdCore({
      licenseKey: import.meta.env.VITE_LICENCE_KEY,
    });

    console.log("creating new session");

    /*
     * Initialize the session with the default settings.
     * For additional configuration look at the BlinkIdSessionSettings type.
     *
     * @see https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-core/docs/type-aliases/BlinkIdSessionSettings.md
     */
    const session = await blinkIdCore.createBlinkIdScanningSession({
      /*
       * For default settings look at defaultSessionSettings
       *
       * @see https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-core/src/defaultSessionSettings.ts
       */
      scanningSettings: {
        // scanPassportDataPageOnly: false,
      },
    });

    /*
     * Create the camera manager.
     */
    const cameraManager = new CameraManager();

    /*
     * Create the UX manager.
     */
    const uxManager = new BlinkIdUxManager(cameraManager, session);
    // set the timeout duration to null to disable the timeout.
    uxManager.setTimeoutDuration(null);

    setBlinkIdUxManager(uxManager);

    /*
     * This creates the UI and attaches it to the DOM.
     * For additional configuration look at the CameraManagerUiOptions type.
     *
     * @see https://github.com/BlinkID/blinkid-web/blob/main/packages/camera-manager/docs/type-aliases/CameraManagerUiOptions.md
     */
    const cameraUi = await createCameraManagerUi(cameraManager, targetNode, {
      showMirrorCameraButton: true,
    });

    /*
     * This callback is called when the UI is dismounted.
     * This is useful if you want to perform some actions when the UI is dismounted.
     */
    cameraUi.addOnDismountCallback(() => {
      void blinkIdCore.terminate();
      setBlinkIdUxManager(undefined);
      setLoadState("not-loaded");
    });

    /*
     * This callback is called when the result is ready.
     * This is useful if you want to perform some actions when the result is ready.
     */
    uxManager.addOnResultCallback((result) => {
      setResult(result);
      cameraUi.dismount();
    });

    /*
     * This callback is called when the frame is processed.
     * This is useful if you want to perform some actions on certain results.
     */
    // uxManager.addOnFrameProcessCallback((frameProcessResult: BlinkIdProcessResult) => {
    //   console.log("frame processed", frameProcessResult);
    // });

    /*
     * Subscribe to the playback state.
     */
    const unsub = cameraManager.subscribe(
      (s) => s.playbackState,
      (state) => {
        /*
         * We wait until the video starts playing before we create the feedback UI
         * and start the frame capture. This also allows for the user to retry granting
         * camera permissions if they are not granted on the first try.
         */
        if (state === "playback") {
          /*
           * this creates the feedback UI and attaches it to the camera UI
           */
          createBlinkIdFeedbackUi(uxManager, cameraUi, {
            showOnboardingGuide: SHOW_ONBOARDING,
            /*
             * example of localization update
             */
            // localizationStrings: {
            //   scan_the_front_side: "Scan the front side of the ID card",
            // },
          });

          /*
           * if we are not showing the onboarding guide, we start the frame
           * capture manually otherwise, the user will be prompted to start the
           * frame capture
           */
          if (!SHOW_ONBOARDING) {
            void cameraManager.startFrameCapture();
          }

          setLoadState("ready");
          unsub(); // unsubscribe from the playback state
        }
      },
    );

    /*
     * Start the camera stream. This will start the camera stream and ask the user for camera permissions.
     */
    await cameraManager.startCameraStream({
      /*
       * This is an example of how to set the preferred camera.
       * In this case, we are setting the preferred camera to the first camera that contains "obs" in the name.
       */
      preferredCamera: (cameras) => {
        return cameras.find((camera) =>
          camera.name.toLowerCase().includes("obs"),
        );
      },
    });
  }

  onMount(() => {
    void init();
  });

  return (
    <div>
      <Show when={loadState() !== "ready"}>
        <button
          disabled={loadState() === "loading"}
          onClick={() => void init()}
        >
          Load
        </button>
      </Show>
      {/* Debug info */}
      <Show when={SHOW_DEBUG && blinkIdUxManager() && !resultWithoutImages()}>
        <ScoreDisplay blinkIdUxManager={blinkIdUxManager()!} />
      </Show>

      {/* Results */}
      <Show when={resultWithoutImages()}>
        {(trimmedResult) => (
          <pre>{JSON.stringify(trimmedResult(), null, 2)}</pre>
        )}
      </Show>
    </div>
  );
};
