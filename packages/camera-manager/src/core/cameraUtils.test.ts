/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import { describe, expect, test } from "vitest";
import { Camera, FacingMode, VideoResolutionName } from "./Camera";
import {
  createConstraints,
  scoreCameraCapabilities,
  filterCamerasByFacing,
  findIdealCamera,
} from "./cameraUtils";

/**
 * A mock camera class for testing.
 */
class MockCamera extends Camera {
  private _stream: MediaStream | null = null;

  constructor(
    name: string,
    options: {
      facingMode?: FacingMode;
      torchSupported?: boolean;
      singleShotSupported?: boolean;
      startStreamFn?: (resolution: VideoResolutionName) => Promise<MediaStream>;
    } = {},
  ) {
    const mockDeviceInfo = {
      deviceId: "mock-device-id",
      groupId: "mock-group-id",
      kind: "videoinput",
      label: name,
      getCapabilities: () => ({
        facingMode: options.facingMode ? [options.facingMode] : [],
        width: { min: 640, max: 3840 },
        height: { min: 480, max: 2160 },
        aspectRatio: { min: 1.333333, max: 1.777778 },
        frameRate: { min: 0, max: 30 },
      }),
      toJSON: () => ({}),
    } as InputDeviceInfo;

    super(mockDeviceInfo);

    // Override properties
    if (options.facingMode !== undefined) {
      this.store.setState({ facingMode: options.facingMode });
    }
    if (options.torchSupported !== undefined) {
      this.store.setState({ torchSupported: options.torchSupported });
    }
    if (options.singleShotSupported !== undefined) {
      this.store.setState({ singleShotSupported: options.singleShotSupported });
    }

    // Override startStream if provided
    if (options.startStreamFn) {
      this._startStreamFn = options.startStreamFn;
    }
  }

  private readonly _startStreamFn?: (
    resolution: VideoResolutionName,
  ) => Promise<MediaStream>;

  override async startStream(
    resolution: VideoResolutionName,
  ): Promise<MediaStream> {
    if (this._startStreamFn) {
      this._stream = await this._startStreamFn(resolution);
      return this._stream;
    }
    // Return a mock MediaStream
    this._stream = new MediaStream();
    return this._stream;
  }

  override stopStream(): void {
    if (this._stream) {
      this._stream.getTracks().forEach((track) => track.stop());
      this._stream = null;
    }
  }

  get stream(): MediaStream | null {
    return this._stream;
  }
}

describe("createConstraints", () => {
  test("creates constraints with deviceId when provided", () => {
    const constraints = createConstraints("1080p", "back", "test-device-id");
    expect(constraints.video).toMatchObject({
      deviceId: { exact: "test-device-id" },
      frameRate: 30,
    });
  });

  test("creates constraints without deviceId when not provided", () => {
    const constraints = createConstraints("1080p", "back");
    expect(constraints.video).toMatchObject({
      deviceId: undefined,
      frameRate: 30,
    });
  });

  test.each([
    ["720p", 1280, 720],
    ["1080p", 1920, 1080],
    ["4k", 3840, 2160],
  ])(
    "sets correct resolution constraints for %s",
    (resolution, width, height) => {
      const constraints = createConstraints(resolution as VideoResolutionName);
      expect(constraints.video).toMatchObject({
        width: { ideal: width },
        height: { ideal: height },
        aspectRatio: { exact: width / height },
      });
    },
  );

  test("sets facing mode when provided", () => {
    const constraints = createConstraints("1080p", "front");
    expect(constraints.video).toMatchObject({
      facingMode: "front",
    });
  });

  test("audio is always disabled", () => {
    const constraints = createConstraints("1080p");
    expect(constraints.audio).toBe(false);
  });
});

describe("scoreCameraCapabilities", () => {
  test("scores camera with no capabilities as 0", () => {
    const camera = new MockCamera("Basic Camera");
    expect(scoreCameraCapabilities(camera)).toBe(0);
  });

  test("scores camera with torch support as 1", () => {
    const camera = new MockCamera("Torch Camera", {
      torchSupported: true,
    });
    expect(scoreCameraCapabilities(camera)).toBe(1);
  });

  test("scores camera with single shot support as 1", () => {
    const camera = new MockCamera("Single Shot Camera", {
      singleShotSupported: true,
    });
    expect(scoreCameraCapabilities(camera)).toBe(1);
  });

  test("scores camera with both capabilities as 2", () => {
    const camera = new MockCamera("Advanced Camera", {
      torchSupported: true,
      singleShotSupported: true,
    });
    expect(scoreCameraCapabilities(camera)).toBe(2);
  });
});

describe("filterCamerasByFacing", () => {
  test("filters back cameras correctly", () => {
    const cameras = [
      new MockCamera("Back Camera", { facingMode: "back" }),
      new MockCamera("Front Camera", { facingMode: "front" }),
      new MockCamera("back 0", { facingMode: "back" }),
      new MockCamera("front 1", { facingMode: "front" }),
    ];
    const filtered = filterCamerasByFacing(cameras, "back");
    expect(filtered).toHaveLength(2);
    expect(filtered.map((c) => c.name)).toEqual(["Back Camera", "back 0"]);
  });

  test("filters front cameras correctly", () => {
    const cameras = [
      new MockCamera("Back Camera", { facingMode: "back" }),
      new MockCamera("Front Camera", { facingMode: "front" }),
      new MockCamera("back 0", { facingMode: "back" }),
      new MockCamera("front 1", { facingMode: "front" }),
    ];
    const filtered = filterCamerasByFacing(cameras, "front");
    expect(filtered).toHaveLength(2);
    expect(filtered.map((c) => c.name)).toEqual(["Front Camera", "front 1"]);
  });

  test("returns all cameras when no facing mode is requested", () => {
    const cameras = [
      new MockCamera("Back Camera", { facingMode: "back" }),
      new MockCamera("Front Camera", { facingMode: "front" }),
      new MockCamera("back 0", { facingMode: "back" }),
      new MockCamera("front 1", { facingMode: "front" }),
    ];
    const filtered = filterCamerasByFacing(cameras, undefined);
    expect(filtered).toHaveLength(4);
  });

  test("returns empty array when no matching cameras", () => {
    const cameras = [
      new MockCamera("Unknown Camera 1"),
      new MockCamera("Unknown Camera 2"),
    ];
    const filtered = filterCamerasByFacing(cameras, "back");
    expect(filtered).toHaveLength(0);
  });
});

describe("findIdealCamera", () => {
  test("throws error when no cameras available", async () => {
    await expect(findIdealCamera([], "1080p", "back")).rejects.toThrow(
      "No cameras found",
    );
  });

  test("returns single camera when only one available", async () => {
    const camera = new MockCamera("Test Camera");
    const result = await findIdealCamera([camera], "1080p", "front");
    expect(result).toBe(camera);
  });

  test("returns single camera regardless of requested facing when it's the only one", async () => {
    const camera = new MockCamera("Test Camera", { facingMode: "back" });
    let result = await findIdealCamera([camera], "1080p", "front");
    expect(result).toBe(camera);

    result = await findIdealCamera([camera], "1080p", "back");
    expect(result).toBe(camera);
  });

  test("prefers dual wide camera for back facing", async () => {
    const cameras = [
      new MockCamera("Back Camera", { facingMode: "back" }),
      new MockCamera("Back Dual Wide Camera", { facingMode: "back" }),
      new MockCamera("Back Ultra Wide Camera", { facingMode: "back" }),
    ];

    const result = await findIdealCamera(cameras, "4k", "back");
    expect(result.name).toBe("Back Dual Wide Camera");
  });

  test("selects last camera when front facing requested", async () => {
    const cameras = [
      new MockCamera("Front Camera 1", { facingMode: "front" }),
      new MockCamera("Front Camera 2", {
        facingMode: "front",
        torchSupported: true,
      }),
      new MockCamera("Front Camera 3", { facingMode: "front" }),
    ];

    const result = await findIdealCamera(cameras, "4k", "front");
    expect(result).toBe(cameras[2]);
  });

  test("prioritizes cameras with better capabilities when facing mode matches", async () => {
    const cameras = [
      new MockCamera("Basic Back Camera", { facingMode: "back" }),
      new MockCamera("Advanced Back Camera", {
        facingMode: "back",
        torchSupported: true,
        singleShotSupported: true,
      }),
      new MockCamera("Mid-tier Back Camera", {
        facingMode: "back",
        torchSupported: true,
      }),
    ];

    const result = await findIdealCamera(cameras, "4k", "back");
    expect(result.name).toBe("Advanced Back Camera");
  });

  test("falls back to all cameras when no matching facing mode found", async () => {
    const cameras = [
      new MockCamera("Unknown Camera 1", { torchSupported: true }),
      new MockCamera("Unknown Camera 2", { singleShotSupported: true }),
      new MockCamera("Unknown Camera 3", {
        torchSupported: true,
        singleShotSupported: true,
      }),
    ];

    const result = await findIdealCamera(cameras, "4k", "back");
    expect(result.name).toBe("Unknown Camera 3");
  });

  // TODO: shouldn't be a capability of `findIdealCamera`
  test.fails("falls back to last known working camera", async () => {
    let camera1Attempts = 0;
    let camera2Attempts = 0;

    const cameras = [
      new MockCamera("Camera 1", {
        facingMode: "back",
        startStreamFn: async () => {
          camera1Attempts++;
          if (camera1Attempts === 1) {
            await Promise.reject(new Error("First attempt failed"));
          }
          return await Promise.resolve(new MediaStream());
        },
      }),
      new MockCamera("Camera 2", {
        facingMode: "back",
        startStreamFn: async () => {
          camera2Attempts++;
          await Promise.reject(new Error("Always fails"));
          return new MediaStream();
        },
      }),
    ];

    const result = await findIdealCamera(cameras, "1080p", undefined);
    expect(result.name).toBe("Camera 1");
    expect(camera1Attempts).toBe(2);
    expect(camera2Attempts).toBe(1);
  });

  test("handles mixed facing modes and capabilities", async () => {
    const cameras = [
      new MockCamera("Front Camera", {
        facingMode: "front",
        singleShotSupported: true,
      }),
      new MockCamera("Back Camera Basic", { facingMode: "back" }),
      new MockCamera("Unknown Camera", {
        torchSupported: true,
        singleShotSupported: true,
      }),
      new MockCamera("Back Camera Advanced", {
        facingMode: "back",
        torchSupported: true,
        singleShotSupported: true,
      }),
    ];

    // Should pick the advanced back camera when requesting back facing
    let result = await findIdealCamera(cameras, "1080p", "back");
    expect(result.name).toBe("Back Camera Advanced");

    // Should pick the front camera when requesting front facing
    result = await findIdealCamera(cameras, "1080p", "front");
    expect(result.name).toBe("Front Camera");
  });
});
