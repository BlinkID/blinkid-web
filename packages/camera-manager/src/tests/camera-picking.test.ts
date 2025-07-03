/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import { expect, test, describe, beforeAll } from "vitest";
import { mediaMocker } from "../media-mock/MediaMocker";
import {
  createCameras,
  findIdealCamera,
  obtainVideoInputDevices,
} from "../core/cameraUtils";

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

describe("Camera picking", () => {
  describe("Camera picking on iPhone", () => {
    beforeAll(() => {
      mediaMocker.configure({ device: "iPhone 15" });
      mediaMocker.mock();

      return () => mediaMocker.unmock();
    });

    test("iPhone 15 selects Back Dual Wide Camera by default ", async () => {
      const cameraInstances = await getCameraInstances();

      expect((await findIdealCamera(cameraInstances)).name).toBe(
        DEVICE_NAMES.IPHONE_15.BACK,
      );

      mediaMocker.reverseCameraOrder();

      expect((await findIdealCamera(cameraInstances)).name).toBe(
        DEVICE_NAMES.IPHONE_15.BACK,
      );
    });

    test("iPhone 15 selects Back Dual Wide Camera when requesting back facing ", async () => {
      const cameraInstances = await getCameraInstances();

      expect(
        (await findIdealCamera(cameraInstances, "1080p", "back")).name,
      ).toBe(DEVICE_NAMES.IPHONE_15.BACK);

      mediaMocker.reverseCameraOrder();

      expect(
        (await findIdealCamera(cameraInstances, "1080p", "back")).name,
      ).toBe(DEVICE_NAMES.IPHONE_15.BACK);
    });

    test("iPhone 15 selects Front Camera when requesting front facing ", async () => {
      const cameraInstances = await getCameraInstances();

      expect(
        (await findIdealCamera(cameraInstances, "1080p", "front")).name,
      ).toBe(DEVICE_NAMES.IPHONE_15.FRONT);

      mediaMocker.reverseCameraOrder();

      expect(
        (await findIdealCamera(cameraInstances, "1080p", "front")).name,
      ).toBe(DEVICE_NAMES.IPHONE_15.FRONT);
    });
  });

  describe("Camera picking on Samsung S21FE", () => {
    beforeAll(() => {
      mediaMocker.configure({ device: "Samsung S21FE" });
      mediaMocker.mock();

      return () => mediaMocker.unmock();
    });

    test("Samsung S21FE selects camera2 0, facing back by default ", async () => {
      const cameraInstances = await getCameraInstances();

      expect((await findIdealCamera(cameraInstances)).name).toBe(
        DEVICE_NAMES.SAMSUNG_S21FE.BACK,
      );

      mediaMocker.reverseCameraOrder();

      expect((await findIdealCamera(cameraInstances)).name).toBe(
        DEVICE_NAMES.SAMSUNG_S21FE.BACK,
      );
    });

    test("Samsung S21FE selects camera2 0, facing back when requesting back facing ", async () => {
      const cameraInstances = await getCameraInstances();

      expect(
        (await findIdealCamera(cameraInstances, "1080p", "back")).name,
      ).toBe(DEVICE_NAMES.SAMSUNG_S21FE.BACK);

      mediaMocker.reverseCameraOrder();

      expect(
        (await findIdealCamera(cameraInstances, "1080p", "back")).name,
      ).toBe(DEVICE_NAMES.SAMSUNG_S21FE.BACK);
    });

    test("Samsung S21FE selects camera2 3, facing front when requesting front facing ", async () => {
      const cameraInstances = await getCameraInstances();

      expect(
        (await findIdealCamera(cameraInstances, "1080p", "front")).name,
      ).toBe(DEVICE_NAMES.SAMSUNG_S21FE.FRONT);

      mediaMocker.reverseCameraOrder();

      expect(
        (await findIdealCamera(cameraInstances, "1080p", "front")).name,
      ).toBe(DEVICE_NAMES.SAMSUNG_S21FE.FRONT);
    });
  });

  describe("Camera picking on iPhone SE", () => {
    beforeAll(() => {
      mediaMocker.configure({ device: "iPhone SE" });
      mediaMocker.mock();

      return () => mediaMocker.unmock();
    });

    test("iPhone SE selects Back Camera by default ", async () => {
      const cameraInstances = await getCameraInstances();

      expect((await findIdealCamera(cameraInstances)).name).toBe(
        DEVICE_NAMES.IPHONE_SE.BACK,
      );

      mediaMocker.reverseCameraOrder();

      expect((await findIdealCamera(cameraInstances)).name).toBe(
        DEVICE_NAMES.IPHONE_SE.BACK,
      );
    });

    test("iPhone SE selects Back Camera when requesting back facing ", async () => {
      const cameraInstances = await getCameraInstances();

      expect(
        (await findIdealCamera(cameraInstances, "1080p", "back")).name,
      ).toBe(DEVICE_NAMES.IPHONE_SE.BACK);

      mediaMocker.reverseCameraOrder();

      expect(
        (await findIdealCamera(cameraInstances, "1080p", "back")).name,
      ).toBe(DEVICE_NAMES.IPHONE_SE.BACK);
    });

    test("iPhone SE selects Front Camera when requesting front facing ", async () => {
      const cameraInstances = await getCameraInstances();

      expect(
        (await findIdealCamera(cameraInstances, "1080p", "front")).name,
      ).toBe(DEVICE_NAMES.IPHONE_SE.FRONT);

      mediaMocker.reverseCameraOrder();

      expect(
        (await findIdealCamera(cameraInstances, "1080p", "front")).name,
      ).toBe(DEVICE_NAMES.IPHONE_SE.FRONT);
    });
  });

  describe("Camera picking on desktop with single front facing camera", () => {
    beforeAll(() => {
      mediaMocker.configure({ device: "Desktop Single Front Facing" });
      mediaMocker.mock();

      return () => mediaMocker.unmock();
    });

    test("Desktop with single front facing camera returns the front camera when no facing mode is requested", async () => {
      const cameraInstances = await getCameraInstances();

      const selectedCamera = await findIdealCamera(cameraInstances);
      expect(selectedCamera.name).toBe(DEVICE_NAMES.DESKTOP.FRONT);
      expect(selectedCamera.facingMode).toBe("front");
    });

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
});
