/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import { Modal } from "@microblink/shared-components/Modal";
import { createEffect, type Component } from "solid-js";
import { useBlinkIdUiStore } from "../BlinkIdUiStoreContext";

import HelpCorrectFraming from "../assets/help/help_correct_framing.svg?component-solid";

import styles from "./styles.module.scss";
import { DialogTitle } from "@ark-ui/solid";
import { useLocalization } from "../LocalizationContext";
import { PingSdkUxEventImpl } from "../../shared/ping-implementations";

/**
 * The OnboardingGuideModal component.
 *
 * @returns The OnboardingGuideModal component.
 */
export const OnboardingGuideModal: Component = () => {
  const { t } = useLocalization();

  const { store, updateStore } = useBlinkIdUiStore();
  const ping = store.blinkIdUxManager.scanningSession.ping;

  const modalVisible = () => store.showOnboardingGuide;
  const hideModal = () => {
    updateStore({ showOnboardingGuide: false });
    void store.blinkIdUxManager.cameraManager.startFrameCapture();
  };

  createEffect(() => {
    if (modalVisible()) {
      void ping(
        new PingSdkUxEventImpl({
          eventType: "OnboardingInfoDisplayed",
        }),
      );
    }
  });

  let startScanningBtnRef!: HTMLButtonElement;

  return (
    <Modal
      mountTarget={store.cameraManagerComponent.overlayLayerNode}
      open={modalVisible()}
      modalStyle="large"
    >
      <div class={styles.onboardingGuide}>
        <div class={styles.content}>
          <div class={styles.header}>
            <HelpCorrectFraming aria-hidden />
            <div class={styles.textContent}>
              <DialogTitle>{t.onboarding_modal_title}</DialogTitle>
              <p>{t.onboarding_modal_details}</p>
            </div>
          </div>
        </div>
        <div class={styles.actions}>
          <button
            ref={startScanningBtnRef}
            class={styles.buttonPrimary}
            onClick={() => hideModal()}
          >
            {t.onboarding_modal_btn}
          </button>
        </div>
      </div>
    </Modal>
  );
};
