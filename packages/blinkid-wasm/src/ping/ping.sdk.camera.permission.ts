/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import { PingBase } from "./PingBase";

/** Represents the data for the `ping.sdk.camera.permission` event. */
export type SdkCameraPermissionData = {
  eventType:
    | "CameraPermissionCheck"
    | "CameraPermissionRequest"
    | "CameraPermissionUserResponse";
  cameraPermissionGranted?: boolean;
};

/** Represents the `ping.sdk.camera.permission` event. */
export type PingSdkCameraPermission = PingBase<
  SdkCameraPermissionData,
  "ping.sdk.camera.permission",
  "1.0.0"
>;
