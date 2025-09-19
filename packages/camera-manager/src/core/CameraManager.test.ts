/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import { beforeEach, describe, expect, test, vi } from "vitest";
import { VideoResolutionName } from "./Camera";
import { CameraManager, defaultCameraManagerOptions } from "./CameraManager";

// Mock VideoFrameProcessor
vi.mock("./VideoFrameProcessor", () => ({
  VideoFrameProcessor: vi.fn().mockImplementation(() => ({
    getImageData: vi.fn(),
    reattachArrayBuffer: vi.fn(),
    getCurrentImageData: vi.fn(),
  })),
  isBufferDetached: vi.fn().mockReturnValue(false),
}));

describe("CameraManager - Default Resolution", () => {
  let cameraManager: CameraManager;

  beforeEach(() => {
    vi.clearAllMocks();
    cameraManager = new CameraManager();
  });

  test("should have default resolution of 1080p", () => {
    expect(cameraManager.resolution).toBe("1080p");
  });

  test("should be able to set resolution", async () => {
    await cameraManager.setResolution("4k");
    expect(cameraManager.resolution).toBe("4k");

    await cameraManager.setResolution("720p");
    expect(cameraManager.resolution).toBe("720p");
  });

  test("should validate that default options include mirrorFrontCameras", () => {
    expect(defaultCameraManagerOptions.mirrorFrontCameras).toBe(true);
  });

  test("should create CameraManager with custom options", () => {
    const customManager = new CameraManager({ mirrorFrontCameras: false });
    expect(customManager.resolution).toBe("1080p"); // Default resolution should still apply
  });

  test("should maintain resolution property getter", () => {
    const manager = new CameraManager();
    expect(manager.resolution).toBe("1080p");

    // Resolution should be read-only from outside (only settable via setResolution method)
    expect(typeof manager.resolution).toBe("string");
  });
});

describe("CameraManager - Resolution Settings", () => {
  let cameraManager: CameraManager;

  beforeEach(() => {
    vi.clearAllMocks();
    cameraManager = new CameraManager();
  });

  test("should handle resolution changes for all valid values", async () => {
    const validResolutions: VideoResolutionName[] = ["720p", "1080p", "4k"];

    for (const resolution of validResolutions) {
      await cameraManager.setResolution(resolution);
      expect(cameraManager.resolution).toBe(resolution);
    }
  });

  test("should set resolution passed in constructor options", () => {
    const manager1 = new CameraManager({ preferredResolution: "720p" });
    const manager2 = new CameraManager({ preferredResolution: "1080p" });
    const manager3 = new CameraManager({ preferredResolution: "4k" });

    expect(manager1.resolution).toBe("720p");
    expect(manager2.resolution).toBe("1080p");
    expect(manager3.resolution).toBe("4k");
  });

  test("should start with 1080p as default even after construction", () => {
    const manager1 = new CameraManager();
    const manager2 = new CameraManager({});
    const manager3 = new CameraManager({ mirrorFrontCameras: false });

    expect(manager1.resolution).toBe("1080p");
    expect(manager2.resolution).toBe("1080p");
    expect(manager3.resolution).toBe("1080p");
  });

  test("should handle setResolution method existence and basic functionality", async () => {
    expect(typeof cameraManager.setResolution).toBe("function");

    // Should not throw when setting valid resolutions
    await expect(cameraManager.setResolution("720p")).resolves.not.toThrow();
    await expect(cameraManager.setResolution("1080p")).resolves.not.toThrow();
    await expect(cameraManager.setResolution("4k")).resolves.not.toThrow();
  });

  test("should preserve resolution state across multiple sets", async () => {
    // Initial state
    expect(cameraManager.resolution).toBe("1080p");

    // Change to 4k
    await cameraManager.setResolution("4k");
    expect(cameraManager.resolution).toBe("4k");

    // Change to 720p
    await cameraManager.setResolution("720p");
    expect(cameraManager.resolution).toBe("720p");

    // Change back to 1080p
    await cameraManager.setResolution("1080p");
    expect(cameraManager.resolution).toBe("1080p");
  });
});
