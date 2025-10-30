/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import { DerivedDeviceInfo } from "./deviceInfo";
import { getAppleDeviceModel } from "./getAppleDeviceModel";
import { detectBrowser } from "./getBrowserFromUserAgent";
import { getOsFromUserAgent, OperatingSystem } from "./getOsFromUserAgent";
import type { FormFactor, UADataValues } from "./navigator-types";

export function createDerivedDeviceInfo(
  userAgent: string,
  userAgentData?: UADataValues,
): DerivedDeviceInfo {
  const appleDeviceModel = getAppleDeviceModel();

  // Get model
  let model = "";
  if (userAgentData?.model) {
    model = userAgentData.model;
  } else if (appleDeviceModel) {
    model = appleDeviceModel;
  } else {
    // Fallback for Android devices on Firefox
    const androidMatch = userAgent.match(/Android.*?; ([^)]+)\)/);
    if (androidMatch?.[1]) {
      model = androidMatch[1];
    }
  }

  // Get form factor
  let formFactors: FormFactor[] = ["Desktop"];
  if (userAgentData?.formFactors?.length) {
    formFactors = userAgentData.formFactors;
  } else if (userAgentData?.mobile) {
    formFactors = ["Mobile"];
  } else if (appleDeviceModel) {
    if (appleDeviceModel === "iPhone") {
      formFactors = ["Mobile"];
    } else if (appleDeviceModel === "iPad") {
      formFactors = ["Tablet"];
    }
  }

  // Get platform
  let platform: OperatingSystem = "";
  if (userAgentData?.platform) {
    platform = userAgentData.platform;
  } else {
    platform = getOsFromUserAgent().os;
  }

  // Get browser
  let browserBrand = "";
  let browserVersion = "";

  if (userAgentData?.brands?.length) {
    const significantBrand =
      userAgentData.brands.find(
        (b) => !/not.a.brand/i.test(b.brand) && b.brand !== "Chromium",
      ) ?? userAgentData.brands.find((b) => !/not.a.brand/i.test(b.brand));

    browserBrand = significantBrand?.brand ?? "";

    if (userAgentData.fullVersionList) {
      browserVersion =
        userAgentData.fullVersionList.find((b) => b.brand === browserBrand)
          ?.version ?? "";
    } else {
      browserVersion =
        userAgentData.brands.find((b) => b.brand === browserBrand)?.version ??
        "";
    }
  } else {
    const browserInfo = detectBrowser();
    browserBrand = browserInfo.name;
    browserVersion = browserInfo.version;
  }

  if (model === "" && platform === "macOS") {
    model = "Mac";
  }

  return {
    model,
    formFactors: formFactors,
    platform,
    browser: {
      brand: browserBrand,
      version: browserVersion,
    },
  };
}
