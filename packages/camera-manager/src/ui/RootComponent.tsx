/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

/* @refresh reload */

import { Component } from "solid-js";
import { Dynamic } from "solid-js/web";
import { CaptureScreen, CaptureScreenPortalled } from "./CaptureScreen";

import { useCameraUiStore } from "./CameraUiStoreContext";

/**
 * The root component.
 */
const RootComponent: Component = () => {
  const { mountTarget } = useCameraUiStore();

  return (
    <>
      <Dynamic
        component={
          mountTarget.parentNode === document.body
            ? CaptureScreenPortalled
            : CaptureScreen
        }
      />
    </>
  );
};

export { RootComponent };
