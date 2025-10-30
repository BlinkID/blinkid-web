/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import { PingBase } from "./PingBase";

/** Represents the data for the `ping.sdk.camera.input.info` event. */
export type SdkCameraInputInfoData = {
  cameraFacing: "Front" | "Back" | "Unknown";
  cameraFrameWidth: number;
  cameraFrameHeight: number;
  roiWidth: number;
  roiHeight: number;
  viewPortAspectRatio: number;
};

/** Represents the `ping.sdk.camera.input.info` event. */
export type PingSdkCameraInputInfo = PingBase<
  SdkCameraInputInfoData,
  "ping.sdk.camera.input.info",
  "1.0.1"
>;
