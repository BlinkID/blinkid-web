/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import { Component } from "solid-js";
import { Modal } from "./Modal";

export interface TimeoutErrorModalProps {
  open: boolean;
  onTryAgain: () => void;
  onCancel: () => void;
}

/**
 * Modal component for displaying timeout errors when document
 * scanning takes longer than the configured timeout duration.
 */
export const TimeoutErrorModal: Component<TimeoutErrorModalProps> = (props) => {
  return (
    <Modal
      open={props.open}
      title="⏰ Scanning Timeout"
      primaryButtonText="Try Again"
      secondaryButtonText="Cancel"
      onPrimaryAction={props.onTryAgain}
      onSecondaryAction={props.onCancel}
      variant="warning"
    >
      <p>
        Scanning is taking longer than expected. Please ensure the document is
        well-lit, in focus, and positioned correctly within the camera frame.
      </p>
    </Modal>
  );
};
