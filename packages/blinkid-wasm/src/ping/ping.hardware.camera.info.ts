/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import { PingBase } from "./PingBase";

/** Represents the data for the `ping.hardware.camera.info` event. */
export type HardwareCameraInfoData = {
  availableCameras: {
    cameraFacing: "Front" | "Back" | "Unknown";
    focus?: "Auto" | "Fixed";
    availableResolutions?: {
      width: number;
      height: number;
    }[];
  }[];
};

/** Represents the `ping.hardware.camera.info` event. */
export type PingHardwareCameraInfo = PingBase<
  HardwareCameraInfoData,
  "ping.hardware.camera.info",
  "1.0.1",
  0
>;
