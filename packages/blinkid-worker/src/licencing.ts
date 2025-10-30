/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import { LicenseRequest, LicenseUnlockResult } from "@microblink/blinkid-wasm";

/**
 * Constructs the license request.
 *
 * @param unlockResult - The license unlock result.
 * @returns The license request.
 */
function constructLicenseRequest(
  unlockResult: LicenseUnlockResult,
): LicenseRequest {
  return {
    licenseId: unlockResult.licenseId,
    licensee: unlockResult.licensee,
    applicationIds: unlockResult.applicationIds,
    packageName: unlockResult.packageName,
    platform: "Browser",
    sdkName: unlockResult.sdkName,
    sdkVersion: unlockResult.sdkVersion,
  };
}

/**
 * Obtains a new server permission from Microblink's Baltazar service.
 *
 * @param unlockResult - The license unlock result containing license information.
 * @param baltazarUrl - The Baltazar server URL. Can be a proxy URL if configured.
 *                      Defaults to the official Microblink Baltazar server.
 * @returns Promise resolving to the server permission response.
 *
 * @example
 * ```typescript
 * // Using default Microblink server
 * const permission = await obtainNewServerPermission(unlockResult);
 *
 * // Using custom proxy server
 * const permission = await obtainNewServerPermission(
 *   unlockResult,
 *   "https://your-proxy.example.com/api/v2/status/check"
 * );
 * ```
 */
export async function obtainNewServerPermission(
  unlockResult: LicenseUnlockResult,
  baltazarUrl = "https://baltazar.microblink.com/api/v2/status/check",
) {
  // Basic URL validation
  if (!baltazarUrl || typeof baltazarUrl !== "string") {
    throw new Error("Invalid baltazarUrl: must be a non-empty string");
  }

  // Validates URL format
  try {
    new URL(baltazarUrl);
  } catch (error) {
    throw new Error(`Invalid baltazarUrl format: ${baltazarUrl}`);
  }

  try {
    const response = await fetch(baltazarUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
      body: JSON.stringify(constructLicenseRequest(unlockResult)),
    });

    if (!response.ok) {
      throw new Error(
        `Server returned error: ${response.status} ${response.statusText}`,
      );
    }

    const serverPermission = await response.text();
    return serverPermission;
  } catch (error) {
    console.error("Server permission request failed:", error);
    throw error;
  }
}
