/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import { Owner } from "solid-js";
import { createWithSignal } from "solid-zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { createStore } from "zustand/vanilla";

/**
 * The camera UI refs.
 */
export type CameraUiRefs = {
  /** The feedback layer. */
  feedbackLayer: HTMLDivElement;
  /** The overlay layer. */
  overlayLayer: HTMLDivElement;
  /** The owner of the component. */
  owner: Owner;
};

/**
 * The initial state of the camera UI refs.
 */
const initialState: CameraUiRefs = {
  feedbackLayer: null!,
  overlayLayer: null!,
  owner: null!,
};

/**
 * The camera UI ref store.
 */
export const cameraUiRefStore = createStore<CameraUiRefs>()(
  // this is important! Otherwise, solid-zustand will start mutating the initial state
  subscribeWithSelector(() => structuredClone(initialState)),
);

/**
 * The camera UI ref signal store.
 */
export const cameraUiRefSignalStore = createWithSignal(cameraUiRefStore);
