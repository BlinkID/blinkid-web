/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import type {
  DeviceInfo,
  ErrorData,
  HardwareCameraInfoData,
  LogData,
  PingBrowserDeviceInfo,
  PingError,
  PingHardwareCameraInfo,
  PingLog,
  PingSdkCameraInputInfo,
  PingSdkCameraPermission,
  PingSdkScanConditions,
  PingSdkUxEvent,
  PingSdkWrapperProduct,
  SdkCameraInputInfoData,
  SdkCameraPermissionData,
  SdkScanConditionsData,
  SdkUxEventData,
  SdkWrapperProductData,
} from "@microblink/blinkid-core";

export class PingBrowserDeviceInfoImpl implements PingBrowserDeviceInfo {
  constructor(data: DeviceInfo) {
    this.data = data;
  }

  readonly data: DeviceInfo;
  readonly schemaName = "ping.browser.device.info";
  readonly schemaVersion = "1.0.0";
}

export class PingSdkUxEventImpl implements PingSdkUxEvent {
  constructor(data: SdkUxEventData) {
    this.data = data;
  }

  readonly data: SdkUxEventData;
  readonly schemaName = "ping.sdk.ux.event";
  readonly schemaVersion = "1.0.0";
}

export class PingErrorImpl implements PingError {
  constructor(data: ErrorData) {
    this.data = data;
  }

  readonly data: ErrorData;
  readonly schemaName = "ping.error";
  readonly schemaVersion = "1.0.0";
}

export class PingHardwareCameraInfoImpl implements PingHardwareCameraInfo {
  constructor(data: HardwareCameraInfoData) {
    this.data = data;
  }

  readonly data: HardwareCameraInfoData;
  readonly schemaName = "ping.hardware.camera.info";
  readonly schemaVersion = "1.0.3";
  readonly sessionNumber = 0;
}

export class PingLogImpl implements PingLog {
  constructor(data: LogData) {
    this.data = data;
  }

  readonly data: LogData;
  readonly schemaName = "ping.log";
  readonly schemaVersion = "1.0.0";
}

export class PingSdkCameraInputInfoImpl implements PingSdkCameraInputInfo {
  constructor(data: SdkCameraInputInfoData) {
    this.data = data;
  }

  readonly data: SdkCameraInputInfoData;
  readonly schemaName = "ping.sdk.camera.input.info";
  readonly schemaVersion = "1.0.2";
}

export class PingSdkCameraPermissionImpl implements PingSdkCameraPermission {
  constructor(data: SdkCameraPermissionData) {
    this.data = data;
  }

  readonly data: SdkCameraPermissionData;
  readonly schemaName = "ping.sdk.camera.permission";
  readonly schemaVersion = "1.0.0";
}

export class PingSdkScanConditionsImpl implements PingSdkScanConditions {
  constructor(data: SdkScanConditionsData) {
    this.data = data;
  }

  readonly data: SdkScanConditionsData;
  readonly schemaName = "ping.sdk.scan.conditions";
  readonly schemaVersion = "1.0.0";
}

export class PingSdkWrapperProductImpl implements PingSdkWrapperProduct {
  constructor(data: SdkWrapperProductData) {
    this.data = data;
  }

  readonly data: SdkWrapperProductData;
  readonly schemaName = "ping.sdk.wrapper.product";
  readonly schemaVersion = "1.0.0";
}
