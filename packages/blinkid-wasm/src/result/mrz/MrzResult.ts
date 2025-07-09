/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import { DateResult } from "../../utils";


/** Types of documents that can contain MRZ */
export type MrzDocumentType =
  | "unknown"
  | "identity-card"
  | "passport"
  | "visa"
  | "green-card"
  | "mys-pass-imm13p"
  | "driver-license"
  | "internal-travel-document"
  | "border-crossing-card";

/** Result of Machine Readable Zone extraction */
export type MrzResult = {
  /** The entire Machine Readable Zone text */
  rawMrzString: string;

  /** The document code from MRZ */
  documentCode: string;

  /** The document issuer from MRZ */
  issuer: string;

  /** The document number from MRZ */
  documentNumber: string;

  /** The first optional data field from MRZ */
  opt1: string;

  /** The second optional data field from MRZ */
  opt2: string;

  /** The gender/sex from MRZ */
  gender: string;

  /** The nationality code from MRZ */
  nationality: string;

  /** The primary identifier from MRZ */
  primaryId: string;

  /** The secondary identifier from MRZ */
  secondaryId: string;

  /** The full name of the issuing authority */
  issuerName: string;

  /** The full nationality name */
  nationalityName: string;

  /** Whether all check digits are valid */
  verified: boolean;

  /** The date of birth from MRZ */
  dateOfBirth: DateResult<string>;

  /** The date of expiry from MRZ */
  dateOfExpiry: DateResult<string>;

  /** The type of the document */
  documentType: MrzDocumentType;

  /** The opt1 field without padding characters */
  sanitizedOpt1: string;

  /** The opt2 field without padding characters */
  sanitizedOpt2: string;

  /** The nationality code without padding characters */
  sanitizedNationality: string;

  /** The issuer code without padding characters */
  sanitizedIssuer: string;

  /** The document code without padding characters */
  sanitizedDocumentCode: string;

  /** The document number without padding characters */
  sanitizedDocumentNumber: string;
};
