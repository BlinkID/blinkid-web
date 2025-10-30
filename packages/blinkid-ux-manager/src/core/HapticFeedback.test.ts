/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import { HapticFeedbackManager } from "./HapticFeedback";

describe("HapticFeedbackManager", () => {
  let hapticManager: HapticFeedbackManager;
  let mockVibrate: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    hapticManager = new HapticFeedbackManager();

    // Mock the navigator.vibrate API
    mockVibrate = vi.fn().mockReturnValue(true);
    Object.defineProperty(globalThis.navigator, "vibrate", {
      value: mockVibrate,
      writable: true,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.restoreAllMocks();
  });

  describe("isSupported", () => {
    test("should return true when vibrate API is available", () => {
      expect(hapticManager.isSupported()).toBe(true);
    });

    test("should return false when vibrate API is not available", () => {
      // Mock navigator without vibrate API
      Object.defineProperty(globalThis, "navigator", {
        value: {},
        writable: true,
      });
      expect(hapticManager.isSupported()).toBe(false);
    });
  });

  describe("enable/disable functionality", () => {
    test("should be enabled by default", () => {
      expect(hapticManager.isEnabled()).toBe(true);
    });

    test("should be able to disable haptic feedback", () => {
      hapticManager.setEnabled(false);
      expect(hapticManager.isEnabled()).toBe(false);
    });

    test("should not trigger feedback when disabled", () => {
      hapticManager.setEnabled(false);
      hapticManager.triggerFeedback("short");
      expect(mockVibrate).not.toHaveBeenCalled();
    });
  });

  describe("feedback triggering", () => {
    test("should trigger short feedback with correct duration", () => {
      hapticManager.triggerFeedback("short");
      expect(mockVibrate).toHaveBeenCalledWith([100]);
    });

    test("should trigger long feedback with correct duration", () => {
      hapticManager.triggerFeedback("long");
      expect(mockVibrate).toHaveBeenCalledWith([300]);
    });
  });

  describe("convenience methods", () => {
    test("should trigger short feedback via triggerShort method", () => {
      hapticManager.triggerShort();
      expect(mockVibrate).toHaveBeenCalledWith([100]);
    });

    test("should trigger long feedback via triggerLong method", () => {
      hapticManager.triggerLong();
      expect(mockVibrate).toHaveBeenCalledWith([300]);
    });
  });

  describe("stop functionality", () => {
    test("should call navigator.vibrate(0) to stop vibration", () => {
      hapticManager.stop();
      expect(mockVibrate).toHaveBeenCalledWith(0);
    });
  });

  describe("error handling", () => {
    test("should handle vibrate API errors gracefully", () => {
      mockVibrate.mockImplementation(() => {
        throw new Error("Vibration failed");
      });

      expect(() => {
        hapticManager.triggerFeedback("short");
      }).not.toThrow();
    });

    test("should not crash when vibrate API returns false", () => {
      mockVibrate.mockReturnValue(false);
      expect(() => {
        hapticManager.triggerFeedback("short");
      }).not.toThrow();
    });

    test("should not trigger when not supported", () => {
      Object.defineProperty(globalThis, "navigator", {
        value: {},
        writable: true,
      });

      hapticManager.triggerFeedback("short");
      expect(mockVibrate).not.toHaveBeenCalled();
    });
  });
});
