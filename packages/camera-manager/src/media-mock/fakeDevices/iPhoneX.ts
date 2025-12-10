/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import { FakeDevice } from "../fake-devices";

export const MockiPhoneX: FakeDevice = {
  name: "iPhone X",
  cameras: [
    {
      inputDeviceInfo: {
        deviceId: "827A38BC29B5012BCB51D9A35AB0EF7729CC8897",
        kind: "videoinput",
        label: "Front Camera",
        groupId: "",
      },
      streamCapabilities: {
        aspectRatio: {
          max: 3088,
          min: 0.0004310344827586207,
        },
        deviceId: "827A38BC29B5012BCB51D9A35AB0EF7729CC8897",
        facingMode: ["user"],
        frameRate: {
          max: 60,
          min: 1,
        },
        height: {
          max: 2320,
          min: 1,
        },
        width: {
          max: 3088,
          min: 1,
        },
      },
      mediaTrackSettings: {
        deviceId: "827A38BC29B5012BCB51D9A35AB0EF7729CC8897",
        facingMode: "user",
        frameRate: 30,
        height: 1080,
        width: 1920,
      },
    },
    {
      inputDeviceInfo: {
        deviceId: "794B89EFC336509B5944B7B404E16E026850CAAD",
        kind: "videoinput",
        label: "Back Camera",
        groupId: "",
      },
      streamCapabilities: {
        aspectRatio: {
          max: 4032,
          min: 0.00033068783068783067,
        },
        deviceId: "794B89EFC336509B5944B7B404E16E026850CAAD",
        facingMode: ["environment"],
        frameRate: {
          max: 60,
          min: 1,
        },
        height: {
          max: 3024,
          min: 1,
        },
        width: {
          max: 4032,
          min: 1,
        },
      },
      mediaTrackSettings: {
        deviceId: "794B89EFC336509B5944B7B404E16E026850CAAD",
        facingMode: "environment",
        frameRate: 30,
        height: 1080,
        width: 1920,
      },
    },
    {
      inputDeviceInfo: {
        deviceId: "2DF80612385587FFDE6A6FDE1CD4EC5BD08A24CC",
        kind: "videoinput",
        label: "Back Telephoto Camera",
        groupId: "",
      },
      streamCapabilities: {
        aspectRatio: {
          max: 4032,
          min: 0.00033068783068783067,
        },
        deviceId: "2DF80612385587FFDE6A6FDE1CD4EC5BD08A24CC",
        facingMode: ["environment"],
        frameRate: {
          max: 60,
          min: 1,
        },
        height: {
          max: 3024,
          min: 1,
        },
        width: {
          max: 4032,
          min: 1,
        },
      },
      mediaTrackSettings: {
        deviceId: "2DF80612385587FFDE6A6FDE1CD4EC5BD08A24CC",
        facingMode: "environment",
        frameRate: 30,
        height: 1080,
        width: 1920,
      },
    },
  ],
};
