/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

/* @refresh reload */

import {
  CameraManager,
  createCameraManagerUi,
} from "@microblink/camera-manager";
import { Component, Show } from "solid-js";
import { FPS } from "yy-fps";

/**
 * This example shows how to use the CameraManager to capture frames from the camera
 * and display them on a canvas.
 */
const PROCESS_FRAMES = true;
const PORTAL = true;

export const App: Component = () => {
  const cameraManager = new CameraManager();

  let fps: FPS | null = null;

  let canvas!: HTMLCanvasElement;

  const initialize = async () => {
    const cameraUi = await createCameraManagerUi(
      cameraManager,
      !PORTAL ? document.getElementById("root")! : undefined,
    );

    await cameraManager.startCameraStream();

    if (PROCESS_FRAMES) {
      fps = new FPS({
        FPS: 30,
      });

      const ctx = canvas.getContext("2d")!;

      const countFps = () => fps!.frame();
      const removeFrameCaptureCallback = cameraManager.addFrameCaptureCallback(
        (imageData) => {
          countFps();
          canvas.width = imageData.width;
          canvas.height = imageData.height;
          ctx.putImageData(imageData, 0, 0);
        },
      );

      cameraUi.addOnDismountCallback(() => {
        console.log("🧹 Cleaning up");
        fps?.remove();
        removeFrameCaptureCallback();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      });

      await cameraManager.startFrameCapture();
    }
  };

  return (
    <div>
      <button onClick={() => void initialize()}>Scan</button>
      <Show when={PROCESS_FRAMES}>
        <canvas ref={canvas} class="camera-preview" />
      </Show>
    </div>
  );
};
