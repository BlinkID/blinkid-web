/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

export type OperatingSystem =
  | "Windows"
  | "macOS"
  | "iOS"
  | "iPadOS"
  | "Android"
  | "Linux"
  // eslint-disable-next-line @typescript-eslint/ban-types
  | (string & {});

export interface DetectedOS {
  os: OperatingSystem;
  version: string; // Will be an empty string if not found
}

interface Detector {
  os: OperatingSystem;
  condition: boolean;
  versionRegex?: RegExp;
  versionTransform?: (v: string) => string;
}

function getVersion(ua: string, detector: Detector): string {
  if (!detector.versionRegex) {
    return "";
  }

  const match = ua.match(detector.versionRegex);
  if (!match?.[1]) {
    return "";
  }

  return detector.versionTransform
    ? detector.versionTransform(match[1])
    : match[1];
}

/**
 * Detects the user's operating system and version from the user agent string.
 *
 * NOTE: This is a best-effort approach based on an unreliable string. Version
 * detection is especially fragile and may not work for all OSs (e.g., Linux).
 *
 * @returns An object containing the detected OS and its version.
 */
export function getOsFromUserAgent(): DetectedOS {
  const ua = navigator.userAgent;

  const windowsVersionMap: Record<string, string> = {
    "10.0": "10 or 11",
    "6.3": "8.1",
    "6.2": "8",
    "6.1": "7",
  };

  const osDetectors: Detector[] = [
    {
      os: "iPadOS",
      condition: /Macintosh/.test(ua) && navigator.maxTouchPoints > 1,
      versionRegex: /Mac OS X ([\d_]+)/,
      versionTransform: (v: string) => v.replace(/_/g, "."),
    },
    {
      os: "iOS",
      condition: /iPhone/.test(ua),
      versionRegex: /iPhone OS ([\d_]+)/,
      versionTransform: (v: string) => v.replace(/_/g, "."),
    },
    {
      os: "macOS",
      condition: /Macintosh/.test(ua),
      versionRegex: /Mac OS X ([\d_]+)/,
      versionTransform: (v: string) => v.replace(/_/g, "."),
    },
    {
      os: "Windows",
      condition: /Win/.test(ua),
      versionRegex: /Windows NT ([\d.]+)/,
      versionTransform: (v: string) => windowsVersionMap[v] || v,
    },
    {
      os: "Android",
      condition: /Android/.test(ua),
      versionRegex: /Android ([\d.]+)/,
    },
    {
      os: "Linux",
      condition: /Linux/.test(ua),
    },
  ];

  for (const detector of osDetectors) {
    if (detector.condition) {
      const version = getVersion(ua, detector);
      return { os: detector.os, version };
    }
  }

  return { os: "", version: "" };
}
