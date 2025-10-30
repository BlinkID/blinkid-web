/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import { afterEach, describe, expect, it, vi } from "vitest";
import { createDerivedDeviceInfo } from "./createDerivedDeviceInfo";
import { DerivedDeviceInfo } from "./deviceInfo";
import { UADataValues } from "./navigator-types";

interface TestCase {
  description: string;
  userAgentData?: UADataValues;
  userAgent: string;
  expected: DerivedDeviceInfo;
}

describe("createDerivedDeviceInfo", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  const testCases: TestCase[] = [
    {
      description: "Chrome on macOS desktop",
      userAgentData: {
        architecture: "arm",
        bitness: "64",
        brands: [
          { brand: "Chromium", version: "140" },
          { brand: "Not=A?Brand", version: "24" },
          { brand: "Google Chrome", version: "140" },
        ],
        formFactors: ["Desktop"],
        fullVersionList: [
          { brand: "Chromium", version: "140.0.7339.81" },
          { brand: "Not=A?Brand", version: "24.0.0.0" },
          { brand: "Google Chrome", version: "140.0.7339.81" },
        ],
        mobile: false,
        model: "",
        platform: "macOS",
        platformVersion: "15.6.1",
        wow64: false,
      },
      userAgent:
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36",
      expected: {
        model: "Mac",
        formFactors: ["Desktop"],
        platform: "macOS",
        browser: {
          brand: "Google Chrome",
          version: "140.0.7339.81",
        },
      },
    },
    {
      description: "Chrome on an S21FE",
      userAgentData: {
        brands: [
          { brand: "Chromium", version: "140" },
          { brand: "Not=A?Brand", version: "24" },
          { brand: "Google Chrome", version: "140" },
        ],
        mobile: true,
        platform: "Android",
        architecture: "",
        bitness: "",
        formFactors: ["Mobile"],
        fullVersionList: [
          { brand: "Chromium", version: "140.0.7339.51" },
          { brand: "Not=A?Brand", version: "24.0.0.0" },
          { brand: "Google Chrome", version: "140.0.7339.51" },
        ],
        model: "SM-G990B",
        platformVersion: "15.0.0",
        wow64: false,
      },
      userAgent:
        "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Mobile Safari/537.36",
      expected: {
        model: "SM-G990B",
        formFactors: ["Mobile"],
        platform: "Android",
        browser: {
          brand: "Google Chrome",
          version: "140.0.7339.51",
        },
      },
    },
    {
      description: "Samsung Internet on an S21FE",
      userAgentData: {
        brands: [
          { brand: "Not?A_Brand", version: "99" },
          { brand: "Samsung Internet", version: "28.0" },
          { brand: "Chromium", version: "130" },
        ],
        mobile: true,
        platform: "Android",
        architecture: "",
        bitness: "",
        formFactors: ["Mobile"],
        fullVersionList: [
          { brand: "Not?A_Brand", version: "99.0.0.0" },
          { brand: "Samsung Internet", version: "28.0.5.9" },
          { brand: "Chromium", version: "130.0.6723.103" },
        ],
        model: "SM-G990B",
        platformVersion: "15.0.0",
        wow64: false,
      },
      userAgent:
        "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/28.0 Chrome/130.0.0.0 Mobile Safari/537.36",
      expected: {
        model: "SM-G990B",
        formFactors: ["Mobile"],
        platform: "Android",
        browser: {
          brand: "Samsung Internet",
          version: "28.0.5.9",
        },
      },
    },
    {
      description: "Chrome on iPhone",
      userAgent:
        "Mozilla/5.0 (iPhone; CPU iPhone OS 18_5_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/141.0.7390.96 Mobile/15E148 Safari/604.1",
      expected: {
        model: "iPhone",
        formFactors: ["Mobile"],
        platform: "iOS",
        browser: {
          brand: "Chrome",
          version: "141.0.7390.96",
        },
      },
    },
  ];

  it.each(testCases)(
    "should correctly derive device info for $description",
    ({ userAgentData, userAgent, expected }) => {
      vi.stubGlobal("navigator", {
        userAgent,
        // should be a better way to do this
        maxTouchPoints: expected.formFactors.includes("Mobile") ? 1 : 0,
      });
      const derivedInfo = createDerivedDeviceInfo(userAgent, userAgentData);
      expect(derivedInfo).toEqual(expected);
    },
  );
});
