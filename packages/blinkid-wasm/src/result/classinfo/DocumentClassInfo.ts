/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import { Country } from "./Country";
import { DocumentType } from "./DocumentType";
import { Region } from "./Region";

/** Represents the document class information. */
export type DocumentClassInfo = {
  /** The document country. */
  country?: Country;

  /** The document region. */
  region?: Region;

  /** The type of the scanned document. */
  type?: DocumentType;

  /** The name of the country that issued the scanned document. */
  countryName?: string;

  /** The ISO numeric code of the country that issued the scanned document. */
  isoNumericCountryCode?: string;

  /** The 2-letter ISO code of the country that issued the scanned document. */
  isoAlpha2CountryCode?: string;

  /** The 3-letter ISO code of the country that issued the scanned document. */
  isoAlpha3CountryCode?: string;
};
