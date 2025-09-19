/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import { Component } from "solid-js";
import { Modal } from "./Modal";

export interface CameraErrorModalProps {
  open: boolean;
  errorMessage: string;
  onRetry: () => void;
  onCancel: () => void;
}

/**
 * Modal component for displaying camera-related errors such as
 * permission denied
 */
export const CameraErrorModal: Component<CameraErrorModalProps> = (props) => {
  return (
    <Modal
      open={props.open}
      title="📷 Camera Error"
      primaryButtonText="Retry Camera"
      secondaryButtonText="Get Scanning Session Result"
      onPrimaryAction={props.onRetry}
      onSecondaryAction={props.onCancel}
      variant="error"
    >
      <p>{props.errorMessage}</p>
    </Modal>
  );
};
