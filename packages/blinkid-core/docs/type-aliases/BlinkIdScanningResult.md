[**@microblink/blinkid-core**](../README.md)

***

[@microblink/blinkid-core](../README.md) / BlinkIdScanningResult

# Type Alias: BlinkIdScanningResult

> **BlinkIdScanningResult** = `object`

Represents the final complete result of the scanning process.

## Properties

### additionalAddressInformation?

> `optional` **additionalAddressInformation**: [`StringResult`](StringResult.md)

The additional address information of the document owner

***

### additionalNameInformation?

> `optional` **additionalNameInformation**: [`StringResult`](StringResult.md)

The additional name information of the document owner

***

### additionalOptionalAddressInformation?

> `optional` **additionalOptionalAddressInformation**: [`StringResult`](StringResult.md)

Additional optional address information of the document owner

***

### additionalPersonalIdNumber?

> `optional` **additionalPersonalIdNumber**: [`StringResult`](StringResult.md)

The additional personal identification number

***

### address?

> `optional` **address**: [`StringResult`](StringResult.md)

The address of the document owner

***

### bloodType?

> `optional` **bloodType**: [`StringResult`](StringResult.md)

The blood type of the document owner

***

### certificateNumber?

> `optional` **certificateNumber**: [`StringResult`](StringResult.md)

The certificate number of the document owner

***

### countryCode?

> `optional` **countryCode**: [`StringResult`](StringResult.md)

The country code of the document owner

***

### dataMatchResult?

> `optional` **dataMatchResult**: [`DataMatchResult`](DataMatchResult.md)

Info on whether the data extracted from multiple sides matches

***

### dateOfBirth?

> `optional` **dateOfBirth**: [`DateResult`](DateResult.md)\<[`StringResult`](StringResult.md)\>

The date of birth of the document owner

***

### dateOfEntry?

> `optional` **dateOfEntry**: [`DateResult`](DateResult.md)\<[`StringResult`](StringResult.md)\>

The date of entry of the document owner

***

### dateOfExpiry?

> `optional` **dateOfExpiry**: [`DateResult`](DateResult.md)\<[`StringResult`](StringResult.md)\>

The date of expiry of the document

***

### dateOfExpiryPermanent?

> `optional` **dateOfExpiryPermanent**: `boolean`

Determines if date of expiry is permanent

***

### dateOfIssue?

> `optional` **dateOfIssue**: [`DateResult`](DateResult.md)\<[`StringResult`](StringResult.md)\>

The date of issue of the document

***

### dependentsInfo?

> `optional` **dependentsInfo**: [`DependentInfo`](DependentInfo.md)[]

The dependents info

***

### documentAdditionalNumber?

> `optional` **documentAdditionalNumber**: [`StringResult`](StringResult.md)

The additional number of the document

***

### documentClassInfo

> **documentClassInfo**: [`DocumentClassInfo`](DocumentClassInfo.md)

The document class information

***

### documentNumber?

> `optional` **documentNumber**: [`StringResult`](StringResult.md)

The document number

***

### documentOptionalAdditionalNumber?

> `optional` **documentOptionalAdditionalNumber**: [`StringResult`](StringResult.md)

Additional optional number of the document

***

### documentSubtype?

> `optional` **documentSubtype**: [`StringResult`](StringResult.md)

The document subtype transcription

***

### driverLicenseDetailedInfo?

> `optional` **driverLicenseDetailedInfo**: [`DriverLicenceDetailedInfo`](DriverLicenceDetailedInfo.md)\<[`StringResult`](StringResult.md)\>

The driver license detailed info

***

### eligibilityCategory?

> `optional` **eligibilityCategory**: [`StringResult`](StringResult.md)

The eligibility category

***

### employer?

> `optional` **employer**: [`StringResult`](StringResult.md)

The employer of the document owner

***

### fathersName?

> `optional` **fathersName**: [`StringResult`](StringResult.md)

The father's name of the document owner

***

### firstName?

> `optional` **firstName**: [`StringResult`](StringResult.md)

The first name of the document owner

***

### fullName?

> `optional` **fullName**: [`StringResult`](StringResult.md)

The full name of the document owner

***

### issuingAuthority?

> `optional` **issuingAuthority**: [`StringResult`](StringResult.md)

The issuing authority of the document

***

### lastName?

> `optional` **lastName**: [`StringResult`](StringResult.md)

The last name of the document owner

***

### localityCode?

> `optional` **localityCode**: [`StringResult`](StringResult.md)

The locality code of the document owner

***

### localizedName?

> `optional` **localizedName**: [`StringResult`](StringResult.md)

The localized name of the document owner

***

### maidenName?

> `optional` **maidenName**: [`StringResult`](StringResult.md)

The maiden name of the document owner

***

### manufacturingYear?

> `optional` **manufacturingYear**: [`StringResult`](StringResult.md)

The manufacturing year

***

### maritalStatus?

> `optional` **maritalStatus**: [`StringResult`](StringResult.md)

The marital status of the document owner

***

### mode?

> `optional` **mode**: [`RecognitionMode`](RecognitionMode.md)

Scanning mode used to scan current document

***

### mothersName?

> `optional` **mothersName**: [`StringResult`](StringResult.md)

The mother's name of the document owner

***

### municipalityCode?

> `optional` **municipalityCode**: [`StringResult`](StringResult.md)

The municipality code of the document owner

***

### municipalityOfRegistration?

> `optional` **municipalityOfRegistration**: [`StringResult`](StringResult.md)

The municipality of registration of the document owner

***

### nationalInsuranceNumber?

> `optional` **nationalInsuranceNumber**: [`StringResult`](StringResult.md)

The national insurance number of the document owner

***

### nationality?

> `optional` **nationality**: [`StringResult`](StringResult.md)

The nationality of the document owner

***

### personalIdNumber?

> `optional` **personalIdNumber**: [`StringResult`](StringResult.md)

The personal identification number

***

### placeOfBirth?

> `optional` **placeOfBirth**: [`StringResult`](StringResult.md)

The place of birth of the document owner

***

### pollingStationCode?

> `optional` **pollingStationCode**: [`StringResult`](StringResult.md)

The polling station code of the document owner

***

### profession?

> `optional` **profession**: [`StringResult`](StringResult.md)

The profession of the document owner

***

### race?

> `optional` **race**: [`StringResult`](StringResult.md)

The race of the document owner

***

### registrationCenterCode?

> `optional` **registrationCenterCode**: [`StringResult`](StringResult.md)

The registration center code of the document owner

***

### religion?

> `optional` **religion**: [`StringResult`](StringResult.md)

The religion of the document owner

***

### remarks?

> `optional` **remarks**: [`StringResult`](StringResult.md)

The remarks on the residence permit

***

### residencePermitType?

> `optional` **residencePermitType**: [`StringResult`](StringResult.md)

The residence permit type

***

### residentialStatus?

> `optional` **residentialStatus**: [`StringResult`](StringResult.md)

The residential status of the document owner

***

### sectionCode?

> `optional` **sectionCode**: [`StringResult`](StringResult.md)

The section code of the document owner

***

### sex?

> `optional` **sex**: [`StringResult`](StringResult.md)

The sex of the document owner

***

### specificDocumentValidity?

> `optional` **specificDocumentValidity**: [`StringResult`](StringResult.md)

The specific document validity

***

### sponsor?

> `optional` **sponsor**: [`StringResult`](StringResult.md)

The sponsor of the document owner.

***

### stateCode?

> `optional` **stateCode**: [`StringResult`](StringResult.md)

The state code of the document owner

***

### stateName?

> `optional` **stateName**: [`StringResult`](StringResult.md)

The state of the document owner

***

### subResults

> **subResults**: [`SingleSideScanningResult`](SingleSideScanningResult.md)[]

The results of scanning each side of the document

***

### vehicleOwner?

> `optional` **vehicleOwner**: [`StringResult`](StringResult.md)

The vehicle owner

***

### vehicleType?

> `optional` **vehicleType**: [`StringResult`](StringResult.md)

The vehicle type

***

### visaType?

> `optional` **visaType**: [`StringResult`](StringResult.md)

The visa type of the document
