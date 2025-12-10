/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import { shouldUseLightweightBuild } from "./shouldUseLightweightBuild";
import * as deviceInfoModule from "./deviceInfo/deviceInfo";
import type { DeviceInfo } from "./deviceInfo/deviceInfo";

// Mock the getDeviceInfo function
vi.mock("./deviceInfo/deviceInfo", () => ({
  getDeviceInfo: vi.fn(),
}));

describe("shouldUseLightweightBuild", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return true for mobile device with less than 4GB memory", async () => {
    const mockDeviceInfo: Partial<DeviceInfo> = {
      memory: 2.0,
      derivedDeviceInfo: {
        formFactors: ["Mobile"],
        model: "Test Phone",
        platform: "Android",
        browser: { brand: "Chrome", version: "120.0" },
      },
    };

    vi.mocked(deviceInfoModule.getDeviceInfo).mockResolvedValue(
      mockDeviceInfo as DeviceInfo,
    );

    const result = await shouldUseLightweightBuild();
    expect(result).toBe(true);
  });

  it("should return false for mobile device with 4GB or more memory", async () => {
    const mockDeviceInfo: Partial<DeviceInfo> = {
      memory: 4.0,
      derivedDeviceInfo: {
        formFactors: ["Mobile"],
        model: "Test Phone",
        platform: "Android",
        browser: { brand: "Chrome", version: "120.0" },
      },
    };

    vi.mocked(deviceInfoModule.getDeviceInfo).mockResolvedValue(
      mockDeviceInfo as DeviceInfo,
    );

    const result = await shouldUseLightweightBuild();
    expect(result).toBe(false);
  });

  it("should return true for mobile device with 2GB memory", async () => {
    const mockDeviceInfo: Partial<DeviceInfo> = {
      memory: 2,
      derivedDeviceInfo: {
        formFactors: ["Mobile"],
        model: "Test Phone",
        platform: "Android",
        browser: { brand: "Chrome", version: "120.0" },
      },
    };

    vi.mocked(deviceInfoModule.getDeviceInfo).mockResolvedValue(
      mockDeviceInfo as DeviceInfo,
    );

    const result = await shouldUseLightweightBuild();
    expect(result).toBe(true);
  });

  it("should return true for tablet device with less than 4GB memory", async () => {
    const mockDeviceInfo: Partial<DeviceInfo> = {
      memory: 2.0,
      derivedDeviceInfo: {
        formFactors: ["Tablet"],
        model: "Test Tablet",
        platform: "Android",
        browser: { brand: "Chrome", version: "120.0" },
      },
    };

    vi.mocked(deviceInfoModule.getDeviceInfo).mockResolvedValue(
      mockDeviceInfo as DeviceInfo,
    );

    const result = await shouldUseLightweightBuild();
    expect(result).toBe(true);
  });

  it("should return undefined for mobile device without memory info", async () => {
    const mockDeviceInfo: Partial<DeviceInfo> = {
      memory: undefined,
      derivedDeviceInfo: {
        formFactors: ["Mobile"],
        model: "Test Phone",
        platform: "iOS",
        browser: { brand: "Safari", version: "17.0" },
      },
    };

    vi.mocked(deviceInfoModule.getDeviceInfo).mockResolvedValue(
      mockDeviceInfo as DeviceInfo,
    );

    const result = await shouldUseLightweightBuild();
    expect(result).toBeUndefined();
  });

  it("should return undefined for desktop device with memory info", async () => {
    const mockDeviceInfo: Partial<DeviceInfo> = {
      memory: 8.0,
      derivedDeviceInfo: {
        formFactors: ["Desktop"],
        model: "Mac",
        platform: "macOS",
        browser: { brand: "Chrome", version: "120.0" },
      },
    };

    vi.mocked(deviceInfoModule.getDeviceInfo).mockResolvedValue(
      mockDeviceInfo as DeviceInfo,
    );

    const result = await shouldUseLightweightBuild();
    expect(result).toBeUndefined();
  });

  it("should return undefined for desktop device without memory info", async () => {
    const mockDeviceInfo: Partial<DeviceInfo> = {
      memory: undefined,
      derivedDeviceInfo: {
        formFactors: ["Desktop"],
        model: "Mac",
        platform: "macOS",
        browser: { brand: "Safari", version: "17.0" },
      },
    };

    vi.mocked(deviceInfoModule.getDeviceInfo).mockResolvedValue(
      mockDeviceInfo as DeviceInfo,
    );

    const result = await shouldUseLightweightBuild();
    expect(result).toBeUndefined();
  });

  it("should handle device with multiple form factors including Mobile", async () => {
    const mockDeviceInfo: Partial<DeviceInfo> = {
      memory: 2.0,
      derivedDeviceInfo: {
        formFactors: ["Mobile", "Tablet"],
        model: "Test Device",
        platform: "Android",
        browser: { brand: "Chrome", version: "120.0" },
      },
    };

    vi.mocked(deviceInfoModule.getDeviceInfo).mockResolvedValue(
      mockDeviceInfo as DeviceInfo,
    );

    const result = await shouldUseLightweightBuild();
    expect(result).toBe(true);
  });

  it("should return true for very low memory mobile device (1GB)", async () => {
    const mockDeviceInfo: Partial<DeviceInfo> = {
      memory: 1,
      derivedDeviceInfo: {
        formFactors: ["Mobile"],
        model: "Budget Phone",
        platform: "Android",
        browser: { brand: "Chrome", version: "120.0" },
      },
    };

    vi.mocked(deviceInfoModule.getDeviceInfo).mockResolvedValue(
      mockDeviceInfo as DeviceInfo,
    );

    const result = await shouldUseLightweightBuild();
    expect(result).toBe(true);
  });

  it("should return false for high-end mobile device (8GB)", async () => {
    const mockDeviceInfo: Partial<DeviceInfo> = {
      memory: 8.0,
      derivedDeviceInfo: {
        formFactors: ["Mobile"],
        model: "Flagship Phone",
        platform: "Android",
        browser: { brand: "Chrome", version: "120.0" },
      },
    };

    vi.mocked(deviceInfoModule.getDeviceInfo).mockResolvedValue(
      mockDeviceInfo as DeviceInfo,
    );

    const result = await shouldUseLightweightBuild();
    expect(result).toBe(false);
  });
});
