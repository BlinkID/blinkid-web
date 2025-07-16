/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

/**
 * Result of the data matching algorithm for scanned parts/sides of the
 * document.
 */
export type DataMatchState = "not-performed" | "failed" | "success";

/** Type of field on which data match algorithm has been performed. */
export type DataMatchFieldType =
  | "date-of-birth"
  | "date-of-expiry"
  | "document-number"
  | "document-additional-number"
  | "document-optional-additional-number"
  | "personal-id-number";

/** Represents the state of data match per field */
export type DataMatchFieldState = {
  /** Type of field on which data match algorithm has been performed. */
  fieldType: DataMatchFieldType;
  /** The state of the data match on the specified field. */
  state: DataMatchState;
};

/** Represents the result of the data match algorithm. */
export type DataMatchResult = {
  /** Info on whether the data extracted from multiple sides matches */
  statePerField?: DataMatchFieldState[];
  /** The overall state of the data match. */
  overallState: DataMatchState;
};
