/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import { DependentInfo } from "../DependentInfo";
import { StringResult } from "../StringResult";
import { DriverLicenceDetailedInfo, DateResult } from "../../utils";

/** VizResult contains data extracted from the Visual Inspection Zone. */
export type VizResult = {
  /** The first name of the document owner */
  firstName?: StringResult;
  /** The last name of the document owner */
  lastName?: StringResult;
  /** The full name of the document owner */
  fullName?: StringResult;
  /** The additional name information of the document owner */
  additionalNameInformation?: StringResult;
  /** The localized name of the document owner */
  localizedName?: StringResult;
  /** The father's name of the document owner */
  fathersName?: StringResult;
  /** The mother's name of the document owner */
  mothersName?: StringResult;

  /** The address of the document owner */
  address?: StringResult;
  /** The additional address information of the document owner */
  additionalAddressInformation?: StringResult;
  /** Additional optional address information of the document owner */
  additionalOptionalAddressInformation?: StringResult;
  /** The place of birth of the document owner */
  placeOfBirth?: StringResult;
  /** The nationality of the document owner */
  nationality?: StringResult;

  /** The race of the document owner */
  race?: StringResult;
  /** The religion of the document owner */
  religion?: StringResult;
  /** The profession of the document owner */
  profession?: StringResult;
  /** The marital status of the document owner */
  maritalStatus?: StringResult;
  /** The residential status of the document owner */
  residentialStatus?: StringResult;
  /** The employer of the document owner */
  employer?: StringResult;
  /** The sex of the document owner */
  sex?: StringResult;
  /** The sponsor of the document owner */
  sponsor?: StringResult;
  /** The blood type of the document owner */
  bloodType?: StringResult;

  /** The date of birth of the document owner */
  dateOfBirth?: DateResult<StringResult>;
  /** The date of issue of the document */
  dateOfIssue?: DateResult<StringResult>;
  /** The date of expiry of the document */
  dateOfExpiry?: DateResult<StringResult>;
  /** The date of entry of the document owner */
  dateOfEntry?: DateResult<StringResult>;
  /** Determines if date of expiry is permanent */
  dateOfExpiryPermanent?: boolean;

  /** The document number */
  documentNumber?: StringResult;
  /** The personal identification number */
  personalIdNumber?: StringResult;
  /** The additional number of the document */
  documentAdditionalNumber?: StringResult;
  /** Additional optional number of the document */
  documentOptionalAdditionalNumber?: StringResult;
  /** The additional personal identification number */
  additionalPersonalIdNumber?: StringResult;
  /** The issuing authority of the document */
  issuingAuthority?: StringResult;
  /** The visa type of the document */
  visaType?: StringResult;
  /** The driver license detailed info */
  driverLicenseDetailedInfo?: DriverLicenceDetailedInfo<StringResult>;

  /** The transcription of the document subtype */
  documentSubtype?: StringResult;
  /** The remarks on the residence permit */
  remarks?: StringResult;
  /** The residence permit type */
  residencePermitType?: StringResult;
  /** The manufacturing year */
  manufacturingYear?: StringResult;
  /** The vehicle type */
  vehicleType?: StringResult;
  /** The eligibility category */
  eligibilityCategory?: StringResult;
  /** The specific document validity */
  specificDocumentValidity?: StringResult;
  /** The dependents info */
  dependentsInfo?: DependentInfo[];
  /** The vehicle owner */
  vehicleOwner?: StringResult;
  /** The certificate number of the document owner */
  certificateNumber?: StringResult;
  /** The country code of the document owner */
  countryCode?: StringResult;
  /** The national insurance number of the document owner */
  nationalInsuranceNumber?: StringResult;
  /** The locality code of the document owner */
  localityCode?: StringResult;
  /** The maiden name of the document owner */
  maidenName?: StringResult;
  /** The municipality code of the document owner */
  municipalityCode?: StringResult;
  /** The municipality of registration of the document owner */
  municipalityOfRegistration?: StringResult;
  /** The polling station code of the document owner */
  pollingStationCode?: StringResult;
  /** The registration center code of the document owner */
  registrationCenterCode?: StringResult;
  /** The section code of the document owner */
  sectionCode?: StringResult;
  /** The state code of the document owner */
  stateCode?: StringResult;
  /** The state of the document owner */
  stateName?: StringResult;
};
