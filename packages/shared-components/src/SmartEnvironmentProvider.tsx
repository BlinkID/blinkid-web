/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import { EnvironmentProvider } from "@ark-ui/solid/environment";
import { Component, createSignal, JSX, onMount, Show } from "solid-js";

type RootNode = HTMLDocument | ShadowRoot;

export const SmartEnvironmentProvider: Component<{
  children: (rootNode: RootNode) => JSX.Element;
}> = (props) => {
  const [rootNode, setRootNode] = createSignal<RootNode>();
  const [ref, setRef] = createSignal<HTMLSpanElement>();

  onMount(() => {
    const spanRef = ref();

    if (!spanRef) {
      return;
    }

    setRootNode(spanRef.getRootNode() as RootNode);
  });

  return (
    <>
      <Show when={rootNode()} fallback={<span ref={setRef} />}>
        {(rootNode) => (
          <EnvironmentProvider value={() => rootNode()}>
            {props.children(rootNode())}
          </EnvironmentProvider>
        )}
      </Show>
    </>
  );
};
