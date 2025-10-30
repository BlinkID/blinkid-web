/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import { BlinkIdUxManager } from "../core/BlinkIdUxManager";

import { CameraManagerComponent } from "@microblink/camera-manager";
import { renderWithOwner } from "@microblink/shared-components/renderWithOwner";
import { BlinkIdFeedbackUi } from "./BlinkIdFeedbackUi";
import { BlinkIdUiStoreProvider } from "./BlinkIdUiStoreContext";
import { LocalizationStrings } from "./LocalizationContext";
import { merge } from "merge-anything";

/**
 * The options for the createBlinkIdFeedbackUi function.
 */
export type FeedbackUiOptions = {
  /**
   * The localization strings.
   */
  localizationStrings?: Partial<LocalizationStrings>;
  /**
   * If set to `true`, the BlinkID instance will not be terminated when the
   * feedback UI is unmounted.
   *
   * @defaultValue false
   */
  preserveSdkInstance?: boolean;
  /**
   * If set to `true`, the onboarding guide will be shown.
   *
   * @defaultValue true
   */
  showOnboardingGuide?: boolean;
  /**
   * If set to `true`, the help button will be shown.
   *
   * @defaultValue true
   */
  showHelpButton?: boolean;
  /**
   * The timeout for the help tooltip.
   *
   * @defaultValue 3000
   */
  showHelpTooltipTimeout?: number;
  /**
   * If set to `true`, the document filtered modal will be shown.
   *
   * @defaultValue true
   */
  showDocumentFilteredModal?: boolean;
  /**
   * If set to `true`, the timeout modal will be shown.
   *
   * @defaultValue true
   */
  showTimeoutModal?: boolean;
  /**
   * If set to `true`, the document unsupported modal will be shown.
   *
   * @defaultValue true
   */
  showUnsupportedDocumentModal?: boolean;
};

const defaultFeedbackUiOptions: Required<FeedbackUiOptions> = {
  localizationStrings: {},
  preserveSdkInstance: false,
  showOnboardingGuide: true,
  showHelpButton: true,
  showDocumentFilteredModal: true,
  showTimeoutModal: true,
  showUnsupportedDocumentModal: true,
  showHelpTooltipTimeout: 3000,
};

/**
 * Creates the BlinkID feedback UI.
 *
 * @param blinkIdUxManager - The BlinkID Ux Manager.
 * @param cameraManagerComponent - The Camera Manager Component.
 * @param options - The options for the createBlinkIdFeedbackUi function.
 *
 * @returns The function to unmount the feedback UI.
 */
export function createBlinkIdFeedbackUi(
  blinkIdUxManager: BlinkIdUxManager,
  cameraManagerComponent: CameraManagerComponent,
  feedbackUiOptions: Partial<FeedbackUiOptions>,
) {
  // Use a ref or closure to handle the circular reference
  const dismountFeedbackUiRef = {
    current: () => {
      void 0;
    },
  };

  const mergedUiOptions = merge(defaultFeedbackUiOptions, feedbackUiOptions);

  cameraManagerComponent.addOnDismountCallback(() => {
    // if the camera manager is unmounted, we need to unmount the feedback UI
    dismountFeedbackUiRef.current();
  });

  const unmountFunction = renderWithOwner(
    () => (
      <BlinkIdUiStoreProvider
        blinkIdUxManager={blinkIdUxManager}
        cameraManagerComponent={cameraManagerComponent}
        showOnboardingGuide={mergedUiOptions.showOnboardingGuide}
        showHelpButton={mergedUiOptions.showHelpButton}
        showDocumentFilteredModal={mergedUiOptions.showDocumentFilteredModal}
        showTimeoutModal={mergedUiOptions.showTimeoutModal}
        showUnsupportedDocumentModal={
          mergedUiOptions.showUnsupportedDocumentModal
        }
        showHelpTooltipTimeout={mergedUiOptions.showHelpTooltipTimeout}
        dismountFeedbackUi={() => dismountFeedbackUiRef.current()}
      >
        <BlinkIdFeedbackUi localization={mergedUiOptions.localizationStrings} />
      </BlinkIdUiStoreProvider>
    ),
    cameraManagerComponent.feedbackLayerNode,
    cameraManagerComponent.owner,
  );

  dismountFeedbackUiRef.current = unmountFunction;
  return unmountFunction;
}
