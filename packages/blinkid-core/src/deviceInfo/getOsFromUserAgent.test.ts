/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import { afterEach, describe, expect, it, vi } from "vitest";
import { getOsFromUserAgent, OperatingSystem } from "./getOsFromUserAgent";

describe("detectOSAndVersion", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  interface TestCase {
    description: string;
    userAgent: string;
    maxTouchPoints?: number;
    expected: {
      os: OperatingSystem;
      version: string;
    };
  }

  const testCases: TestCase[] = [
    {
      description: "should detect iPadOS",
      userAgent:
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Safari/605.1.15",
      maxTouchPoints: 5,
      expected: { os: "iPadOS", version: "10.15.7" },
    },
    {
      description: "should detect iOS",
      userAgent:
        "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1",
      maxTouchPoints: 1,
      expected: { os: "iOS", version: "16.6" },
    },
    {
      description: "should detect macOS",
      userAgent:
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36",
      maxTouchPoints: 0,
      expected: { os: "macOS", version: "10.15.7" },
    },
    {
      description: "should detect Windows 10 or 11",
      userAgent:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36",
      expected: { os: "Windows", version: "10 or 11" },
    },
    {
      description: "should detect Windows 8.1",
      userAgent:
        "Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36",
      expected: { os: "Windows", version: "8.1" },
    },
    {
      description: "should detect Windows 8",
      userAgent:
        "Mozilla/5.0 (Windows NT 6.2; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36",
      expected: { os: "Windows", version: "8" },
    },
    {
      description: "should detect Windows 7",
      userAgent:
        "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36",
      expected: { os: "Windows", version: "7" },
    },
    {
      description: "should handle other Windows NT versions",
      userAgent:
        "Mozilla/5.0 (Windows NT 5.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36",
      expected: { os: "Windows", version: "5.1" },
    },
    {
      description: "should detect Android",
      userAgent:
        "Mozilla/5.0 (Linux; Android 13; SM-A536U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Mobile Safari/537.36",
      expected: { os: "Android", version: "13" },
    },
    {
      description: "should detect Linux",
      userAgent:
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36",
      expected: { os: "Linux", version: "" },
    },
    {
      description:
        "should return empty string for an unidentifiable user agent",
      userAgent: "Some obscure browser",
      expected: { os: "", version: "" },
    },
    {
      description: "should handle missing version information gracefully",
      userAgent:
        "Mozilla/5.0 (iPhone; CPU iPhone OS like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1",
      maxTouchPoints: 1,
      expected: { os: "iOS", version: "" },
    },
  ];

  it.each(testCases)(
    "$description",
    ({ userAgent, maxTouchPoints, expected }) => {
      vi.stubGlobal("navigator", {
        userAgent,
        maxTouchPoints,
      });

      const result = getOsFromUserAgent();
      expect(result).toEqual(expected);
    },
  );
});
