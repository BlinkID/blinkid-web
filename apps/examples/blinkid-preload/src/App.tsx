/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

/* @refresh reload */
import styles from "./App.module.css";
import "./index.css";

import {
  BlinkIdScanningResult,
  loadBlinkIdCore,
  RemoteScanningSession,
} from "@microblink/blinkid-core";
import {
  BlinkIdUxManager,
  createBlinkIdFeedbackUi,
} from "@microblink/blinkid-ux-manager";
import {
  CameraManager,
  createCameraManagerUi,
} from "@microblink/camera-manager";

import {
  Component,
  createEffect,
  createSignal,
  Match,
  Show,
  Switch,
} from "solid-js";

type SignupSteps =
  | "intro"
  | "form-input"
  | "document-scan"
  | "success"
  | "error";

export const App: Component = () => {
  // These are the signals that will be used to manage the state of the application
  // See https://docs.solidjs.com/concepts/intro-to-reactivity for more information

  const [step, setStep] = createSignal<SignupSteps>("intro");
  const [loading, setLoading] = createSignal<boolean>(false);
  const [result, setResult] = createSignal<BlinkIdScanningResult>();
  const [blinkIdSession, setBlinkIdSession] =
    createSignal<RemoteScanningSession>();

  /**
   * Derived signal that removes the images from the result object
   * https://docs.solidjs.com/concepts/derived-values/derived-signals
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

  const createSession = async () => {
    try {
      const blinkId = await loadBlinkIdCore({
        licenseKey: import.meta.env.VITE_LICENCE_KEY,
      });

      const session = await blinkId.createBlinkIdScanningSession();
      // Need to use the arrow function:
      // https://github.com/GoogleChromeLabs/comlink/issues/571#issuecomment-2048772957
      setBlinkIdSession(() => session);
      setLoading(false);
    } catch (e) {
      setStep("error");
      setLoading(false);
    }
  };

  const startOver = () => {
    setStep("intro");
    setResult(undefined);
    setBlinkIdSession(undefined);
  };

  // This effect will run when the step changes
  // It will load the BlinkID core when the step is "form-input"
  createEffect(() => {
    // don't reload the core if it's already loaded
    if (blinkIdSession()) {
      return;
    }
    if (step() === "form-input") {
      setLoading(true);
      // load the BlinkID core
      void createSession();
    } else {
      setLoading(false);
    }
  });

  createEffect(() => {
    if (step() === "document-scan") {
      // capture value so we don't need to check every time
      const core = blinkIdSession();

      if (!core) {
        // for debug purposes, if you want to start at a different step
        void createSession();
      }

      if (core) {
        // Use iife to avoid async in top level effect
        void (async () => {
          // we create the camera manager
          const cameraManager = new CameraManager();

          // this creates the UI and attaches it to the DOM
          const cameraUi = await createCameraManagerUi(cameraManager);

          cameraUi.addOnDismountCallback(() => {
            console.log("camera ui dismounted");
          });

          // we create the UX manager
          const blinkIdUxManager = new BlinkIdUxManager(cameraManager, core);
          blinkIdUxManager.setTimeoutDuration(8000);

          blinkIdUxManager.addOnResultCallback((result) => {
            setResult(result);
            setStep("success");
            cameraUi.dismount();
          });

          await cameraManager.startCameraStream();

          // this creates the feedback UI and attaches it to the camera UI
          createBlinkIdFeedbackUi(blinkIdUxManager, cameraUi, {
            preserveSdkInstance: true,
          });

          await cameraManager.startFrameCapture();
        })();
      }
    }
  });

  return (
    <div class={styles.container}>
      <Switch>
        <Match when={step() === "intro"}>
          <div class={styles.intro}>
            <h1 class={styles.title}>Welcome to BlinkID Demo</h1>
            <button class={styles.button} onClick={() => setStep("form-input")}>
              Start Demo
            </button>
          </div>
        </Match>
        <Match when={step() === "form-input"}>
          <div class={styles.formInput}>
            <h1 class={styles.title}>Before You Scan</h1>
            <form
              class={styles.form}
              // prevent submit for the demo
              onSubmit={(e) => e.preventDefault()}
            >
              <div class={styles.formGroup}>
                <label class={styles.label}>Email Address</label>
                <input
                  type="email"
                  class={styles.input}
                  required
                  placeholder="your@email.com"
                />
              </div>
              <div class={styles.formGroup}>
                <label class={styles.label}>Phone Number</label>
                <input
                  type="tel"
                  class={styles.input}
                  required
                  placeholder="+1 (555) 555-5555"
                />
              </div>
              <button
                class={styles.button}
                type="button"
                onClick={() => setStep("document-scan")}
                disabled={loading()}
              >
                <div class={styles.buttonContent}>
                  {loading() && <div class={styles.buttonSpinner} />}
                  <span>Continue to Document Scan</span>
                </div>
              </button>
            </form>
          </div>
        </Match>
        <Match when={step() === "document-scan"}>
          <div class={styles.documentScan} />
        </Match>
        <Match when={step() === "success"}>
          <div class={styles.success}>
            <h1 class={styles.title}>Success!</h1>
            <button class={styles.button} onClick={startOver}>
              Start Over
            </button>
            <h2>Results:</h2>
            {/* results */}
            <Show when={resultWithoutImages()}>
              <pre class={styles.results}>
                {JSON.stringify(resultWithoutImages()!, null, 2)}
              </pre>
            </Show>
          </div>
        </Match>
        <Match when={step() === "error"}>
          <div class={styles.error}>
            <h1 class={styles.title}>Error</h1>
            <button class={styles.button} onClick={() => setStep("intro")}>
              Start Over
            </button>
          </div>
        </Match>
      </Switch>
    </div>
  );
};
