/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import type { LicenseUnlockResult } from "@microblink/blinkid-wasm";

export type ProxyUrlValidationErrorCode =
  | "INVALID_PROXY_URL"
  | "HTTPS_REQUIRED";

export class ProxyUrlValidationError extends Error {
  constructor(
    public readonly code: ProxyUrlValidationErrorCode,
    message: string,
    public readonly url: string,
  ) {
    super(`Proxy URL validation failed for "${url}": ${message}`);
    this.name = "ProxyUrlValidationError";
  }
}

export type SanitizedProxyUrls = {
  ping: string;
  baltazar: string;
};

/**
 * Validates that the license allows proxy usage.
 */
export function validateLicenseProxyPermissions(
  licenseUnlockResult: LicenseUnlockResult,
): void {
  const isOnlineLicense =
    licenseUnlockResult.unlockResult === "requires-server-permission";
  const { allowPingProxy, allowBaltazarProxy, hasPing } = licenseUnlockResult;

  // Check if the license allows usage of any proxy
  if (!allowPingProxy && !allowBaltazarProxy) {
    throw new Error(
      `Microblink proxy URL is set but your license doesn't permit proxy usage. Check your license.`,
    );
  }

  // For offline licenses, ping must be enabled. For online licenses, ping requirement is waived.
  if (!isOnlineLicense && !hasPing) {
    throw new Error(
      `Microblink proxy URL is set but your license doesn't permit proxy usage. Check your license.`,
    );
  }

  // Check for inconsistent configurations and throw if found
  // Invalid: Offline license with ping enabled but allows only baltazar proxy (not ping proxy)
  // Invalid: Online license without ping but allows only ping proxy (not baltazar proxy)
  if (
    (!isOnlineLicense && hasPing && allowBaltazarProxy && !allowPingProxy) ||
    (isOnlineLicense && !hasPing && !allowBaltazarProxy && allowPingProxy)
  ) {
    throw new Error(
      `Microblink proxy URL is set but your license doesn't permit proxy usage. Check your license.`,
    );
  }
}

/**
 * Validates and sanitizes proxy URLs for different Microblink services.
 */
export function sanitizeProxyUrls(baseUrl: string): {
  ping: string;
  baltazar: string;
} {
  // Validate base URL format
  let parsedUrl: URL;
  try {
    parsedUrl = new URL(baseUrl);
  } catch (error) {
    throw new ProxyUrlValidationError(
      "INVALID_PROXY_URL",
      `Failed to create URL instance for provided Microblink proxy URL "${baseUrl}". Expected format: https://your-proxy.com or https://your-proxy.com/`,
      baseUrl,
    );
  }

  // Security validation: Ensure HTTPS in production
  if (parsedUrl.protocol !== "https:") {
    throw new ProxyUrlValidationError(
      "HTTPS_REQUIRED",
      `Proxy URL validation failed for "${baseUrl}": HTTPS protocol must be used. Expected format: https://your-proxy.com or https://your-proxy.com/`,
      baseUrl,
    );
  }

  // Create sanitized URLs for each service
  const baseUrlStr = parsedUrl.origin;

  try {
    const baltazarUrl = new URL("/api/v2/status/check", baseUrlStr).toString();

    return {
      ping: baseUrlStr,
      baltazar: baltazarUrl,
    };
  } catch (error) {
    throw new ProxyUrlValidationError(
      "INVALID_PROXY_URL",
      `Failed to build baltazar service URL`,
      baseUrl,
    );
  }
}
