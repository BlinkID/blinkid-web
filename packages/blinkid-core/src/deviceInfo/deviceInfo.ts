/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import { createDerivedDeviceInfo } from "./createDerivedDeviceInfo";
import { OperatingSystem } from "./getOsFromUserAgent";
import "./navigator-types";
import type { FormFactor, UADataValues } from "./navigator-types";

export type * from "./navigator-types";

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getParameter
 */
export type GpuInfo = {
  renderer: string;
  shadingLanguageVersion: string;
  vendor: string;
  version: string;
};

export type BrowserStorageSupport = {
  cookieEnabled: boolean;
  localStorageEnabled: boolean;
};

export type DeviceScreenInfo = {
  screenWidth: number;
  screenHeight: number;
  devicePixelRatio: number;
  physicalScreenWidth: number;
  physicalScreenHeight: number;
  maxTouchPoints: number;
};

export type DeviceInfo = {
  userAgentData?: UADataValues;
  userAgent: string;
  threads: number;
  memory?: number;
  gpu?: GpuInfo;
  screen: DeviceScreenInfo;
  browserStorageSupport: BrowserStorageSupport;
  derivedDeviceInfo: DerivedDeviceInfo;
};

export type DerivedDeviceInfo = {
  model: string;
  formFactors: FormFactor[];
  platform: OperatingSystem | "";
  browser: {
    brand: string;
    version: string;
  };
};

/**
 * Get GPU info using WebGL context
 */
function getGpuInfo(): GpuInfo | undefined {
  const canvas = document.createElement("canvas");
  const gl = canvas.getContext("webgl");

  if (gl && gl instanceof WebGLRenderingContext) {
    const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
    return {
      renderer: debugInfo
        ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
        : gl.getParameter(gl.RENDERER),
      shadingLanguageVersion: gl.getParameter(gl.SHADING_LANGUAGE_VERSION),
      vendor: debugInfo
        ? gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL)
        : gl.getParameter(gl.VENDOR),
      version: gl.getParameter(gl.VERSION),
    } as GpuInfo;
  }

  return undefined;
}

function isLocalStorageAvailable(): boolean {
  try {
    const key = "__storage_test__";
    window.localStorage.setItem(key, key);
    window.localStorage.removeItem(key);
    return true;
  } catch {
    return false;
  }
}

/**
 * Get granular device info from `navigator.userAgentData.getHighEntropyValues`
 * @see https://developer.mozilla.org/en-US/docs/Web/API/NavigatorUAData/getHighEntropyValues
 */
export async function getUserAgentData() {
  let userAgentData: UADataValues | undefined;

  try {
    userAgentData = await navigator.userAgentData?.getHighEntropyValues([
      "brands",
      "mobile",
      "platform",
      "architecture",
      "bitness",
      "formFactors",
      "model",
      "platformVersion",
      "fullVersionList",
      "wow64",
    ]);
  } catch {
    // not supported
  }

  return userAgentData;
}

export async function getDeviceInfo() {
  const userAgentData = await getUserAgentData();

  const values: DeviceInfo = {
    userAgentData,
    userAgent: navigator.userAgent,
    threads: navigator.hardwareConcurrency,
    memory: navigator.deviceMemory,
    gpu: getGpuInfo(),
    screen: {
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      devicePixelRatio: window.devicePixelRatio,
      physicalScreenWidth: window.screen.width * window.devicePixelRatio,
      physicalScreenHeight: window.screen.height * window.devicePixelRatio,
      maxTouchPoints: navigator.maxTouchPoints,
    },
    browserStorageSupport: {
      cookieEnabled: navigator.cookieEnabled,
      localStorageEnabled: isLocalStorageAvailable(),
    },
    derivedDeviceInfo: createDerivedDeviceInfo(
      navigator.userAgent,
      userAgentData,
    ),
  };

  return values;
}
