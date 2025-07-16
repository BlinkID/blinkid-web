/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import { Modal } from "@microblink/shared-components/Modal";
import {
  type Component,
  createEffect,
  createSignal,
  For,
  onCleanup,
  ParentComponent,
} from "solid-js";
import { useBlinkIdUiStore } from "../BlinkIdUiStoreContext";

import HelpCorrectFraming from "../assets/help/help_fields_visible.svg?component-solid";
import HelpHarshLight from "../assets/help/help_harsh_light.svg?component-solid";
import HelpKeepStill from "../assets/help/help_keep_still.svg?component-solid";
import { Carousel, DialogTitle, Tooltip } from "@ark-ui/solid";
import QuestionIcon from "../assets/icons/icon-question.svg?component-solid";

import { Dynamic } from "solid-js/web";

import styles from "./styles.module.scss";
import { LocalizationStrings, useLocalization } from "../LocalizationContext";

/**
 * The HelpModal component.
 *
 * @returns The HelpModal component.
 */
export const HelpModal: Component = () => {
  const { t } = useLocalization();

  const { store, updateStore } = useBlinkIdUiStore();
  const [currentStep, setCurrentStep] = createSignal(0);

  const modalVisible = () => store.showHelpModal;
  const hideModal = () => {
    updateStore({ showHelpModal: false });
    setCurrentStep(0);
    void store.blinkIdUxManager.cameraManager.startFrameCapture();
  };

  const steps: {
    title: keyof LocalizationStrings;
    img: Component;
    text: keyof LocalizationStrings;
  }[] = [
    {
      title: "help_modal_title_1",
      img: HelpCorrectFraming,
      text: "help_modal_details_1",
    },
    {
      title: "help_modal_title_2",
      img: HelpHarshLight,
      text: "help_modal_details_2",
    },
    {
      title: "help_modal_title_3",
      img: HelpKeepStill,
      text: "help_modal_details_3",
    },
  ];

  const isLastStep = () => currentStep() === steps.length - 1;
  const isFirstStep = () => currentStep() === 0;

  let startScanningBtnRef!: HTMLButtonElement;

  createEffect(() => {
    const showHelpModal = store.showHelpModal;

    if (showHelpModal === undefined) {
      return;
    }

    if (showHelpModal) {
      store.blinkIdUxManager.cameraManager.stopFrameCapture();
    } else {
      void store.blinkIdUxManager.cameraManager.startFrameCapture();
    }
  });

  return (
    <Modal
      mountTarget={store.cameraManagerComponent.overlayLayerNode}
      initialFocusEl={() => startScanningBtnRef}
      open={modalVisible()}
      showCloseButton
      onCloseClicked={() => hideModal()}
    >
      <Carousel.Root
        defaultPage={0}
        slideCount={steps.length}
        page={currentStep()}
        onPageChange={(details) => setCurrentStep(details.page)}
        class={styles.carousel}
      >
        <Carousel.ItemGroup class={styles.itemGroup}>
          <For each={steps}>
            {(step, index) => (
              <Carousel.Item class={styles.item} index={index()}>
                <Dynamic component={step.img} />
                <div class={styles.textContent}>
                  <DialogTitle>{t[step.title]}</DialogTitle>
                  <p>{t[step.text]}</p>
                </div>
              </Carousel.Item>
            )}
          </For>
        </Carousel.ItemGroup>
        <Carousel.IndicatorGroup class={styles.indicators}>
          <For each={steps}>
            {(_, i) => (
              <Carousel.Indicator index={i()} class={styles.indicator} />
            )}
          </For>
        </Carousel.IndicatorGroup>
        <Carousel.Control class={styles.controls}>
          <div class={styles.controlsInner}>
            <Carousel.PrevTrigger
              class={styles.buttonSecondary}
              disabled={isFirstStep()}
            >
              {t.help_modal_back_btn}
            </Carousel.PrevTrigger>
            <Carousel.NextTrigger
              ref={startScanningBtnRef}
              class={styles.buttonPrimary}
              onClick={() => {
                if (currentStep() >= steps.length - 1) {
                  hideModal();
                }
              }}
              disabled={false}
            >
              {isLastStep() ? t.help_modal_done_btn : t.help_modal_next_btn}
            </Carousel.NextTrigger>
          </div>
        </Carousel.Control>
      </Carousel.Root>
    </Modal>
  );
};

/**
 * The HelpButton component.
 *
 * @param props - The props for the HelpButton component.
 * @returns The HelpButton component.
 */
export const HelpButton: ParentComponent<{ isProcessing: boolean }> = (
  props,
) => {
  const { t } = useLocalization();
  const { store, updateStore } = useBlinkIdUiStore();

  const [tooltipOpen, setTooltipOpen] = createSignal(false);
  const [wasAutoShown, setWasAutoShown] = createSignal(false);

  let showTooltipTimeoutId: number | undefined;
  let hideTooltipTimeoutId: number | undefined;

  const clearTimeouts = () => {
    if (showTooltipTimeoutId !== undefined) {
      window.clearTimeout(showTooltipTimeoutId);
      showTooltipTimeoutId = undefined;
    }
    if (hideTooltipTimeoutId !== undefined) {
      window.clearTimeout(hideTooltipTimeoutId);
      hideTooltipTimeoutId = undefined;
    }
  };

  const scheduleAutoHide = () => {
    const displayDuration = store.blinkIdUxManager.getHelpTooltipHideDelay();
    if (displayDuration && displayDuration > 0) {
      hideTooltipTimeoutId = window.setTimeout(() => {
        setTooltipOpen(false);
      }, displayDuration);
    }
  };

  const showTooltipAutomatically = () => {
    const timeout = store.blinkIdUxManager.getHelpTooltipShowDelay();
    if (timeout && timeout > 0) {
      showTooltipTimeoutId = window.setTimeout(() => {
        setTooltipOpen(true);
        setWasAutoShown(true);
        scheduleAutoHide();
      }, timeout);
    }
  };

  // Cleanup on component unmount
  onCleanup(clearTimeouts);

  // Handle processing state changes
  createEffect(() => {
    if (!props.isProcessing) {
      setTooltipOpen(false);
      setWasAutoShown(false);
      clearTimeouts();
      return;
    }

    // Show tooltip only if it hasn't been shown before
    if (!tooltipOpen() && !wasAutoShown()) {
      showTooltipAutomatically();
    }
  });

  return (
    <Tooltip.Root
      positioning={{ placement: "top-end" }}
      open={tooltipOpen()}
      openDelay={300}
      closeDelay={300}
      onOpenChange={(details) => setTooltipOpen(details.open)}
    >
      <Tooltip.Trigger
        part="help-button-part"
        aria-label={t.help_aria_label}
        class={styles.helpButton}
        onClick={() => updateStore({ showHelpModal: true })}
      >
        <QuestionIcon />
      </Tooltip.Trigger>

      <Tooltip.Positioner>
        <Tooltip.Content part="help-button-tooltip-part" class={styles.tooltip}>
          <Tooltip.Arrow class={styles.arrow}>
            <Tooltip.ArrowTip />
          </Tooltip.Arrow>
          {t.help_tooltip}
        </Tooltip.Content>
      </Tooltip.Positioner>
    </Tooltip.Root>
  );
};
