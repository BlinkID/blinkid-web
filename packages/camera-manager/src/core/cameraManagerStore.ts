/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import { subscribeWithSelector } from "zustand/middleware";
import { createStore as createZustandStore } from "zustand/vanilla";
import { Camera, FacingMode, Resolution } from "./Camera";
import { CameraError } from "./cameraError";
import { ExtractionArea } from "./VideoFrameProcessor";

/**
 * The playback state of the camera manager.
 */
export type PlaybackState = "idle" | "playback" | "capturing";

export type CameraPermission =
  | "prompt"
  | "granted"
  | "denied"
  | "blocked"
  | undefined;

/**
 * The camera manager store.
 */
export type CameraManagerStore = {
  /**
   * The video element that will display the camera stream.
   */
  videoElement?: HTMLVideoElement;

  /**
   * The resolution of the video on the `videoElement`
   */
  videoResolution?: Resolution;

  /**
   * Defines the area of the video which will be sent for processing.
   */
  extractionArea?: ExtractionArea;

  /**
   * The list of cameras that are available to the user.
   */
  cameras: Camera[];

  /**
   * Browser camera permission.
   */
  cameraPermission: CameraPermission;

  /**
   * The facing mode filter that will be used to filter the available cameras.
   * Can be a single facing mode or an array of facing modes.
   */
  facingFilter?: FacingMode[];

  /**
   * The currently selected camera.
   */
  selectedCamera?: Camera;

  /**
   * Capturing / playing / idle.
   */
  playbackState: PlaybackState;

  /**
   * Indicates if the camera is currently being swapped.
   */
  isSwappingCamera: boolean;

  /**
   * Indicates if camera list is currently being queried.
   */
  isQueryingCameras: boolean;

  /**
   * Indicates if the captured frames will be mirrored horizontally
   */
  mirrorX: boolean;

  /**
   * If the Camera manager has encountered an error, this will be set to the error.
   */
  errorState?: Error | CameraError;
};

/**
 * The initial state of the camera manager store.
 *
 * We can use optional properties to select what to reset.
 */
const initialState: CameraManagerStore = {
  cameras: [],
  facingFilter: undefined,
  videoElement: undefined,
  videoResolution: undefined,
  playbackState: "idle",
  extractionArea: undefined,
  selectedCamera: undefined,
  isSwappingCamera: false,
  isQueryingCameras: false,
  cameraPermission: undefined,
  mirrorX: false,
  errorState: undefined,
};

/**
 * ⚠️ DANGER AHEAD ⚠️
 *
 * The Zustand store. Use only if you know what you're doing.
 *
 * Never set the state as this will break the application logic. We do not have
 * two-way binding. Make sure you only observe the state.
 *
 * Prefer using subscriptions if you require observable state.
 *
 * @see https://github.com/pmndrs/zustand for more details.
 */
export const cameraManagerStore = createZustandStore<CameraManagerStore>()(
  // this is important! Otherwise solid-zustand will start mutating the initial state
  subscribeWithSelector(() => structuredClone(initialState)),
);

/**
 * Resets the store to its initial state.
 *
 * Stops all camera streams as a side effect.
 */
export const resetCameraManagerStore = () => {
  console.debug("Stopping all cameras and resetting the `cameraManagerStore`.");
  // Stop all cameras
  cameraManagerStore.getState().cameras.forEach((camera) => {
    camera.stopStream();
  });
  cameraManagerStore.setState(structuredClone(initialState));
};
