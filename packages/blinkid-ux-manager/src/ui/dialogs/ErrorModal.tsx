/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import { AlertModal } from "@microblink/shared-components/Modal";
import { type Component } from "solid-js";
import { useBlinkIdUiStore } from "../BlinkIdUiStoreContext";
import { useLocalization } from "../LocalizationContext";

/**
 * The props for the ErrorModal component.
 */
interface ErrorModalProps {
  header: string;
  text: string;
  shouldResetScanningSession?: boolean;
}

/**
 * The ErrorModal component.
 *
 * @param props - The props for the ErrorModal component.
 * @returns The ErrorModal component.
 */
export const ErrorModal: Component<ErrorModalProps> = (props) => {
  const { t } = useLocalization();

  const { store, updateStore } = useBlinkIdUiStore();

  const hideModal = () => {
    updateStore({ errorState: undefined });
  };

  const dismountCameraManagerUi = () => {
    store.cameraManagerComponent.dismount();
  };

  const handlePrimaryClick = async () => {
    hideModal();

    if (props.shouldResetScanningSession) {
      await store.blinkIdUxManager.scanningSession.reset();
    }

    await store.blinkIdUxManager.cameraManager.startFrameCapture();
  };

  return (
    <AlertModal
      mountTarget={store.cameraManagerComponent.overlayLayerNode}
      header={props.header}
      text={props.text}
      open={true}
      onPrimaryClick={() => void handlePrimaryClick()}
      onSecondaryClick={() => dismountCameraManagerUi()}
      primaryButtonText={t.alert_retry_btn}
      secondaryButtonText={t.alert_cancel_btn}
    />
  );
};
