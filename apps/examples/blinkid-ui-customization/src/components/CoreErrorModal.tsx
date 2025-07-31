/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import { Component } from "solid-js";
import { Modal } from "./Modal";

export interface CoreErrorModalProps {
  open: boolean;
  errorMessage: string;
  onRetry: () => void;
  onCancel: () => void;
}

/**
 * Modal component for displaying BlinkID Core initialization errors
 * such as invalid license key or WASM loading failures.
 */
export const CoreErrorModal: Component<CoreErrorModalProps> = (props) => {
  return (
    <Modal
      open={props.open}
      title="⚠️ SDK Initialization Error"
      primaryButtonText="Retry"
      secondaryButtonText="Cancel"
      onPrimaryAction={props.onRetry}
      onSecondaryAction={props.onCancel}
      variant="error"
    >
      <p>{props.errorMessage}</p>
    </Modal>
  );
};
