/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import { describe, it, expect, vi, afterEach } from "vitest";
import { AppleDeviceModel, getAppleDeviceModel } from "./getAppleDeviceModel";

describe("getAppleDeviceModel", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  interface TestCase {
    description: string;
    userAgent: string;
    maxTouchPoints?: number;
    expected: AppleDeviceModel | undefined;
  }

  const testCases: TestCase[] = [
    {
      description: "modern iPad (masquerading as Mac)",
      userAgent:
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Safari/605.1.15",
      maxTouchPoints: 5,
      expected: "iPad",
    },
    {
      description: "older iPad via user agent",
      userAgent:
        "Mozilla/5.0 (iPad; CPU OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148",
      maxTouchPoints: 5,
      expected: "iPad",
    },
    {
      description: "iPhone",
      userAgent:
        "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1",
      maxTouchPoints: 1,
      expected: "iPhone",
    },
    {
      description: "iPhone with Chrome",
      userAgent:
        "Mozilla/5.0 (iPhone; CPU iPhone OS 18_5_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/141.0.7390.69 Mobile/15E148 Safari/604.1",
      maxTouchPoints: 1,
      expected: "iPhone",
    },
    {
      description: "Mac",
      userAgent:
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36",
      maxTouchPoints: 0,
      expected: "Mac",
    },
    {
      description: "Windows device",
      userAgent:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36",
      maxTouchPoints: 0,
      expected: undefined,
    },
    {
      description: "Android device",
      userAgent:
        "Mozilla/5.0 (Linux; Android 13; SM-A536U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Mobile Safari/537.36",
      maxTouchPoints: 1,
      expected: undefined,
    },
    {
      description: "generic Linux device",
      userAgent:
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36",
      maxTouchPoints: 0,
      expected: undefined,
    },
  ];

  it.each(testCases)(
    "$description",
    ({ userAgent, maxTouchPoints, expected }) => {
      vi.stubGlobal("navigator", {
        userAgent,
        maxTouchPoints,
      });

      const result = getAppleDeviceModel();
      expect(result).toBe(expected);
    },
  );
});
