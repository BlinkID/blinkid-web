/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import { Component } from "solid-js";
import { Modal } from "./Modal";

export interface FilteredDocumentModalProps {
  open: boolean;
  filterMessage: string;
  onTryDifferent: () => void;
  onCancel: () => void;
}

/**
 * Modal component for displaying filtered document errors when
 * a document passes BlinkID validation but fails custom business logic filters.
 */
export const FilteredDocumentModal: Component<FilteredDocumentModalProps> = (
  props,
) => {
  return (
    <Modal
      open={props.open}
      title="🚫 Document Not Accepted"
      primaryButtonText="Try Different Document"
      secondaryButtonText="Cancel"
      onPrimaryAction={props.onTryDifferent}
      onSecondaryAction={props.onCancel}
      variant="info"
    >
      <p>{props.filterMessage}</p>
    </Modal>
  );
};
