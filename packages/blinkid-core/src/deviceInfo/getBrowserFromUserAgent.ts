/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

export type BrowserName =
  // In-App Browsers
  | "Facebook In-App"
  | "Instagram In-App"
  | "TikTok In-App"
  // Niche/Alternate Browsers
  | "Edge"
  | "DuckDuckGo"
  | "Vivaldi"
  | "Brave"
  | "Opera"
  | "Samsung Browser"
  // WebViews
  | "Android WebView"
  | "iOS WebView"
  // Major Browsers
  | "Chrome"
  | "Firefox"
  | "Safari"
  // Other
  | "Unknown";

export interface BrowserInfo {
  name: BrowserName;
  version: string;
}

/**
 * A rule for detecting a browser from a user agent string.
 */
interface BrowserRule {
  name: BrowserName;
  regex: RegExp;
  getVersion: (match: RegExpMatchArray, ua: string) => string;
}

/**
 * An ordered list of rules to detect browsers.
 * The order is critical: from most specific to most general.
 */
const browserRules: readonly BrowserRule[] = [
  // 1. In-App Browsers
  {
    name: "Facebook In-App",
    regex: /FBAV\/([\d.]+)/,
    getVersion: (match) => match[1],
  },
  {
    name: "Instagram In-App",
    regex: /Instagram ([\d.]+)/,
    getVersion: (match) => match[1],
  },
  { name: "TikTok In-App", regex: /TikTok/, getVersion: () => "" },

  // 2. Niche/Alternate Browsers (must be checked before generic Chrome)
  { name: "Edge", regex: /Edg\/([\d.]+)/, getVersion: (match) => match[1] },
  {
    name: "DuckDuckGo",
    regex: /DuckDuckGo\/([\d.]+)/,
    getVersion: (match) => match[1],
  },
  {
    name: "Vivaldi",
    regex: /Vivaldi\/([\d.]+)/,
    getVersion: (match) => match[1],
  },
  { name: "Opera", regex: /OPR\/([\d.]+)/, getVersion: (match) => match[1] },
  {
    name: "Samsung Browser",
    regex: /SamsungBrowser\/([\d.]+)/,
    getVersion: (match) => match[1],
  },

  // 3. Platform-specific browsers (e.g., on iOS)
  {
    name: "Firefox",
    regex: /FxiOS\/([\S]+)/, // Firefox on iOS
    getVersion: (match) => match[1],
  },
  {
    name: "Chrome",
    regex: /CriOS\/([\S]+)/, // Chrome on iOS
    getVersion: (match) => match[1],
  },

  // 4. WebViews (must be checked before generic Chrome/Safari)
  {
    name: "Android WebView",
    regex: /; wv\)/,
    getVersion: (_, ua) => ua.match(/Chrome\/([\d.]+)/)?.[1] ?? "",
  },

  // 5. Major Mainstream Browsers (the final fallbacks)
  {
    name: "Brave",
    regex: /Brave/,
    getVersion: (_, ua) => ua.match(/Chrome\/([\d.]+)/)?.[1] ?? "",
  },
  {
    name: "Chrome",
    regex: /Chrome\/([\d.]+)/,
    getVersion: (match) => match[1],
  },
  {
    name: "Firefox",
    regex: /Firefox\/([\d.]+)/,
    getVersion: (match) => match[1],
  },
  {
    name: "Safari",
    regex: /Version\/([\d.]+).*Safari/,
    getVersion: (match) => match[1],
  },
];

/**
 * Detects the user's browser, brand, and version from the user agent string.
 * This is a simplified version focused on common global browsers.
 *
 * The order of checks is critical for accuracy.
 *
 * @returns An object containing the detected browser name and version string.
 */
export function detectBrowser(): BrowserInfo {
  const ua = navigator.userAgent;

  // iOS WebView is a special case that requires feature detection, not just UA parsing.
  // We check for it first.
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (window.webkit?.messageHandlers) {
    const osVersionMatch = ua.match(/OS ([\d_]+)/);
    return {
      name: "iOS WebView",
      version: osVersionMatch ? osVersionMatch[1].replace(/_/g, ".") : "",
    };
  }

  for (const rule of browserRules) {
    const match = ua.match(rule.regex);
    if (match) {
      return {
        name: rule.name,
        version: rule.getVersion(match, ua),
      };
    }
  }

  return { name: "Unknown", version: "" };
}
