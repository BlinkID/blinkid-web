/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import { DocumentFilter } from "./DocumentFilter";
import { FieldType } from "../result";

/** Represents the document number anonymization settings. */
export type DocumentNumberAnonymizationSettings = {
  /**
   * Defines how many digits at the beginning of the document number remain
   * visible after anonymization. Allowed values are `0` to `255`.
   */
  prefixDigitsVisible: number;

  /**
   * Defines how many digits at the end of the document number remain visible
   * after anonymization.
   */
  suffixDigitsVisible: number;
};

/** Represents the document anonymization settings. */
export type DocumentAnonymizationSettings = {
  /** Specified fields will be anonymized if filter conditions are met. */
  documentFilter?: DocumentFilter;

  /** Fields to be anonymized. */
  fields: FieldType[];

  /** Document number anonymization settings. */
  documentNumberAnonymizationSettings?: DocumentNumberAnonymizationSettings;
};
