/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import { renderWithOwner } from "@microblink/shared-components/renderWithOwner";
import { getOwner, JSX, ParentComponent, Show, splitProps } from "solid-js";

/**
 * The SolidShadowRoot props.
 */
type SolidShadowRootProps = {
  /**
   * Disables shadow root, mostly useful for debugging.
   */
  disableShadowRoot?: boolean;
  /**
   * A ref to the div element.
   */
  getRef?: (el: HTMLDivElement) => void;
} & JSX.HTMLAttributes<HTMLDivElement>;

/**
 * The SolidShadowRoot component.
 */
export const SolidShadowRoot: ParentComponent<SolidShadowRootProps> = (
  props,
) => {
  // We use `getOwner` in case of async rendering, for instance, it was used to
  // test rendering after a timeout.
  const owner = getOwner();
  const [local, others] = splitProps(props, [
    "children",
    "disableShadowRoot",
    "getRef",
  ]);

  return (
    <div
      {...others}
      ref={(ref) => {
        if (local.disableShadowRoot) {
          return;
        }

        const shadowRoot = ref.attachShadow({ mode: "open" });

        renderWithOwner(() => <>{local.children}</>, shadowRoot, owner);
      }}
    >
      <Show when={local.disableShadowRoot}>{local.children}</Show>
    </div>
  );
};
