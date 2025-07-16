/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import { StringResult } from "../result";

/**
 * Smart date result structure.
 *
 * @template S - The type of the string result.
 */
export type DateResult<S extends string | StringResult> = {
  /** Day in month [1-31] */
  day?: number;
  /** Month in year [1-12] */
  month?: number;
  /** Four digit year */
  year?: number;
  /** Original date string from the document */
  originalString?: S;
  /** Indicates whether this date is filled by internal domain knowledge */
  filledByDomainKnowledge: boolean;
  /** Indicates whether date was parsed successfully */
  successfullyParsed?: boolean;
};
