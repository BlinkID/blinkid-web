/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import { HardwareCameraInfoData } from "@microblink/blinkid-core";
import {
  Camera,
  ExtractionArea,
  FacingMode,
  Resolution,
} from "@microblink/camera-manager";
import { PingSdkCameraInputInfoImpl } from "../shared/ping-implementations";

export type CameraInputInfoProps = {
  selectedCamera: Camera;
  videoResolution: Resolution;
  extractionArea: ExtractionArea | undefined;
};

export const createCameraInputInfo = ({
  extractionArea,
  selectedCamera,
  videoResolution,
}: CameraInputInfoProps): PingSdkCameraInputInfoImpl => {
  const roiW = extractionArea?.width
    ? extractionArea.width
    : videoResolution.width;
  const roiH = extractionArea?.height
    ? extractionArea.height
    : videoResolution.height;

  return new PingSdkCameraInputInfoImpl({
    deviceId: selectedCamera.name,
    cameraFacing: mapCameraFacingToPingFacing(selectedCamera.facingMode),
    cameraFrameWidth: videoResolution.width,
    cameraFrameHeight: videoResolution.height,
    roiWidth: roiW,
    roiHeight: roiH,
    viewPortAspectRatio: roiW / roiH,
  });
};

export type PingCamera = HardwareCameraInfoData["availableCameras"][number];

export const mapCameraFacingToPingFacing = (
  facing: FacingMode,
): PingCamera["cameraFacing"] => {
  switch (facing) {
    case "front":
      return "Front";
    case "back":
      return "Back";
    default:
      return "Unknown";
  }
};

export const convertCameraToPingCamera = (camera: Camera): PingCamera => {
  return {
    deviceId: camera.name,
    cameraFacing: mapCameraFacingToPingFacing(camera.facingMode),
    /** we can't know this */
    availableResolutions: undefined,
    focus: camera.singleShotSupported ? "Auto" : "Fixed",
  };
};
