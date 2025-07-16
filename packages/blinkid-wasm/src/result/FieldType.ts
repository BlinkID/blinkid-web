/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

/** Represents all possible field types that can be extracted from the document. */

import { VizResult } from "./viz";

import { Simplify } from "type-fest";

/** Represents all possible field types that can be extracted from the document. */
export type FieldType = Simplify<keyof VizResult | "mrz">;
