/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import { AlertModal } from "@microblink/shared-components/AlertModal";
import { Component, Show } from "solid-js";
import { useCameraUiStore } from "./CameraUiStoreContext";
import { cameraUiRefSignalStore } from "./zustandRefStore";
import { useLocalization } from "./LocalizationContext";

/**
 * The CameraErrorModal component.
 */
const CameraErrorModal: Component = () => {
  const { t } = useLocalization();

  const { cameraManagerSolidStore, cameraManager, dismountCameraUi } =
    useCameraUiStore();
  const errorState = cameraManagerSolidStore((x) => x.errorState);
  const overlayLayer = cameraUiRefSignalStore((x) => x.overlayLayer);

  // TODO: handle only permission error for now

  return (
    <>
      <Show when={errorState()}>
        <AlertModal
          mountTarget={overlayLayer()}
          header={t.camera_error_title}
          open={true}
          onPrimaryClick={() => void cameraManager.startCameraStream()}
          onSecondaryClick={() => dismountCameraUi()}
          primaryButtonText={t.camera_error_primary_btn}
          secondaryButtonText={t.camera_error_cancel_btn}
          text={t.camera_error_details}
        />
      </Show>
    </>
  );
};

export { CameraErrorModal };
