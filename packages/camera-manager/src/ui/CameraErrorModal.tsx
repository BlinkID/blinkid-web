/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import { AlertModal } from "@microblink/shared-components/AlertModal";
import { Component, Show } from "solid-js";
import { CameraError } from "../core/cameraError";
import { useCameraUiStore } from "./CameraUiStoreContext";
import { useLocalization } from "./LocalizationContext";
import { cameraUiRefSignalStore } from "./zustandRefStore";

/**
 * The CameraErrorModal component.
 */
const CameraErrorModal: Component = () => {
  const { t } = useLocalization();

  const { cameraManagerSolidStore, cameraManager, dismountCameraUi } =
    useCameraUiStore();
  const errorState = cameraManagerSolidStore((x) => x.errorState);
  const overlayLayer = cameraUiRefSignalStore((x) => x.overlayLayer);

  const isPermissionError = () => {
    const err = errorState();
    if (err instanceof CameraError && err.code === "PERMISSION_DENIED") {
      return true;
    } else {
      return false;
    }
  };

  const headerText = () => {
    if (isPermissionError()) {
      return t.camera_error_title;
    } else if (errorState()) {
      return errorState()!.name;
    } else {
      return "";
    }
  };

  const bodyText = () => {
    if (isPermissionError()) {
      return t.camera_error_details;
    } else if (errorState()) {
      return errorState()!.name;
    } else {
      return "";
    }
  };

  return (
    <>
      <Show when={isPermissionError()}>
        <AlertModal
          mountTarget={overlayLayer()}
          header={headerText()}
          text={bodyText()}
          open={true}
          onPrimaryClick={() => void cameraManager.startCameraStream()}
          onSecondaryClick={() => dismountCameraUi()}
          primaryButtonText={t.camera_error_primary_btn}
          secondaryButtonText={t.camera_error_cancel_btn}
        />
      </Show>
    </>
  );
};

export { CameraErrorModal };
