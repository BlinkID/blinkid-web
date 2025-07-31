/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import { BlinkIdUxManager } from "../core/BlinkIdUxManager";

import { CameraManagerComponent } from "@microblink/camera-manager";
import { renderWithOwner } from "@microblink/shared-components/renderWithOwner";
import { BlinkIdFeedbackUi } from "./BlinkIdFeedbackUi";
import { BlinkIdUiStoreProvider } from "./BlinkIdUiStoreContext";
import { LocalizationStrings } from "./LocalizationContext";

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
  {
    localizationStrings,
    // todo - implement this
    preserveSdkInstance,
    showOnboardingGuide = true,
    showHelpButton = true,
    showDocumentFilteredModal = true,
    showTimeoutModal = true,
    showUnsupportedDocumentModal = true,
  }: FeedbackUiOptions = {},
) {
  // Use a ref or closure to handle the circular reference
  const dismountFeedbackUiRef = {
    current: () => {
      void 0;
    },
  };

  cameraManagerComponent.addOnDismountCallback(() => {
    // if the camera manager is unmounted, we need to unmount the feedback UI
    dismountFeedbackUiRef.current();
  });

  const unmountFunction = renderWithOwner(
    () => (
      <BlinkIdUiStoreProvider
        blinkIdUxManager={blinkIdUxManager}
        cameraManagerComponent={cameraManagerComponent}
        showOnboardingGuide={showOnboardingGuide}
        showHelpButton={showHelpButton}
        showDocumentFilteredModal={showDocumentFilteredModal}
        showTimeoutModal={showTimeoutModal}
        showUnsupportedDocumentModal={showUnsupportedDocumentModal}
        dismountFeedbackUi={() => dismountFeedbackUiRef.current()}
      >
        <BlinkIdFeedbackUi localization={localizationStrings} />
      </BlinkIdUiStoreProvider>
    ),
    cameraManagerComponent.feedbackLayerNode,
    cameraManagerComponent.owner,
  );

  dismountFeedbackUiRef.current = unmountFunction;
  return unmountFunction;
}
