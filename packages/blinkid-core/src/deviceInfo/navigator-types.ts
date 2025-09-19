/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

/**
 * Based on https://github.com/lukewarlow/user-agent-data-types
 * updated and refactored for usage without type references
 *
 * @see https://wicg.github.io/ua-client-hints/
 */

declare global {
  interface Navigator {
    readonly userAgentData?: NavigatorUAData;
    /**
     * @see https://www.w3.org/TR/device-memory/#sec-device-memory-js-api
     */
    readonly deviceMemory?: number;
  }

  interface WorkerNavigator {
    readonly userAgentData?: NavigatorUAData;
    /**
     * @see https://www.w3.org/TR/device-memory/#sec-device-memory-js-api
     */
    readonly deviceMemory?: number;
  }
}

/**
 * Common form-factor values as per spec.
 *
 * @see https://wicg.github.io/ua-client-hints/#sec-ch-ua-form-factors
 */
export type FormFactor =
  | "Desktop"
  | "Automotive"
  | "Mobile"
  | "Tablet"
  | "XR"
  | "EInk"
  | "Watch";

/**
 * @see https://wicg.github.io/ua-client-hints/#dictdef-navigatoruabrandversion
 */
export interface NavigatorUABrandVersion {
  readonly brand: string;
  readonly version: string;
}

/**
 * @see https://wicg.github.io/ua-client-hints/#dictdef-uadatavalues
 */
export interface UADataValues {
  readonly brands?: NavigatorUABrandVersion[];
  readonly mobile?: boolean;
  readonly platform?: string;
  readonly architecture?: string;
  readonly bitness?: string;
  readonly formFactors?: FormFactor[];
  readonly model?: string;
  readonly platformVersion?: string;
  /** @deprecated in favour of fullVersionList */
  readonly uaFullVersion?: string;
  readonly fullVersionList?: NavigatorUABrandVersion[];
  readonly wow64?: boolean;
}

/**
 * Allows for type-safe parameter passing while still conforming to spec.
 */
export type Hints = keyof UADataValues;

/**
 * @see https://wicg.github.io/ua-client-hints/#dictdef-ualowentropyjson
 */
export interface UALowEntropyJSON {
  readonly brands: NavigatorUABrandVersion[];
  readonly mobile: boolean;
  readonly platform: string;
}

/**
 * @see https://wicg.github.io/ua-client-hints/#navigatoruadata
 */
export interface NavigatorUAData extends UALowEntropyJSON {
  getHighEntropyValues(hints: Hints[] | string[]): Promise<UADataValues>;
  toJSON(): UALowEntropyJSON;
}

/**
 * Export an empty object to make this file a module.
 */
export {};
