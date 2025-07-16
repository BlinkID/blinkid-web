/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import { AlphabetType, Rectangle } from "../utils";
import { ScanningSide } from "./ScanningSide";

/** Represents a string result for a specific alphabet */
export type AlphabetStringResult = {
  /** The value of the string result. */
  value: string;
  /** The location of the string result. */
  location?: Rectangle;
  /** The side of the string result. */
  side?: ScanningSide;
};

/** Represents multi string results with mandatory entries for all alphabets */
export type StringResult = {
  /** The string results for each alphabet. */
  [key in AlphabetType]: AlphabetStringResult;
};
