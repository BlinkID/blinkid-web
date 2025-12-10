/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import { beforeAll, describe, expect, test, vi } from "vitest";
import {
  createCameras,
  findIdealCamera,
  obtainVideoInputDevices,
} from "../core/cameraUtils";
import { mediaMocker } from "../media-mock/MediaMocker";

// Test constants for better maintainability
const DEVICE_NAMES = {
  IPHONE_15: {
    BACK: "Back Dual Wide Camera",
    FRONT: "Front Camera",
  },
  SAMSUNG_S21FE: {
    BACK: "camera2 0, facing back",
    FRONT: "camera2 3, facing front",
  },
  IPHONE_SE: {
    BACK: "Back Camera",
    FRONT: "Front Camera",
  },
  DESKTOP: {
    FRONT: "Built-in FaceTime HD Camera",
  },
} as const;

// Helper function to reduce boilerplate
async function getCameraInstances() {
  const cameraInfos = await obtainVideoInputDevices();
  return createCameras(cameraInfos);
}

describe("iPhones", () => {
  beforeAll(() => {
    const originalUA = navigator.userAgent;

    // It's important to mock the user agent as we sort cameras differently on iOS inside findIdealCamera()
    Object.defineProperty(window.navigator, "userAgent", {
      value:
        "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1",
      writable: true,
    });

    return () => {
      Object.defineProperty(window.navigator, "userAgent", {
        value: originalUA,
        writable: true,
      });
    };
  });
  describe("Camera picking on iPhone X", () => {
    beforeAll(() => {
      mediaMocker.configure({ device: "iPhone X" });
      mediaMocker.mock();

      return () => {
        mediaMocker.unmock();
      };
    });

    test("iPhone X selects Back Camera when provided back facing", async () => {
      let cameraInstances = await getCameraInstances();

      expect(
        (await findIdealCamera(cameraInstances, "1080p", "back")).name,
      ).toBe("Back Camera");

      mediaMocker.reverseCameraOrder();
      cameraInstances = await getCameraInstances();

      // This is expected
      expect(
        (await findIdealCamera(cameraInstances, "1080p", "back")).name,
      ).toBe("Back Telephoto Camera");
    });
  });

  describe("Camera picking on iPhone 15", () => {
    beforeAll(() => {
      mediaMocker.configure({ device: "iPhone 15" });
      mediaMocker.mock();

      return () => {
        mediaMocker.unmock();
      };
    });

    test("iPhone 15 selects Back Dual Wide Camera when requesting back facing ", async () => {
      let cameraInstances = await getCameraInstances();

      expect(
        (await findIdealCamera(cameraInstances, "1080p", "back")).name,
      ).toBe(DEVICE_NAMES.IPHONE_15.BACK);

      mediaMocker.reverseCameraOrder();
      cameraInstances = await getCameraInstances();

      expect(
        (await findIdealCamera(cameraInstances, "1080p", "back")).name,
      ).toBe(DEVICE_NAMES.IPHONE_15.BACK);
    });

    test("iPhone 15 selects Front Camera when requesting front facing ", async () => {
      let cameraInstances = await getCameraInstances();

      expect(
        (await findIdealCamera(cameraInstances, "1080p", "front")).name,
      ).toBe(DEVICE_NAMES.IPHONE_15.FRONT);

      mediaMocker.reverseCameraOrder();
      cameraInstances = await getCameraInstances();

      expect(
        (await findIdealCamera(cameraInstances, "1080p", "front")).name,
      ).toBe(DEVICE_NAMES.IPHONE_15.FRONT);
    });

    describe("Camera picking on iPhone SE", () => {
      beforeAll(() => {
        mediaMocker.configure({ device: "iPhone SE" });
        mediaMocker.mock();

        return () => mediaMocker.unmock();
      });

      test("iPhone SE selects Back Camera when requesting back facing ", async () => {
        let cameraInstances = await getCameraInstances();

        expect(
          (await findIdealCamera(cameraInstances, "1080p", "back")).name,
        ).toBe(DEVICE_NAMES.IPHONE_SE.BACK);

        mediaMocker.reverseCameraOrder();
        cameraInstances = await getCameraInstances();

        expect(
          (await findIdealCamera(cameraInstances, "1080p", "back")).name,
        ).toBe(DEVICE_NAMES.IPHONE_SE.BACK);
      });

      test("iPhone SE selects Front Camera when requesting front facing ", async () => {
        let cameraInstances = await getCameraInstances();

        expect(
          (await findIdealCamera(cameraInstances, "1080p", "front")).name,
        ).toBe(DEVICE_NAMES.IPHONE_SE.FRONT);

        mediaMocker.reverseCameraOrder();
        cameraInstances = await getCameraInstances();

        expect(
          (await findIdealCamera(cameraInstances, "1080p", "front")).name,
        ).toBe(DEVICE_NAMES.IPHONE_SE.FRONT);
      });
    });
  });
});

describe("Camera picking on Samsung S21FE", () => {
  beforeAll(() => {
    mediaMocker.configure({ device: "Samsung S21FE" });
    mediaMocker.mock();

    return () => mediaMocker.unmock();
  });

  test("Samsung S21FE selects camera2 0, facing back when requesting back facing ", async () => {
    let cameraInstances = await getCameraInstances();

    expect((await findIdealCamera(cameraInstances, "1080p", "back")).name).toBe(
      DEVICE_NAMES.SAMSUNG_S21FE.BACK,
    );

    mediaMocker.reverseCameraOrder();
    cameraInstances = await getCameraInstances();

    expect((await findIdealCamera(cameraInstances, "1080p", "back")).name).toBe(
      DEVICE_NAMES.SAMSUNG_S21FE.BACK,
    );
  });

  test("Samsung S21FE selects camera2 3, facing front when requesting front facing ", async () => {
    let cameraInstances = await getCameraInstances();

    // Ordering matters here
    expect(
      (await findIdealCamera(cameraInstances, "1080p", "front")).name,
    ).toBe("camera2 1, facing front");

    mediaMocker.reverseCameraOrder();
    cameraInstances = await getCameraInstances();

    expect(
      (await findIdealCamera(cameraInstances, "1080p", "front")).name,
    ).toBe(DEVICE_NAMES.SAMSUNG_S21FE.FRONT);
  });
});

describe("Camera picking on desktop with single front facing camera", () => {
  beforeAll(() => {
    mediaMocker.configure({ device: "Desktop Single Front Facing" });
    mediaMocker.mock();

    return () => mediaMocker.unmock();
  });

  // TODO: this should not be the desired behavior
  test("Desktop with single front facing camera returns the front camera even when back facing is requested", async () => {
    const cameraInstances = await getCameraInstances();

    const selectedCamera = await findIdealCamera(
      cameraInstances,
      "1080p",
      "back",
    );
    expect(selectedCamera.name).toBe(DEVICE_NAMES.DESKTOP.FRONT);
    expect(selectedCamera.facingMode).toBe("front");
  });

  test("Desktop with single front facing camera returns the front camera when front facing is requested", async () => {
    const cameraInstances = await getCameraInstances();

    const selectedCamera = await findIdealCamera(
      cameraInstances,
      "1080p",
      "front",
    );
    expect(selectedCamera.name).toBe(DEVICE_NAMES.DESKTOP.FRONT);
    expect(selectedCamera.facingMode).toBe("front");
  });
});
