/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

/*
  Augments global types for the Image Capture API by adding
  missing types and properties.
  https://www.w3.org/TR/image-capture
  https://www.w3.org/TR/mediacapture-streams/
 */

/**
 * The focus mode.
 */
type FocusMode = "none" | "manual" | "single-shot" | "continuous";

/**
 * The exposure mode.
 */
type ExposureMode = "continuous" | "manual";

/**
 * Partial on iOS Safari
 */
type SteppedRange = Partial<{ min: number; max: number; step: number }>;

/**
 * The global interface.
 */
declare global {
  /**
   * The media track capabilities.
   */
  interface MediaTrackCapabilities {
    torch?: MediaTrackSettings["torch"];
    focusMode?: FocusMode[];
    colorTemperature?: SteppedRange;
    exposureCompensation?: SteppedRange;
    exposureMode?: ExposureMode[];
    exposureTime?: SteppedRange;
    focusDistance?: SteppedRange;
    iso?: SteppedRange;
    whiteBalanceMode?: string[];
    zoom?: SteppedRange;
    resizeMode?: string[];
    powerEfficient?: boolean[];
  }

  /**
   * The media track settings.
   */
  interface MediaTrackSettings {
    torch?: boolean;
    focusMode?: FocusMode;
    colorTemperature?: number;
    exposureCompensation?: number;
    exposureMode?: ExposureMode;
    exposureTime?: number;
    focusDistance?: number;
    iso?: number;
    whiteBalanceMode?: string;
    zoom?: number;
    resizeMode?: string;
    powerEfficient?: boolean;
  }

  /**
   * So far only used to apply torch?
   */
  interface MediaTrackConstraintSet {
    torch?: MediaTrackSettings["torch"];
    focusMode?: FocusMode[];
  }

  /**
   * The media track supported constraints.
   */
  interface MediaTrackSupportedConstraints {
    torch?: boolean;
    volume?: boolean;
    whiteBalanceMode?: boolean;
    zoom?: boolean;
    focusMode?: FocusMode[];
  }

  /**
   * The window interface.
   */
  interface Window {
    __mbCameraManagerCssCode?: string;
  }
}

export {};
