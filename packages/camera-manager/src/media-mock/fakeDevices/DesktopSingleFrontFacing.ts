/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import { FakeDevice } from "../fake-devices";

export const desktopSingleFrontFacing: FakeDevice = {
  name: "Desktop Single Front Facing",
  cameras: [
    {
      inputDeviceInfo: {
        deviceId: "desktop-webcam-1",
        label: "Built-in FaceTime HD Camera",
        groupId: "desktop-webcam-1",
        kind: "videoinput",
      },
      deviceCapabilities: {
        facingMode: ["user"],
        width: { min: 640, max: 1920 },
        height: { min: 480, max: 1080 },
        aspectRatio: { min: 1.333333, max: 1.777778 },
        frameRate: { min: 0, max: 30 },
      },
      streamCapabilities: {
        facingMode: ["user"],
        width: { min: 640, max: 1920 },
        height: { min: 480, max: 1080 },
        aspectRatio: { min: 1.333333, max: 1.777778 },
        frameRate: { min: 0, max: 30 },
      },
      mediaTrackSettings: {
        deviceId: "desktop-webcam-1",
        groupId: "desktop-webcam-1",
        width: 1920,
        height: 1080,
        aspectRatio: 1.777778,
        frameRate: 30,
        facingMode: "user",
      },
    },
  ],
};
