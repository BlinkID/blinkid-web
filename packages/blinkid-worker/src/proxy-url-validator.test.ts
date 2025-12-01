/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import { describe, it, expect, test } from "vitest";
import {
  validateLicenseProxyPermissions,
  sanitizeProxyUrls,
  ProxyUrlValidationError,
} from "./proxy-url-validator";
import type { LicenseUnlockResult } from "@microblink/blinkid-wasm";

describe("Proxy URL Validator", () => {
  describe("validateLicenseProxyPermissions", () => {
    describe("Valid configurations", () => {
      test.each<{
        allowPingProxy: boolean;
        allowBaltazarProxy: boolean;
        hasPing: boolean;
        unlockResult: string;
        description: string;
      }>([
        {
          allowPingProxy: true,
          allowBaltazarProxy: true,
          hasPing: true,
          unlockResult: "requires-server-permission",
          description: "both proxies allowed with online license",
        },
        {
          allowPingProxy: true,
          allowBaltazarProxy: false,
          hasPing: true,
          unlockResult: "requires-server-permission",
          description: "only ping proxy allowed with online license",
        },
        {
          allowPingProxy: false,
          allowBaltazarProxy: true,
          hasPing: true,
          unlockResult: "requires-server-permission",
          description: "only baltazar proxy allowed with online license",
        },
        {
          allowPingProxy: true,
          allowBaltazarProxy: true,
          hasPing: false,
          unlockResult: "requires-server-permission",
          description: "both proxies allowed, no ping but online license",
        },
        {
          allowPingProxy: true,
          allowBaltazarProxy: true,
          hasPing: true,
          unlockResult: "valid",
          description:
            "offline license with ping enabled and both proxies allowed",
        },
        {
          allowPingProxy: true,
          allowBaltazarProxy: false,
          hasPing: true,
          unlockResult: "valid",
          description:
            "offline license with ping enabled and only ping proxy allowed",
        },
      ])(
        "should pass when $description",
        ({ allowPingProxy, allowBaltazarProxy, hasPing, unlockResult }) => {
          const licenseUnlockResult = {
            allowPingProxy,
            allowBaltazarProxy,
            hasPing,
            unlockResult,
          } as LicenseUnlockResult;

          expect(() =>
            validateLicenseProxyPermissions(licenseUnlockResult),
          ).not.toThrow();
        },
      );
    });

    describe("Invalid configurations", () => {
      test.each<{
        allowPingProxy: boolean;
        allowBaltazarProxy: boolean;
        hasPing: boolean;
        unlockResult: string;
        description: string;
      }>([
        {
          allowPingProxy: false,
          allowBaltazarProxy: false,
          hasPing: true,
          unlockResult: "requires-server-permission",
          description: "no proxy permissions allowed",
        },
        {
          allowPingProxy: true,
          allowBaltazarProxy: true,
          hasPing: false,
          unlockResult: "valid",
          description: "offline license without ping enabled",
        },
        {
          allowPingProxy: false,
          allowBaltazarProxy: true,
          hasPing: true,
          unlockResult: "valid",
          description:
            "offline license with inconsistent proxy permissions (ping enabled, baltazar allowed, ping proxy not allowed)",
        },
        {
          allowPingProxy: true,
          allowBaltazarProxy: false,
          hasPing: false,
          unlockResult: "requires-server-permission",
          description:
            "online license with inconsistent proxy permissions (no ping, ping proxy allowed, baltazar not allowed)",
        },
      ])(
        "should throw when $description",
        ({ allowPingProxy, allowBaltazarProxy, hasPing, unlockResult }) => {
          const licenseUnlockResult = {
            allowPingProxy,
            allowBaltazarProxy,
            hasPing,
            unlockResult,
          } as LicenseUnlockResult;

          expect(() =>
            validateLicenseProxyPermissions(licenseUnlockResult),
          ).toThrow(/doesn't permit proxy usage/);
        },
      );
    });
  });

  describe("sanitizeProxyUrls", () => {
    describe("Valid URLs", () => {
      test.each<{
        input: string;
        expectedPing: string;
        expectedBaltazar: string;
        description: string;
      }>([
        {
          input: "https://proxy.example.com",
          expectedPing: "https://proxy.example.com",
          expectedBaltazar: "https://proxy.example.com/api/v2/status/check",
          description: "basic HTTPS proxy URL",
        },
        {
          input: "https://proxy.example.com:8443",
          expectedPing: "https://proxy.example.com:8443",
          expectedBaltazar:
            "https://proxy.example.com:8443/api/v2/status/check",
          description: "HTTPS proxy URL with port",
        },
        {
          input: "https://proxy.example.com/",
          expectedPing: "https://proxy.example.com",
          expectedBaltazar: "https://proxy.example.com/api/v2/status/check",
          description: "HTTPS proxy URL with trailing slash",
        },
        {
          input: "https://proxy.example.com/api/proxy",
          expectedPing: "https://proxy.example.com/api/proxy",
          expectedBaltazar:
            "https://proxy.example.com/api/proxy/api/v2/status/check",
          description: "HTTPS proxy URL with path (path is ignored)",
        },
      ])(
        "should create correct URLs for $description",
        ({ input, expectedPing, expectedBaltazar }) => {
          const result = sanitizeProxyUrls(input);

          expect(result).toEqual({
            ping: expectedPing,
            baltazar: expectedBaltazar,
          });
        },
      );
    });

    describe("Invalid URLs", () => {
      test.each<{
        input: string;
        expectedCode: "INVALID_PROXY_URL" | "HTTPS_REQUIRED";
        description: string;
      }>([
        {
          input: "http://proxy.example.com",
          expectedCode: "HTTPS_REQUIRED",
          description: "HTTP URL (HTTPS required)",
        },
        {
          input: "not-a-url",
          expectedCode: "INVALID_PROXY_URL",
          description: "invalid URL format",
        },
        {
          input: "",
          expectedCode: "INVALID_PROXY_URL",
          description: "empty string",
        },
        {
          input: "ftp://proxy.example.com",
          expectedCode: "HTTPS_REQUIRED",
          description: "FTP protocol (HTTPS required)",
        },
      ])(
        "should throw ProxyUrlValidationError for $description",
        ({ input, expectedCode }) => {
          expect(() => sanitizeProxyUrls(input)).toThrow(
            ProxyUrlValidationError,
          );

          try {
            sanitizeProxyUrls(input);
          } catch (error) {
            const proxyError = error as ProxyUrlValidationError;
            expect(proxyError.code).toBe(expectedCode);
            expect(proxyError.url).toBe(input);
            expect(proxyError.message).toContain(input);
          }
        },
      );
    });

    it("includes original URL in error message and properties", () => {
      const invalidUrl = "http://insecure.com";
      let error: ProxyUrlValidationError | null = null;

      try {
        sanitizeProxyUrls(invalidUrl);
      } catch (e) {
        error = e as ProxyUrlValidationError;
      }

      expect(error).toBeInstanceOf(ProxyUrlValidationError);
      expect(error?.url).toBe(invalidUrl);
      expect(error?.message).toContain(invalidUrl);
      expect(error?.code).toBe("HTTPS_REQUIRED");
    });
  });
});
