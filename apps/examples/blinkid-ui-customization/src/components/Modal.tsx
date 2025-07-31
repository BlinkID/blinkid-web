/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import { Component, JSX, Show } from "solid-js";
import { Portal } from "solid-js/web";
import styles from "../styles/modals.module.css";

export interface ModalProps {
  /** Whether the modal is open */
  open: boolean;
  /** Modal title */
  title: string;
  /** Modal content/message */
  children: JSX.Element;
  /** Primary action button text */
  primaryButtonText: string;
  /** Secondary action button text */
  secondaryButtonText: string;
  /** Primary action handler */
  onPrimaryAction: () => void;
  /** Secondary action handler */
  onSecondaryAction: () => void;
  /** Header style variant */
  variant?: "error" | "warning" | "info" | "secondary";
}

/**
 * Base Modal component that provides consistent styling and behavior
 * for all error modals in the application.
 */
export const Modal: Component<ModalProps> = (props) => {
  const headerClass = () => {
    const baseClass = styles.header;
    const variantClass = props.variant ? styles[props.variant] : "";
    return `${baseClass} ${variantClass}`.trim();
  };

  return (
    <Show when={props.open}>
      <Portal>
        <div class={styles.overlay}>
          <div class={styles.content}>
            <h3 class={headerClass()}>{props.title}</h3>
            <div class={styles.text}>{props.children}</div>
            <div class="modal-footer">
              <button
                class="primary-button"
                onClick={(e) => {
                  e.preventDefault();
                  props.onPrimaryAction?.();
                }}
              >
                {props.primaryButtonText}
              </button>
              {props.onSecondaryAction && (
                <button
                  class="secondary-button"
                  onClick={(e) => {
                    e.preventDefault();
                    props.onSecondaryAction?.();
                  }}
                >
                  {props.secondaryButtonText}
                </button>
              )}
            </div>
          </div>
        </div>
      </Portal>
    </Show>
  );
};
