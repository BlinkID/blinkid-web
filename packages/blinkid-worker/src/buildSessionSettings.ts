/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import {
  BlinkIdSessionSettings,
  CroppedImageSettings,
  DocumentAnonymizationSettings,
  DocumentFilter,
  DocumentRules,
  RecognitionModeFilter,
  ScanningSettings,
} from "@microblink/blinkid-wasm";
import { merge } from "merge-anything";
import { OverrideProperties } from "type-fest";

/**
 * The partial scanning settings.
 */
export type PartialScanningSettings = Partial<
  OverrideProperties<
    ScanningSettings,
    {
      croppedImageSettings: Partial<CroppedImageSettings>;
      recognitionModeFilter: Partial<RecognitionModeFilter>;
      customDocumentRules: Partial<DocumentRules>[];
    }
  >
>;

/**
 * The partial BlinkID session settings.
 */
export type PartialBlinkIdSessionSettings = OverrideProperties<
  Partial<BlinkIdSessionSettings>,
  {
    scanningSettings?: PartialScanningSettings;
  }
>;

/**
 * Normalizes the document filter.
 *
 * @param filter - The document filter.
 * @returns The normalized document filter.
 */
function normalizeDocumentFilter(
  filter: DocumentFilter | undefined,
): DocumentFilter {
  return {
    country: filter?.country ?? undefined,
    region: filter?.region ?? undefined,
    type: filter?.type ?? undefined,
  };
}

/**
 * Normalizes the document rule.
 *
 * @param rule - The document rule.
 * @returns The normalized document rule.
 */
export const normalizeDocumentRule = (
  rule: Partial<DocumentRules>,
): DocumentRules => {
  return {
    documentFilter: normalizeDocumentFilter(rule.documentFilter),
    fields: rule.fields ?? [],
  };
};

/**
 * Normalizes the document anonymization settings.
 *
 * @param settings - The document anonymization settings.
 * @returns The normalized document anonymization settings.
 */
export const normalizeDocumentAnonymizationSettings = (
  settings: DocumentAnonymizationSettings,
): DocumentAnonymizationSettings => {
  return {
    documentFilter: normalizeDocumentFilter(settings.documentFilter),
    fields: settings.fields || [],
    documentNumberAnonymizationSettings:
      settings.documentNumberAnonymizationSettings
        ? {
            prefixDigitsVisible:
              settings.documentNumberAnonymizationSettings.prefixDigitsVisible,
            suffixDigitsVisible:
              settings.documentNumberAnonymizationSettings.suffixDigitsVisible,
          }
        : undefined,
  };
};

/**
 * Creates merged BlinkId session settings from default settings and user options.
 *
 * @param options - User-provided session settings.
 * @param defaultSessionSettings - The base session settings to use. These
 * settings will be merged with the provided `options`, where `options` can
 * override specific values.
 *
 * @returns Complete merged settings.
 */
export function buildSessionSettings(
  options: PartialBlinkIdSessionSettings = {},
  defaultSessionSettings: BlinkIdSessionSettings,
): BlinkIdSessionSettings {
  // TODO: find a better way to handle this
  // Remove keys with undefined values from options
  if (options) {
    options = Object.fromEntries(
      Object.entries(options).filter(([_, value]) => value !== undefined),
    );
  }

  const customDocumentRules: DocumentRules[] =
    options?.scanningSettings?.customDocumentRules?.map(
      normalizeDocumentRule,
    ) ?? [];

  const customDocumentAnonymizationSettings: DocumentAnonymizationSettings[] =
    options?.scanningSettings?.customDocumentAnonymizationSettings?.map(
      normalizeDocumentAnonymizationSettings,
    ) ?? [];

  const scanningSettings = {
    ...options?.scanningSettings,
    customDocumentRules,
    customDocumentAnonymizationSettings,
  };

  const sessionSettings = merge(defaultSessionSettings, {
    ...options,
    scanningSettings,
  });

  return sessionSettings;
}
