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
  Show,
  Switch,
} from "solid-js";
import { createWithSignal } from "solid-zustand";
import {
  BlinkIdUiState,
  firstSideCapturedStates,
} from "../core/blinkid-ui-state";
import {
  LocalizationProvider,
  LocalizationStrings,
  useLocalization,
} from "./LocalizationContext";
import { UiFeedbackOverlay } from "./UiFeedbackOverlay";

// this triggers extraction of CSS from the UnoCSS plugin
import "virtual:uno.css";

import { useBlinkIdUiStore } from "./BlinkIdUiStoreContext";
import { SmartEnvironmentProvider } from "@microblink/shared-components/SmartEnvironmentProvider";
import { OnboardingGuideModal } from "./dialogs/OnboardingGuideModal";
import { HelpButton, HelpModal } from "./dialogs/HelpModal";
import { ErrorModal } from "./dialogs/ErrorModal";
import DemoOverlay from "./assets/demo-overlay.svg?component-solid";
import MicroblinkOverlay from "./assets/microblink.svg?component-solid";

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

  // TODO: fix this
  // only used to map LOW_QUALITY_FRONT and LOW_QUALITY_BACK to SENSING_FRONT
  // and SENSING_BACK.
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

  // Handle document filtered during scanning
  createEffect(() => {
    const documentFilteredCallbackCleanup =
      store.blinkIdUxManager.addOnDocumentFilteredCallback((_) => {
        updateStore({ documentFiltered: true });
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
      firstSideCapturedStates.includes(uiState().key) ||
      uiState().key === "DOCUMENT_CAPTURED"
    );
  };

  const shouldShowDemoOverlay = () => {
    return store.blinkIdUxManager.getShowDemoOverlay();
  };

  const shouldShowProductionOverlay = () => {
    return store.blinkIdUxManager.getShowProductionOverlay();
  };

  createEffect(() => {
    const removeUiStateChangeCallback =
      store.blinkIdUxManager.addOnUiStateChangedCallback((newUiState) => {
        setUiState(newUiState);
      });

    onCleanup(() => removeUiStateChangeCallback());
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
                  <Match
                    when={
                      store.showTimeoutModal && store.errorState === "timeout"
                    }
                  >
                    <ErrorModal
                      header={t.scan_unsuccessful}
                      text={t.scan_unsuccessful_details}
                      shouldResetScanningSession={true}
                    />
                  </Match>
                  <Match
                    when={
                      store.showUnsupportedDocumentModal &&
                      uiState().key === "UNSUPPORTED_DOCUMENT"
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
                    <DemoOverlay width="250" />
                  </div>
                </Show>

                <Show when={shouldShowProductionOverlay()}>
                  <div class={styles.microblinkOverlay}>
                    <MicroblinkOverlay width="100" />
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
