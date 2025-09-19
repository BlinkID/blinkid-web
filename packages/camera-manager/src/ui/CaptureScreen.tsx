/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import { SmartEnvironmentProvider } from "@microblink/shared-components/SmartEnvironmentProvider";
import {
  Component,
  createEffect,
  createSignal,
  getOwner,
  onCleanup,
  onMount,
  Show,
} from "solid-js";

import { Dialog } from "@ark-ui/solid/dialog";

import { useCameraUiStore } from "./CameraUiStoreContext";
import { Header } from "./Header";

import { SolidShadowRoot } from "./SolidShadowRoot";

import normalize from "@csstools/normalize.css?inline";
import { Portal } from "solid-js/web";
import { MOUNT_POINT_ID } from "./createCameraManagerUi";
import { useLocalization } from "./LocalizationContext";
import rootStyles from "./styles/root-styles.scss?inline";
import variables from "./styles/variables.scss?inline";
import { cameraUiRefSignalStore } from "./zustandRefStore";

import { makeResizeObserver } from "@solid-primitives/resize-observer";
import { determineFitMode } from "./determineFitMode";
import { getVisibleVideoArea } from "./getVisibleVideoArea";
import { CameraErrorModal } from "./CameraErrorModal";

// TODO: Full screen background

/**
 * The capture screen shadow root host ID.
 */
export const CAPTURE_SCREEN_SHADOW_ROOT_HOST_ID = "capture-screen-host";

/**
 * The fit mode.
 */
export type FitMode = "contain" | "cover";

/**
 * The CaptureScreen component.
 */
export const CaptureScreen: Component = () => {
  const { cameraManager, mountTarget, showCameraErrorModal } =
    useCameraUiStore();

  const [videoRef, setVideoRef] = createSignal<HTMLVideoElement>();
  // Reference to the feedback layer, using signals because of 1 tick rendering
  // delay due to attaching shadow root
  const [feedbackRef, setFeedbackRef] = createSignal<HTMLDivElement>();
  const [overlayLayerRef, setOverlayLayerRef] = createSignal<HTMLDivElement>();

  /** We use only 1 shadow root. If not portalled, enable SolidShadowRoot */
  const isPortalled = () => mountTarget.parentNode === document.body;

  const [fitMode, setFitMode] = createSignal<FitMode>("contain");

  /**
   * Adjusts the video fit.
   */
  function adjustVideoFit() {
    const video = videoRef();

    if (!video) {
      return;
    }

    const Cw = video.clientWidth;
    const Ch = video.clientHeight;
    const Vw = video.videoWidth;
    const Vh = video.videoHeight;

    // If video dimensions are not available, do nothing.
    // This can happen during initialization or orientation changes.
    if (Vw === 0 || Vh === 0) {
      return;
    }

    const newFitMode = determineFitMode(Cw, Ch, Vw, Vh);

    setFitMode(newFitMode);

    // TODO: Should we move this to the camera manager?
    if (newFitMode === "cover") {
      const visibleArea = getVisibleVideoArea(Cw, Ch, Vw, Vh);
      cameraManager.setExtractionArea(visibleArea);
    } else {
      cameraManager.setExtractionArea({
        x: 0,
        y: 0,
        width: Vw,
        height: Vh,
      });
    }
  }

  // resize observer effect
  onMount(() => {
    const video = videoRef();

    if (!video) {
      return;
    }

    const { observe, unobserve } = makeResizeObserver(adjustVideoFit);

    observe(video);

    /**
     * Added additional listener to "resize" event on the video element because some iPhone devices
     * do not have updated video dimensions when the resize observer callback is called.
     */
    video.addEventListener("resize", adjustVideoFit);
    video.addEventListener("loadedmetadata", adjustVideoFit);

    onCleanup(() => {
      unobserve(video);
      video.removeEventListener("resize", adjustVideoFit);
      video.removeEventListener("loadedmetadata", adjustVideoFit);
    });
  });

  // owner effect
  onMount(() => {
    const owner = getOwner();

    if (!owner) {
      return;
    }

    cameraUiRefSignalStore.setState({
      owner,
    });
  });

  createEffect(() => {
    const $videoRef = videoRef();
    const $feedbackRef = feedbackRef();
    const $overlayLayerRef = overlayLayerRef();

    if (!$videoRef || !$feedbackRef || !$overlayLayerRef) {
      return;
    }

    cameraUiRefSignalStore.setState({
      feedbackLayer: $feedbackRef,
      overlayLayer: $overlayLayerRef,
    });

    cameraManager.initVideoElement($videoRef);
  });

  return (
    <SolidShadowRoot
      id={!isPortalled() ? CAPTURE_SCREEN_SHADOW_ROOT_HOST_ID : undefined}
      // We disable the shadow root if the component is portalled as it's
      // already provided by the portal
      disableShadowRoot={isPortalled()}
      style={
        isPortalled()
          ? {
              height: "100%",
            }
          : undefined
      }
    >
      <style>{variables}</style>
      <style>{normalize}</style>
      <style>{rootStyles}</style>
      <style
        id="camera-manager-style"
        ref={(ref) => {
          if (window.__mbCameraManagerCssCode) {
            ref.innerHTML = window.__mbCameraManagerCssCode;
          }
        }}
      />

      <div
        class="bg-dark-500 color-white size-full relative min-h-[300px]"
        part="capture-screen-part"
      >
        {/* Toolbar header */}
        <Header />

        {/* Video feed */}
        <video
          part="video-element-part"
          class="block absolute top-0 left-0 size-full"
          style={{
            "object-fit": fitMode(),
          }}
          ref={setVideoRef}
        />

        {/* Feedback node used for showing UI messages during scanning */}
        <div
          ref={setFeedbackRef}
          class="absolute top-0 left-0 w-full h-full z-1"
          id="feedback-layer"
        />

        {/* Overlay node used for displaying dialogs */}
        <div
          ref={setOverlayLayerRef}
          // overlay layer is above the feedback layer and Header
          // `data-scope` is a hack to only apply z-index if there is a modal present inside this div
          // TODO: see if there is a better way to handle this
          // do we need full-screen overlay? (positioner only)
          class="absolute top-0 left-0 w-full h-full has-[[data-scope]]:z-2"
          id="overlay-layer"
        />

        {/* Error modals need to be rendered after the overlayLayer ref is present */}
        <Show when={showCameraErrorModal}>
          <CameraErrorModal />
        </Show>
      </div>
    </SolidShadowRoot>
  );
};

/**
 * The CaptureScreenPortalled component.
 */
export const CaptureScreenPortalled: Component = () => {
  const { t } = useLocalization();

  // we need to close the modal before the camera manager is destroyed
  // so we use the addOnDismountCallback which are run before dismounting
  // the SolidJS Camera Manager component
  const [isOpen, setIsOpen] = createSignal(true);
  const { addOnDismountCallback } = useCameraUiStore();

  addOnDismountCallback(() => {
    setIsOpen(false);
  });

  return (
    <Portal
      useShadow={true}
      mount={document.getElementById(MOUNT_POINT_ID)!}
      // TODO: see if there is a better way to handle this
      ref={(ref) => {
        ref.id = CAPTURE_SCREEN_SHADOW_ROOT_HOST_ID;
        // TODO: this needs to be configurable by the user
        ref.style.zIndex = "1000";
        ref.style.position = "fixed";
        ref.id = "mb-camera-host";
        return ref;
      }}
    >
      <SmartEnvironmentProvider>
        {(rootNode) => (
          <Dialog.Root
            open={isOpen()}
            lazyMount
            unmountOnExit
            // hack to prevent focusing any items, but focusing on the shadow root
            initialFocusEl={() => {
              const dummyNode = document.createElement("div");
              dummyNode.tabIndex = -1;
              rootNode.appendChild(dummyNode);
              setTimeout(() => {
                dummyNode.remove();
              }, 0);
              return dummyNode;
            }}
          >
            <Dialog.Positioner>
              <Dialog.Content
                aria-labelledby="dialog-title"
                class="h-vh supports-[(height:100dvh)]:h-dvh top-0 left-0 w-full fixed"
              >
                <Dialog.Title class="sr-only" id="dialog-title">
                  {t.scan_document}
                </Dialog.Title>
                <CaptureScreen />
              </Dialog.Content>
            </Dialog.Positioner>
          </Dialog.Root>
        )}
      </SmartEnvironmentProvider>
    </Portal>
  );
};
