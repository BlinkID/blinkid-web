/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

/** The license unlock result. */
export type LicenseUnlockResult = Readonly<{
  /** Whether the license is a trial license. */
  isTrial: boolean;
  /** Whether the license has ping enabled. */
  hasPing: boolean;
  /** The license id. */
  licenseId: string;
  /** The licensee. */
  licensee: string;
  /** The application ids. */
  applicationIds: Array<string>;
  /** The package name. */
  packageName: string;
  /** The sdk name. */
  sdkName: string;
  /** The sdk version. */
  sdkVersion: string;
  /** The unlock result. */
  unlockResult: LicenseTokenState;
  /** The license error. */
  licenseError: string;
  /** Whether to show the demo overlay. */
  showDemoOverlay: boolean;
  /** Whether to show the production overlay. */
  showProductionOverlay: boolean;
  /** Whether to allow baltazar proxy. */
  allowBaltazarProxy: boolean;
  /** Whether to allow ping proxy. */
  allowPingProxy: boolean;
}>;

/** The license token state. */
export type LicenseTokenState =
  | "invalid"
  | "requires-server-permission"
  | "valid";

/** The license request. */
export type LicenseRequest = Readonly<{
  /** The license id. */
  licenseId: string;
  /** The licensee. */
  licensee: string;
  /** The application ids. */
  applicationIds: Array<string>;
  /** The package name. */
  packageName: string;
  /** The platform. */
  platform: string;
  /** The sdk name. */
  sdkName: string;
  /** The sdk version. */
  sdkVersion: string;
}>;

/** The server permission submit error. */
export type ServerPermissionSubmitError = Readonly<{
  /** The error. */
  error: ServerPermissionError;
  /** The lease. */
  lease: number;
  /** The network error description. */
  networkErrorDescription?: string;
}>;

/** The server permission error. */
export type ServerPermissionError =
  | "network-error"
  | "remote-lock"
  | "permission-expired"
  | "payload-corrupted"
  | "payload-signature-verification-failed"
  | "incorrect-token-state"
  | "detected-skewed-clock";
