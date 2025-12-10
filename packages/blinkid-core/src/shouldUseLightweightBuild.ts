/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import { getDeviceInfo } from "./deviceInfo/deviceInfo";

/**
 * Determines whether to use the lightweight build based on device capabilities.
 *
 * This function checks if the device is mobile (Mobile or Tablet form factor) and
 * has less than 4GB of memory. The lightweight build is only used for low-budget
 * mobile devices where memory information is available. For iOS device this will always
 * return undefined, since we don't have memory information.
 *
 * @returns `true` if lightweight build should be used, `false` if full build should be used,
 *          or `undefined` if the decision cannot be made (e.g., memory info unavailable)
 */
export async function shouldUseLightweightBuild(): Promise<
  boolean | undefined
> {
  const deviceInfo = await getDeviceInfo();

  const isMobile = deviceInfo.derivedDeviceInfo.formFactors.some(
    (formFactor) => formFactor === "Mobile" || formFactor === "Tablet",
  );
  if (isMobile && deviceInfo.memory !== undefined) {
    return deviceInfo.memory < 4;
  }

  // If not mobile or memory info unavailable, return undefined
  return undefined;
}
