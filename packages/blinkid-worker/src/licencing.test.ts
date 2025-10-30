/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import { obtainNewServerPermission } from "./licencing";
import type { LicenseUnlockResult } from "@microblink/blinkid-wasm";

const mockUnlockResult: LicenseUnlockResult = {
  isTrial: false,
  hasPing: true,
  licenseId: "test-license-id",
  licensee: "test-licensee",
  applicationIds: ["app1", "app2"],
  packageName: "test.package",
  sdkName: "blinkid-sdk",
  sdkVersion: "1.0.0",
  unlockResult: "requires-server-permission",
  licenseError: "",
  showDemoOverlay: false,
  showProductionOverlay: false,
  allowBaltazarProxy: true,
  allowPingProxy: true,
};

describe("obtainNewServerPermission", () => {
  const defaultUrl = "https://baltazar.microblink.com/api/v2/status/check";
  const customUrl = "https://custom-proxy.example.com/api/v2/status/check";
  const mockResponse = "some-response";

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("should throw if baltazarUrl is not a string", async () => {
    await expect(
      // @ts-expect-error
      obtainNewServerPermission(mockUnlockResult, null),
    ).rejects.toThrow(/Invalid baltazarUrl/);
    await expect(
      // @ts-expect-error
      obtainNewServerPermission(mockUnlockResult, 123),
    ).rejects.toThrow(/Invalid baltazarUrl/);
    await expect(
      // @ts-expect-error
      obtainNewServerPermission(mockUnlockResult, {}),
    ).rejects.toThrow(/Invalid baltazarUrl/);
    // Empty string is also invalid
    await expect(
      obtainNewServerPermission(mockUnlockResult, ""),
    ).rejects.toThrow(/Invalid baltazarUrl/);
  });

  it("should throw if baltazarUrl is an invalid URL", async () => {
    await expect(
      obtainNewServerPermission(mockUnlockResult, "not-a-url"),
    ).rejects.toThrow(/Invalid baltazarUrl format/);
  });

  it("should throw if server returns non-ok response", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
        statusText: "Internal Server Error",
        json: vi.fn(),
      }),
    );
    await expect(
      obtainNewServerPermission(mockUnlockResult, customUrl),
    ).rejects.toThrow(/Server returned error: 500/);
  });

  it("should return server permission on success", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        text: vi.fn().mockResolvedValue(mockResponse),
      }),
    );
    const result = await obtainNewServerPermission(mockUnlockResult, customUrl);
    expect(result).toEqual(mockResponse);
  });

  it("should use the default URL if none is provided", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      text: vi.fn().mockResolvedValue(mockResponse),
    });
    vi.stubGlobal("fetch", fetchMock);
    await obtainNewServerPermission(mockUnlockResult);
    expect(fetchMock).toHaveBeenCalledWith(defaultUrl, expect.anything());
  });

  it("should throw and log if fetch throws", async () => {
    const error = new Error("network error");
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(error));
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {
      /* log */
    });
    await expect(
      obtainNewServerPermission(mockUnlockResult, customUrl),
    ).rejects.toThrow("network error");
    expect(consoleSpy).toHaveBeenCalledWith(
      "Server permission request failed:",
      error,
    );
    consoleSpy.mockRestore();
  });
});
