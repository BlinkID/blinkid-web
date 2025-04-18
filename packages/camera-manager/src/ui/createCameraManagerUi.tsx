/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import { render } from "solid-js/web";

import { SetStoreFunction } from "solid-js/store";
import { CameraManager } from "../core/CameraManager";
import { CameraUiStoreProvider } from "./CameraUiStoreContext";
import {
  CameraUiLocalizationStrings,
  LocalizationProvider,
} from "./LocalizationContext";
import { RootComponent } from "./RootComponent";
import { cameraUiRefStore } from "./zustandRefStore";

export const MOUNT_POINT_ID = "camera-manager-mount-point";

// this triggers extraction of CSS from the UnoCSS plugin
import { Owner } from "solid-js";
import "virtual:uno.css";

export type CameraManagerComponent = {
  cameraManager: CameraManager;
  /** Updates the localization strings */
  updateLocalization: SetStoreFunction<CameraUiLocalizationStrings>;
  /** Dismounts the component from the DOM and unloads the SDK */
  dismount: () => void;
  /** Sets a callback to be called when the component is unmounted.
   * Returns a cleanup function that removes the callback when called.
   */
  addOnDismountCallback: (fn: DismountCallback) => () => void;
  /**
   * The feedback layer node that can be used to append custom feedback elements
   */
  feedbackLayerNode: HTMLDivElement;
  /**
   * The overlay layer node that can be used to append custom overlay elements
   */
  overlayLayerNode: HTMLDivElement;

  /**
   * https://docs.solidjs.com/reference/reactive-utilities/get-owner
   */
  owner: Owner;
};

export type DismountCallback = () => void;

export type CameraManagerUiOptions = {
  localizationStrings?: Partial<CameraUiLocalizationStrings>;
  showMirrorCameraButton?: boolean;
};

/**
 * Creates a new Camera Manager UI component.
 */
export function createCameraManagerUi(
  cameraManager: CameraManager,
  target?: HTMLElement,
  {
    localizationStrings,
    showMirrorCameraButton = false,
  }: CameraManagerUiOptions = {},
) {
  let mountTarget: HTMLElement;
  const dismountCallbacks = new Set<DismountCallback>();

  // A reference to the `updateLocalization` function inside the `LocalizationProvider`
  let updateLocalizationRef!: SetStoreFunction<CameraUiLocalizationStrings>;

  // This function is called by the `LocalizationProvider` to lift the state update function up
  const setLocalizationRef = (
    setter: SetStoreFunction<CameraUiLocalizationStrings>,
  ) => {
    updateLocalizationRef = setter;
  };

  const cleanupCameraManager = () => {
    cameraManager.reset();
  };

  let dismountRef: () => void;

  // This function will unmount the component and remove the mount point from the DOM
  const dismountCameraManagerUi = () => {
    try {
      console.debug("🧱 Dismounting camera manager UI");
      for (const callback of dismountCallbacks) {
        callback();
      }
      dismountCallbacks.clear();

      cleanupCameraManager();

      // We need to delay the dismount to give time for cleanups to run
      // use 2 rAFs to ensure that all cleanup functions are run
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (dismountRef) {
            // Check if it exists
            dismountRef();
          }

          mountTarget.remove();

          cleanupCameraManager();
        });
      });
    } catch (e) {
      console.warn("Error while dismounting camera manager UI", e);
      // component is already unmounted
    }
  };

  /* We create a dummy element that will be the target of the `dismount()`
   * function if no target is provided. If we simply provide `document.body`,
   * `dismount()` will clear the entire document body:
   *
   * https://www.solidjs.com/docs/latest/api#render
   *
   * This is a DX optimization so that users don't need to provide their own
   * dummy mount points if they are using a portalled component anyway
   */

  const newMountTarget = document.createElement("div");
  newMountTarget.id = MOUNT_POINT_ID;
  mountTarget = newMountTarget;

  if (target) {
    target.appendChild(newMountTarget);
  } else {
    document.body.appendChild(newMountTarget);
  }

  /**
   * Adds a callback to be called when the component is unmounted.
   * Returns a cleanup function that removes the callback when called.
   *
   * @param fn - The callback function to be called when the component is unmounted
   * @returns A cleanup function that removes the callback when called
   */
  const addOnDismountCallback = (fn: DismountCallback) => {
    dismountCallbacks.add(fn);

    return () => {
      dismountCallbacks.delete(fn);
    };
  };

  dismountRef = render(
    () => (
      <LocalizationProvider
        userStrings={localizationStrings}
        setLocalizationRef={setLocalizationRef}
      >
        <CameraUiStoreProvider
          addOnDismountCallback={addOnDismountCallback}
          dismountCameraUi={dismountCameraManagerUi}
          cameraManager={cameraManager}
          showMirrorCameraButton={showMirrorCameraButton}
          mountTarget={mountTarget}
        >
          <RootComponent />
        </CameraUiStoreProvider>
      </LocalizationProvider>
    ),
    mountTarget,
  );

  // The exposed API for the component
  const exposedComponentApi: CameraManagerComponent = {
    updateLocalization: updateLocalizationRef,
    /**
     * Adds a callback to be called when the component is unmounted.
     * Returns a cleanup function that removes the callback when called.
     *
     * @param fn - The callback function to be called when the component is unmounted
     * @returns A cleanup function that removes the callback when called
     */
    addOnDismountCallback,
    cameraManager,
    // we know these are defined because `createCameraManagerUi` resolves when they are defined
    // TODO: maybe don't use getters but make sure they are defined
    get feedbackLayerNode() {
      return cameraUiRefStore.getState().feedbackLayer;
    },
    get overlayLayerNode() {
      return cameraUiRefStore.getState().overlayLayer;
    },
    get owner() {
      return cameraUiRefStore.getState().owner;
    },
    dismount: dismountCameraManagerUi,
  };

  // Resolves the promise when all references are ready, accounting for potential parent node change of shadow roots.
  return new Promise<CameraManagerComponent>((resolve) => {
    let videoExists = false;
    let feedbackExists = false;
    let overlayExists = false;

    // Initialize with no-op functions
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    let unsubscribeFeedbackLayer = () => {};
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    let unsubscribeOverlayLayer = () => {};
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    let unsubscribeVideo = () => {};

    const checkReady = () => {
      if (videoExists && feedbackExists && overlayExists) {
        unsubscribeFeedbackLayer();
        unsubscribeOverlayLayer();
        unsubscribeVideo();
        resolve(exposedComponentApi);
      }
    };

    // Assign the actual unsubscribe functions
    unsubscribeFeedbackLayer = cameraUiRefStore.subscribe(
      (x) => x.feedbackLayer,
      (feedbackLayer) => {
        if (feedbackLayer) {
          feedbackExists = true;
        }
        checkReady();
      },
      {
        fireImmediately: true,
      },
    );

    unsubscribeOverlayLayer = cameraUiRefStore.subscribe(
      (x) => x.overlayLayer,
      (overlayLayer) => {
        if (overlayLayer) {
          overlayExists = true;
        }
        checkReady();
      },
      {
        fireImmediately: true,
      },
    );

    unsubscribeVideo = cameraManager.subscribe(
      (state) => state.videoElement,
      (videoElement) => {
        if (videoElement) {
          videoExists = true;
          checkReady();
        }
      },
      {
        fireImmediately: true,
      },
    );
  });
}
