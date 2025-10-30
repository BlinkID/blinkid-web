/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import { cameraManagerStore } from "@microblink/camera-manager";
import type { Component } from "solid-js";
import {
  createEffect,
  createSignal,
  Match,
  onCleanup,
  onMount,
  Show,
  Switch,
} from "solid-js";
import { createWithSignal } from "solid-zustand";
import {
  BlinkIdUiState,
  firstSideCapturedUiStateKeys,
} from "../core/blinkid-ui-state";
import {
  LocalizationProvider,
  LocalizationStrings,
  useLocalization,
} from "./LocalizationContext";
import { UiFeedbackOverlay } from "./UiFeedbackOverlay";

// this triggers extraction of CSS from the UnoCSS plugin
import "virtual:uno.css";

import { SmartEnvironmentProvider } from "@microblink/shared-components/SmartEnvironmentProvider";
import DemoOverlay from "./assets/demo-overlay.svg?component-solid";
import MicroblinkOverlay from "./assets/microblink.svg?component-solid";
import { useBlinkIdUiStore } from "./BlinkIdUiStoreContext";
import { ErrorModal } from "./dialogs/ErrorModal";
import { HelpButton, HelpModal } from "./dialogs/HelpModal";
import { OnboardingGuideModal } from "./dialogs/OnboardingGuideModal";

import { PingSdkUxEventImpl } from "../shared/ping-implementations";
import styles from "./styles.module.scss";

/**
 * The BlinkIdFeedbackUi component. This is the main component that renders the
 * feedback UI for the BlinkID SDK. It is responsible for rendering the feedback
 * UI, the overlays, and the help button.
 *
 * @param props - The props for the BlinkIdFeedbackUi component.
 * @returns The BlinkIdFeedbackUi component.
 */
export const BlinkIdFeedbackUi: Component<{
  localization?: Partial<LocalizationStrings>;
}> = (props) => {
  const { store, updateStore } = useBlinkIdUiStore();

  // `blinkIdUxManager` is not reactive, so we need to create a new signal for
  // the UI state. This is a hacky way to make the UI state reactive.
  const [uiState, setUiState] = createSignal<BlinkIdUiState>(
    store.blinkIdUxManager.uiState,
  );

  // Handle errors during scanning
  createEffect(() => {
    const errorCallbackCleanup = store.blinkIdUxManager.addOnErrorCallback(
      (errorState) => {
        updateStore({ errorState });
      },
    );
    onCleanup(() => errorCallbackCleanup());
  });

  onMount(() => {
    const cleanupDismountCallback =
      store.cameraManagerComponent.addOnDismountCallback(() => {
        cleanupDismountCallback();

        // if not user-initiated, it's a regular dismount, not a button-click,
        // so we early exit.
        if (!store.cameraManagerComponent.cameraManager.userInitiatedAbort) {
          return;
        }

        void store.blinkIdUxManager.scanningSession.ping(
          new PingSdkUxEventImpl({
            eventType: "CloseButtonClicked",
          }),
        );
      });
  });

  // Handle document filtered during scanning
  createEffect(() => {
    const documentFilteredCallbackCleanup =
      store.blinkIdUxManager.addOnDocumentFilteredCallback(() => {
        updateStore({ documentFiltered: true });
        void store.blinkIdUxManager.scanningSession.ping(
          new PingSdkUxEventImpl({
            eventType: "AlertDisplayed",
            alertType: "DocumentClassNotAllowed",
          }),
        );
      });
    onCleanup(() => documentFilteredCallbackCleanup());
  });

  const playbackState = createWithSignal(cameraManagerStore)(
    (s) => s.playbackState,
  );

  const isProcessing = () => playbackState() === "capturing";

  // Processing is stopped, but we still want to show the feedback
  // TODO: see if there is a better way to handle these edge-cases
  const shouldShowFeedback = () => {
    return (
      isProcessing() ||
      firstSideCapturedUiStateKeys.includes(uiState().key) ||
      uiState().key === "DOCUMENT_CAPTURED"
    );
  };

  const displayTimeoutModal = () =>
    store.showTimeoutModal && store.errorState === "timeout";

  const shouldShowDemoOverlay = () => {
    return store.blinkIdUxManager.getShowDemoOverlay();
  };

  const shouldShowProductionOverlay = () => {
    return store.blinkIdUxManager.getShowProductionOverlay();
  };

  const handleUiStateChange = (newUiState: BlinkIdUiState) => {
    setUiState(newUiState);
  };

  createEffect(() => {
    const removeUiStateChangeCallback =
      store.blinkIdUxManager.addOnUiStateChangedCallback(handleUiStateChange);

    onCleanup(() => removeUiStateChangeCallback());
  });

  createEffect(() => {
    if (displayTimeoutModal()) {
      void store.blinkIdUxManager.scanningSession.ping(
        new PingSdkUxEventImpl({
          eventType: "AlertDisplayed",
          alertType: "StepTimeout",
        }),
      );
    }
  });

  return (
    <div>
      <style
        id="blinkid-ux-manager-style"
        ref={(ref) => {
          if (window.__blinkidUxManagerCssCode) {
            ref.innerHTML = window.__blinkidUxManagerCssCode;
          }
        }}
      />
      <LocalizationProvider userStrings={props.localization}>
        <SmartEnvironmentProvider>
          {() => {
            const { t } = useLocalization();

            return (
              <>
                <Switch>
                  <Match when={displayTimeoutModal()}>
                    <ErrorModal
                      header={t.scan_unsuccessful}
                      text={t.scan_unsuccessful_details}
                      shouldResetScanningSession={true}
                    />
                  </Match>
                  <Match
                    when={
                      store.showUnsupportedDocumentModal &&
                      store.errorState === "unsupported_document"
                    }
                  >
                    <ErrorModal
                      header={t.document_not_recognized}
                      text={t.document_not_recognized_details}
                      shouldResetScanningSession={true}
                    />
                  </Match>
                  <Match
                    when={
                      store.showDocumentFilteredModal && store.documentFiltered
                    }
                  >
                    <ErrorModal
                      header={t.document_filtered}
                      text={t.document_filtered_details}
                      shouldResetScanningSession={true}
                    />
                  </Match>
                </Switch>

                <Show when={shouldShowFeedback()}>
                  <UiFeedbackOverlay uiState={uiState()} />
                </Show>

                <Show when={shouldShowDemoOverlay()}>
                  <div class={styles.demoOverlay}>
                    <DemoOverlay width="250" aria-hidden />
                  </div>
                </Show>

                <Show when={shouldShowProductionOverlay()}>
                  <div class={styles.microblinkOverlay}>
                    <MicroblinkOverlay width="100" aria-hidden />
                  </div>
                </Show>

                <Show when={store.showHelpButton}>
                  <HelpButton isProcessing={isProcessing()} />
                </Show>
              </>
            );
          }}
        </SmartEnvironmentProvider>

        <OnboardingGuideModal />
        <HelpModal />
      </LocalizationProvider>
    </div>
  );
};
