/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import { MockiPhone15 } from "./fakeDevices/iPhone15";
import { MockiPhoneSE } from "./fakeDevices/iPhoneSE";
import { MockSamsungS21FE } from "./fakeDevices/SamsungS21FE";
import { desktopSingleFrontFacing } from "./fakeDevices/DesktopSingleFrontFacing";
import { MockiPhoneX } from "./fakeDevices/iPhoneX";

// Not available in iOS Safari
type DeviceCapabilities = ReturnType<InputDeviceInfo["getCapabilities"]> | null;
type StreamCapabilities = ReturnType<MediaStreamTrack["getCapabilities"]>;
type MediaTrackSettings = ReturnType<MediaStreamTrack["getSettings"]>;

/**
 * `deviceCapabilities` and `streamCapabilities` seem to be the same on iOS Safari
 */
export type ExtendedCameraInfo = {
  inputDeviceInfo: Omit<InputDeviceInfo, "getCapabilities" | "toJSON">;
  deviceCapabilities?: DeviceCapabilities;
  streamCapabilities: StreamCapabilities;
  mediaTrackSettings: MediaTrackSettings;
};

/**
 * A fake device.
 */
export type FakeDevice = {
  name: string;
  cameras: ExtendedCameraInfo[];
};

/**
 * The fake devices.
 */
export const fakeDevices: Record<string, FakeDevice> = {
  "iPhone 15": MockiPhone15,
  "iPhone SE": MockiPhoneSE,
  "iPhone X": MockiPhoneX,
  "Samsung S21FE": MockSamsungS21FE,
  "Desktop Single Front Facing": desktopSingleFrontFacing,
} as const;
