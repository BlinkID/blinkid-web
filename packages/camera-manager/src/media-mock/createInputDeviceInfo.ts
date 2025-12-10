/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

/**
 * Options for creating a fake `InputDeviceInfo` info object.
 */
interface CreateInputDeviceProps extends Partial<InputDeviceInfo> {
  /**
   * The label of the device.
   */
  label: string;

  /**
   * The mock capabilities are used to simulate the capabilities of the device.
   * This is not available on Firefox.
   */
  mockCapabilities?: Partial<MediaTrackCapabilities>;
}

/**
 * Creates a fake `InputDeviceInfo` info object.
 *
 * @param props - The properties for the device.
 * @returns The fake `InputDeviceInfo` info object.
 */
export const createMockInputDeviceInfo = ({
  label,
  deviceId = crypto.randomUUID(),
  groupId = crypto.randomUUID(),
  kind = "videoinput",
  mockCapabilities = {
    width: { min: 1, max: 1280 },
    height: { min: 1, max: 720 },
  },
}: CreateInputDeviceProps): InputDeviceInfo => {
  const mockDeviceInfo: InputDeviceInfo = {
    label,
    deviceId,
    groupId,
    kind,
    toJSON() {
      return {
        deviceId: this.deviceId,
        kind: this.kind,
        label: this.label,
        groupId: this.groupId,
      };
    },
    getCapabilities: () => {
      // not supported as of Firefox 133 and iOS 16.4
      return mockCapabilities;
    },
  };

  return mockDeviceInfo;
};
