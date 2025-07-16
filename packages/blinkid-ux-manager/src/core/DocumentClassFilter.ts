/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import { DocumentClassInfo } from "@microblink/blinkid-core";

/**
 * A type representing a filter function for document classification.
 *
 * This function is used to determine whether a document class is supported or
 * not. It takes a `DocumentClassInfo` object as input and returns a boolean
 * value:
 * - `true`: The document class is supported.
 * - `false`: The document class is not supported, and the document will be
 * marked as "unsupported-document".
 *
 * @param documentClassInfo - Information about the document class, such as country and type.
 *
 * @returns A boolean indicating whether the document class is supported.
 */
export type DocumentClassFilter = (
  documentClassInfo: DocumentClassInfo,
) => boolean;
