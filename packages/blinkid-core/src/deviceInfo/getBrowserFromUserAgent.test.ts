/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import { afterEach, describe, expect, test, vi } from "vitest";
import { BrowserInfo, detectBrowser } from "./getBrowserFromUserAgent";

describe("detectBrowser", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  // Test cases with various user agent strings
  const testCases: [string, BrowserInfo][] = [
    // Chrome
    [
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
      { name: "Chrome", version: "124.0.0.0" },
    ],
    [
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
      { name: "Chrome", version: "124.0.0.0" },
    ],
    [
      "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/125.0.6422.80 Mobile/15E148 Safari/604.1",
      { name: "Chrome", version: "125.0.6422.80" },
    ],
    [
      "Mozilla/5.0 (iPhone; CPU iPhone OS 18_5_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/141.0.7390.69 Mobile/15E148 Safari/604.1",
      { name: "Chrome", version: "141.0.7390.69" },
    ],

    // Firefox
    [
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:125.0) Gecko/20100101 Firefox/125.0",
      { name: "Firefox", version: "125.0" },
    ],
    [
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:125.0) Gecko/20100101 Firefox/125.0",
      { name: "Firefox", version: "125.0" },
    ],
    [
      "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) FxiOS/126.0 Mobile/15E148",
      { name: "Firefox", version: "126.0" },
    ],

    // Safari
    [
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4.1 Safari/605.1.15",
      { name: "Safari", version: "17.4.1" },
    ],
    [
      "Mozilla/5.0 (iPhone; CPU iPhone OS 17_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4.1 Mobile/15E148 Safari/604.1",
      { name: "Safari", version: "17.4.1" },
    ],
    [
      "Mozilla/5.0 (iPad; CPU OS 17_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1",
      { name: "Safari", version: "17.5" },
    ],

    // Edge
    [
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36 Edg/124.0.0.0",
      { name: "Edge", version: "124.0.0.0" },
    ],

    // Samsung Browser
    [
      "Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.6312.118 Mobile Safari/537.36 SamsungBrowser/25.0",
      { name: "Samsung Browser", version: "25.0" },
    ],

    // Opera
    [
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36 OPR/110.0.0.0",
      { name: "Opera", version: "110.0.0.0" },
    ],

    // Vivaldi
    [
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36 Vivaldi/6.7.3329.21",
      { name: "Vivaldi", version: "6.7.3329.21" },
    ],

    // DuckDuckGo
    [
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) DuckDuckGo/1.80.0 Chrome/122.0.6261.112 Safari/537.36",
      { name: "DuckDuckGo", version: "1.80.0" },
    ],

    // Brave
    [
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36 Brave/5.0",
      { name: "Brave", version: "124.0.0.0" },
    ],

    // Facebook In-App
    [
      "Mozilla/5.0 (iPhone; CPU iPhone OS 17_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 [FBAN/FBIOS;FBDV/iPhone16,1;FBMD/iPhone;FBSN/iOS;FBSV/17.4.1;FBSS/3;FBID/phone;FBLC/en_US;FBOP/5] FBAV/459.0.0.52.113",
      { name: "Facebook In-App", version: "459.0.0.52.113" },
    ],

    // Instagram In-App
    [
      "Mozilla/5.0 (iPhone; CPU iPhone OS 17_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 331.0.0.36.113 (iPhone16,1; iOS 17_4_1; en_US; en-US; scale=3.00; 1179x2556; 533948393)",
      { name: "Instagram In-App", version: "331.0.0.36.113" },
    ],

    // TikTok In-App
    [
      "Mozilla/5.0 (iPhone; CPU iPhone OS 17_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 musical_ly/2024040321 (iPhone; iOS 17.4.1; en_US; U; Obey-Vars: 0) TikTok/34.2.0",
      { name: "TikTok In-App", version: "" },
    ],

    // Android WebView
    [
      "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.6367.179 Mobile Safari/537.36; wv)",
      { name: "Android WebView", version: "124.0.6367.179" },
    ],
  ];

  test.each(testCases)(
    "should detect browser for %s",
    (userAgent, expected) => {
      vi.stubGlobal("navigator", { userAgent });
      expect(detectBrowser()).toEqual(expected);
    },
  );

  // Test for iOS WebView
  test("should detect iOS WebView", () => {
    vi.stubGlobal("window", {
      webkit: {
        messageHandlers: {},
      },
    });

    vi.stubGlobal("navigator", {
      userAgent:
        "Mozilla/5.0 (iPhone; CPU iPhone OS 18_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148",
    });
    expect(detectBrowser()).toEqual({ name: "iOS WebView", version: "18.6" });
  });

  // Test for an unknown browser
  test("should return Unknown for an unknown user agent", () => {
    vi.stubGlobal("navigator", {
      userAgent: "Some weird browser I made myself",
    });
    expect(detectBrowser()).toEqual({ name: "Unknown", version: "" });
  });
});
