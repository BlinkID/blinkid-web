/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import { beforeEach, describe, expect, test, vi } from "vitest";
import { createInputDeviceInfo } from "../media-mock/createInputDeviceInfo";
import { Camera, VideoResolutionName, videoResolutions } from "./Camera";

// Mock getUserMedia
const mockGetUserMedia = vi.fn();

// Create a proper mock MediaStream with video tracks
function createMockMediaStream(): MediaStream {
  const mockVideoTrack: MediaStreamTrack = {
    getCapabilities: vi.fn().mockReturnValue({
      facingMode: ["environment"],
      width: { min: 320, max: 1920 },
      height: { min: 240, max: 1080 },
    }),
    getSettings: vi.fn().mockReturnValue({
      width: 1920,
      height: 1080,
      facingMode: "environment",
    }),
    onended: null,
  } as Partial<MediaStreamTrack> as MediaStreamTrack;

  const mockStream: MediaStream = {
    getVideoTracks: vi.fn().mockReturnValue([mockVideoTrack]),
  } as Partial<MediaStream> as MediaStream;

  return mockStream;
}

// Mock navigator.mediaDevices
Object.defineProperty(globalThis, "navigator", {
  value: {
    mediaDevices: {
      getUserMedia: mockGetUserMedia,
    },
  },
  writable: true,
});

describe("Camera facingMode label detection", () => {
  test("Front label is applied correctly", () => {
    const camera = new Camera(
      createInputDeviceInfo({
        mockCapabilities: {
          facingMode: ["user"],
        },
        label: "Camera 2, 0 front",
      }),
    );
    expect(camera.facingMode).toBe("front");
  });

  test("Back label is applied correctly", () => {
    const camera = new Camera(
      createInputDeviceInfo({
        label: "Camera 1, 0 back",
        mockCapabilities: {
          facingMode: ["environment"],
        },
      }),
    );
    expect(camera.facingMode).toBe("back");
  });
});

describe("Camera resolution fallback", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("should start stream with requested resolution successfully", async () => {
    const mockStream = createMockMediaStream();
    mockGetUserMedia.mockResolvedValue(mockStream);

    const camera = new Camera(
      createInputDeviceInfo({
        label: "Test Camera",
        mockCapabilities: {
          facingMode: ["environment"],
        },
      }),
    );

    const stream = await camera.startStream("1080p");
    expect(stream).toBe(mockStream);
    expect(mockGetUserMedia).toHaveBeenCalled();
  });

  test("should fallback from 4k to 1080p when 4k fails", async () => {
    let callCount = 0;
    mockGetUserMedia.mockImplementation(() => {
      callCount++;
      if (callCount === 1) {
        // First call (4k) should fail
        return Promise.reject(new Error("4K not supported"));
      }
      // Second call (1080p) should succeed
      return Promise.resolve(createMockMediaStream());
    });

    const camera = new Camera(
      createInputDeviceInfo({
        label: "Test Camera",
        mockCapabilities: {
          facingMode: ["environment"],
        },
      }),
    );

    const stream = await camera.startStream("4k");

    expect(mockGetUserMedia).toHaveBeenCalledTimes(2);
    expect(stream).toBeInstanceOf(Object);

    // Verify first call was with 4k constraints
    const firstCall = mockGetUserMedia.mock.calls[0][0];
    expect(firstCall.video.width.ideal).toBe(videoResolutions["4k"].width);
    expect(firstCall.video.height.ideal).toBe(videoResolutions["4k"].height);

    // Verify second call was with 1080p constraints
    const secondCall = mockGetUserMedia.mock.calls[1][0];
    expect(secondCall.video.width.ideal).toBe(videoResolutions["1080p"].width);
    expect(secondCall.video.height.ideal).toBe(
      videoResolutions["1080p"].height,
    );
  });

  test("should fallback from 1080p to 720p when 1080p fails", async () => {
    let callCount = 0;
    mockGetUserMedia.mockImplementation(() => {
      callCount++;
      if (callCount === 1) {
        // First call (1080p) should fail
        return Promise.reject(new Error("1080p not supported"));
      }
      // Second call (720p) should succeed
      return Promise.resolve(createMockMediaStream());
    });

    const camera = new Camera(
      createInputDeviceInfo({
        label: "Test Camera",
        mockCapabilities: {
          facingMode: ["environment"],
        },
      }),
    );

    const stream = await camera.startStream("1080p");

    expect(mockGetUserMedia).toHaveBeenCalledTimes(2);
    expect(stream).toBeInstanceOf(Object);

    // Verify first call was with 1080p constraints
    const firstCall = mockGetUserMedia.mock.calls[0][0];
    expect(firstCall.video.width.ideal).toBe(videoResolutions["1080p"].width);
    expect(firstCall.video.height.ideal).toBe(videoResolutions["1080p"].height);

    // Verify second call was with 720p constraints
    const secondCall = mockGetUserMedia.mock.calls[1][0];
    expect(secondCall.video.width.ideal).toBe(videoResolutions["720p"].width);
    expect(secondCall.video.height.ideal).toBe(videoResolutions["720p"].height);
  });

  test("should fail when even 720p is not supported", async () => {
    mockGetUserMedia.mockRejectedValue(new Error("No resolution supported"));

    const camera = new Camera(
      createInputDeviceInfo({
        label: "Test Camera",
        mockCapabilities: {
          facingMode: ["environment"],
        },
      }),
    );

    await expect(camera.startStream("720p")).rejects.toThrow(
      "Failed to get camera stream",
    );
  });

  test("should use maxSupportedResolution when available", async () => {
    const mockStream = createMockMediaStream();
    mockGetUserMedia.mockResolvedValue(mockStream);

    const camera = new Camera(
      createInputDeviceInfo({
        label: "Test Camera",
        mockCapabilities: {
          facingMode: ["environment"],
        },
      }),
    );

    // Simulate that camera has determined its max supported resolution
    camera.store.setState({ maxSupportedResolution: "720p" });

    const stream = await camera.startStream("4k");

    expect(stream).toBe(mockStream);
    // Should use 720p instead of 4k due to maxSupportedResolution
    const callArgs = mockGetUserMedia.mock.calls[0][0];
    expect(callArgs.video.width.ideal).toBe(videoResolutions["720p"].width);
    expect(callArgs.video.height.ideal).toBe(videoResolutions["720p"].height);
  });

  test("should return existing active stream without creating new one", async () => {
    const mockStream = createMockMediaStream();
    mockGetUserMedia.mockResolvedValue(mockStream);

    const camera = new Camera(
      createInputDeviceInfo({
        label: "Test Camera",
        mockCapabilities: {
          facingMode: ["environment"],
        },
      }),
    );

    // First call should create stream
    const stream1 = await camera.startStream("1080p");
    expect(mockGetUserMedia).toHaveBeenCalledTimes(1);

    // Second call should return existing stream
    const stream2 = await camera.startStream("1080p");
    expect(mockGetUserMedia).toHaveBeenCalledTimes(1); // Still only called once
    expect(stream1).toBe(stream2);
  });

  test("should handle video resolution names correctly", () => {
    const resolutionNames: VideoResolutionName[] = Object.keys(
      videoResolutions,
    ) as VideoResolutionName[];
    expect(resolutionNames).toEqual(["720p", "1080p", "4k"]);

    // Test that each resolution has correct dimensions
    expect(videoResolutions["720p"]).toEqual({ width: 1280, height: 720 });
    expect(videoResolutions["1080p"]).toEqual({ width: 1920, height: 1080 });
    expect(videoResolutions["4k"]).toEqual({ width: 3840, height: 2160 });
  });
});
