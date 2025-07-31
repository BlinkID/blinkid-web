/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import { Component } from "solid-js";
import { Modal } from "./Modal";

export interface UnsupportedDocumentModalProps {
  open: boolean;
  onTryDifferent: () => void;
  onCancel: () => void;
}

/**
 * Modal component for displaying unsupported document errors when
 * the scanned document type is not supported by the BlinkID engine.
 */
export const UnsupportedDocumentModal: Component<
  UnsupportedDocumentModalProps
> = (props) => {
  return (
    <Modal
      open={props.open}
      title="❌ Unsupported Document"
      primaryButtonText="Try Different Document"
      secondaryButtonText="Cancel"
      onPrimaryAction={props.onTryDifferent}
      onSecondaryAction={props.onCancel}
      variant="secondary"
    >
      <p>
        The document you're trying to scan is not supported by this application.
        Please try with a supported identity document such as a passport,
        driver's license, or national ID.
      </p>
    </Modal>
  );
};
