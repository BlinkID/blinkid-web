/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import { BarcodeData } from "./BarcodeData";
import { BarcodeElement } from "./BarcodeElement";
import { DriverLicenceDetailedInfo, DateResult } from "../../utils";

/** Contains detailed address information */
export type AddressDetailedInfo = {
  /** The address street portion of the document owner */
  street: string;

  /** The address postal code portion of the document owner */
  postalCode: string;

  /** The address city portion of the document owner */
  city: string;

  /** The address jurisdiction code portion of the document owner */
  jurisdiction: string;
};

/**
 * Contains data extracted from the barcode
 *
 * - In case of uncertain results, some of the properties may not be available.
 *   Their values will be set to `BARCODE_FIELD_UNREADABLE`
 */
export type BarcodeResult = {
  /** The raw, unparsed barcode data. */
  barcodeData: BarcodeData;

  /** Whether the raw barcode data was successfully parsed into structured information. */
  parsed: boolean;

  /** The first name of the document owner. */
  firstName: string;
  /** The middle name of the document owner. */
  middleName: string;
  /** The last name of the document owner. */
  lastName: string;
  /** The full name of the document owner. */
  fullName: string;
  /** The additional name information of the document owner. */
  additionalNameInformation: string;

  /** The address of the document owner. */
  address: string;
  /** The place of birth of the document owner. */
  placeOfBirth: string;
  /** The nationality of the document owner. */
  nationality: string;

  /** The race of the document owner. */
  race: string;
  /** The religion of the document owner. */
  religion: string;
  /** The profession of the document owner. */
  profession: string;
  /** The marital status of the document owner. */
  maritalStatus: string;
  /** The residential status of the document owner. */
  residentialStatus: string;
  /** The employer of the document owner. */
  employer: string;
  /** The sex of the document owner. */
  sex: string;

  /** The date of birth of the document owner. */
  dateOfBirth: DateResult<string>;
  /** The date of issue of the document. */
  dateOfIssue: DateResult<string>;
  /** The date of expiry of the document. */
  dateOfExpiry: DateResult<string>;

  /** The document number. */
  documentNumber: string;
  /** The personal identification number. */
  personalIdNumber: string;
  /** The additional number of the document. */
  documentAdditionalNumber: string;
  /** The issuing authority of the document. */
  issuingAuthority: string;

  /** The details about the address of the document owner. */
  addressDetailedInfo: AddressDetailedInfo;

  /** The driver license detailed info. */
  driverLicenseDetailedInfo: DriverLicenceDetailedInfo<string>;

  /** Document specific extended elements that contain all barcode fields */
  extendedElements: Array<BarcodeElement>;
};
