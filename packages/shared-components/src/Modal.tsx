/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import { Dialog } from "@ark-ui/solid/dialog";
import { JSX, ParentComponent, Show } from "solid-js";
import { Portal } from "solid-js/web";
import { SmartEnvironmentProvider } from "./SmartEnvironmentProvider";
import IconClose from "./assets/icons/icon-close.svg?component-solid";

import styles from "./styles.module.scss";

type ModalProps = {
  mountTarget: HTMLElement;
  headerImage?: JSX.Element;
  header?: string | JSX.Element;
  actions?: JSX.Element;
  showCloseButton?: boolean;
  onCloseClicked?: () => void;
  modalStyle?: "compact" | "default" | "large";
} & Dialog.RootProps;

export const Modal: ParentComponent<ModalProps> = (props) => {
  const getPaddingClass = () => {
    switch (props.modalStyle) {
      case "compact":
        return styles.compact;
      case "large":
        return styles.compact;
      case "default":
      default:
        return undefined;
    }
  };

  return (
    <SmartEnvironmentProvider>
      {(root) => (
        <Dialog.Root
          // prevent closing by clicking outside
          onFocusOutside={(e) => e.preventDefault()}
          onInteractOutside={(e) => e.preventDefault()}
          // prevent focusing on first interactable element
          initialFocusEl={() => {
            const dialog: HTMLElement = root.querySelector(
              '[role="dialog"]',
            ) as HTMLElement;
            return dialog;
          }}
          restoreFocus
          unmountOnExit
          lazyMount
          // TODO: report bug to Ark UI
          // https://github.com/chakra-ui/zag/blob/a3ea8a50672aac3f25e5644d4708b9d8286a4302/CHANGELOG.md?plain=1#L1030C56-L1030C67
          // breaks focus trap
          // role="alertdialog"
          {...props}
        >
          {/* Ark UI renders an empty portal even if it's not open, which is why
          we need to wrap it in a <Show>
          https://github.com/chakra-ui/ark/discussions/3252
          */}
          <Show when={props.open}>
            <Portal mount={props.mountTarget}>
              <Dialog.Positioner class={styles.dialogPositioner}>
                <Dialog.Backdrop class={styles.dialogBackdrop} />
                <Dialog.Content
                  class={`${styles.dialogContent} ${getPaddingClass()}`}
                >
                  {/* Close button */}
                  <Show when={props.showCloseButton}>
                    <Dialog.CloseTrigger
                      aria-label="Close"
                      class={styles.closeButton}
                      onClick={props.onCloseClicked}
                    >
                      <IconClose class={styles.closeButtonInner} />
                    </Dialog.CloseTrigger>
                  </Show>

                  {/* headerImage */}
                  <Show when={props.headerImage}>{props.headerImage}</Show>

                  {/* header */}
                  <Show when={props.header}>
                    {(header) => (
                      <Dialog.Title class={styles.dialogTitle}>
                        {header()}
                      </Dialog.Title>
                    )}
                  </Show>

                  {/* Main content */}
                  <Dialog.Description class={styles.contentOut}>
                    {props.children}
                  </Dialog.Description>

                  {/* Action buttons */}
                  <Show when={props.actions}>
                    <div>{props.actions}</div>
                  </Show>
                </Dialog.Content>
              </Dialog.Positioner>
            </Portal>
          </Show>
        </Dialog.Root>
      )}
    </SmartEnvironmentProvider>
  );
};

type AlertModalProps = {
  mountTarget: HTMLElement;
  header: string;
  text: string;
  open: boolean;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryClick: () => void;
  onSecondaryClick: () => void;
};

export const AlertModal: ParentComponent<AlertModalProps> = ({
  mountTarget,
  header,
  text,
  open,
  onPrimaryClick,
  onSecondaryClick,
  primaryButtonText = "Retry",
  secondaryButtonText = "Cancel",
}) => {
  return (
    <Modal
      mountTarget={mountTarget}
      header={<span class={styles.alertTitle}>{header}</span>}
      open={open}
      actions={
        <div class={styles.actions}>
          <button
            class={styles.secondaryActionButton}
            onClick={() => onSecondaryClick()}
          >
            {secondaryButtonText}
          </button>
          <button
            class={styles.primaryActionButton}
            onClick={() => onPrimaryClick()}
          >
            {primaryButtonText}
          </button>
        </div>
      }
      modalStyle="compact"
    >
      <p class={styles.alertText}>{text}</p>
    </Modal>
  );
};
