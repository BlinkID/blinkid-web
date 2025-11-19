/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

/** Represents level of anonymization performed on the scanning result. */
export type AnonymizationMode =
  /** Anonymization will not be performed */
  | "none"
  /** DocumentImage is anonymized with black boxes covering sensitive data. */
  | "image-only"
  /** Result fields containing sensitive data are removed from result. */
  | "result-fields-only"
  /** This mode is combination of ImageOnly and ResultFieldsOnly modes. */
  | "full-result";
