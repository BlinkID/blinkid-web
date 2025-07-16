[**@microblink/blinkid-wasm**](../README.md)

***

[@microblink/blinkid-wasm](../README.md) / BlinkIdScanningResult

# Type Alias: BlinkIdScanningResult

> **BlinkIdScanningResult** = `object`

Defined in: [session/BlinkIdScanningResult.ts:16](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/session/BlinkIdScanningResult.ts)

Represents the final complete result of the scanning process.

## Properties

### additionalAddressInformation?

> `optional` **additionalAddressInformation**: [`StringResult`](StringResult.md)

Defined in: [session/BlinkIdScanningResult.ts:43](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/session/BlinkIdScanningResult.ts)

The additional address information of the document owner

***

### additionalNameInformation?

> `optional` **additionalNameInformation**: [`StringResult`](StringResult.md)

Defined in: [session/BlinkIdScanningResult.ts:33](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/session/BlinkIdScanningResult.ts)

The additional name information of the document owner

***

### additionalOptionalAddressInformation?

> `optional` **additionalOptionalAddressInformation**: [`StringResult`](StringResult.md)

Defined in: [session/BlinkIdScanningResult.ts:45](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/session/BlinkIdScanningResult.ts)

Additional optional address information of the document owner

***

### additionalPersonalIdNumber?

> `optional` **additionalPersonalIdNumber**: [`StringResult`](StringResult.md)

Defined in: [session/BlinkIdScanningResult.ts:77](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/session/BlinkIdScanningResult.ts)

The additional personal identification number

***

### address?

> `optional` **address**: [`StringResult`](StringResult.md)

Defined in: [session/BlinkIdScanningResult.ts:41](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/session/BlinkIdScanningResult.ts)

The address of the document owner

***

### bloodType?

> `optional` **bloodType**: [`StringResult`](StringResult.md)

Defined in: [session/BlinkIdScanningResult.ts:67](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/session/BlinkIdScanningResult.ts)

The blood type of the document owner

***

### certificateNumber?

> `optional` **certificateNumber**: [`StringResult`](StringResult.md)

Defined in: [session/BlinkIdScanningResult.ts:99](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/session/BlinkIdScanningResult.ts)

The certificate number of the document owner

***

### countryCode?

> `optional` **countryCode**: [`StringResult`](StringResult.md)

Defined in: [session/BlinkIdScanningResult.ts:101](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/session/BlinkIdScanningResult.ts)

The country code of the document owner

***

### dataMatchResult?

> `optional` **dataMatchResult**: [`DataMatchResult`](DataMatchResult.md)

Defined in: [session/BlinkIdScanningResult.ts:24](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/session/BlinkIdScanningResult.ts)

Info on whether the data extracted from multiple sides matches

***

### dateOfBirth?

> `optional` **dateOfBirth**: [`DateResult`](DateResult.md)\<[`StringResult`](StringResult.md)\>

Defined in: [session/BlinkIdScanningResult.ts:106](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/session/BlinkIdScanningResult.ts)

The date of birth of the document owner

***

### dateOfExpiry?

> `optional` **dateOfExpiry**: [`DateResult`](DateResult.md)\<[`StringResult`](StringResult.md)\>

Defined in: [session/BlinkIdScanningResult.ts:110](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/session/BlinkIdScanningResult.ts)

The date of expiry of the document

***

### dateOfExpiryPermanent?

> `optional` **dateOfExpiryPermanent**: `boolean`

Defined in: [session/BlinkIdScanningResult.ts:112](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/session/BlinkIdScanningResult.ts)

Determines if date of expiry is permanent

***

### dateOfIssue?

> `optional` **dateOfIssue**: [`DateResult`](DateResult.md)\<[`StringResult`](StringResult.md)\>

Defined in: [session/BlinkIdScanningResult.ts:108](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/session/BlinkIdScanningResult.ts)

The date of issue of the document

***

### dependentsInfo?

> `optional` **dependentsInfo**: [`DependentInfo`](DependentInfo.md)[]

Defined in: [session/BlinkIdScanningResult.ts:117](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/session/BlinkIdScanningResult.ts)

The dependents info

***

### documentAdditionalNumber?

> `optional` **documentAdditionalNumber**: [`StringResult`](StringResult.md)

Defined in: [session/BlinkIdScanningResult.ts:73](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/session/BlinkIdScanningResult.ts)

The additional number of the document

***

### documentClassInfo

> **documentClassInfo**: [`DocumentClassInfo`](DocumentClassInfo.md)

Defined in: [session/BlinkIdScanningResult.ts:21](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/session/BlinkIdScanningResult.ts)

The document class information

***

### documentNumber?

> `optional` **documentNumber**: [`StringResult`](StringResult.md)

Defined in: [session/BlinkIdScanningResult.ts:69](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/session/BlinkIdScanningResult.ts)

The document number

***

### documentOptionalAdditionalNumber?

> `optional` **documentOptionalAdditionalNumber**: [`StringResult`](StringResult.md)

Defined in: [session/BlinkIdScanningResult.ts:75](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/session/BlinkIdScanningResult.ts)

Additional optional number of the document

***

### documentSubtype?

> `optional` **documentSubtype**: [`StringResult`](StringResult.md)

Defined in: [session/BlinkIdScanningResult.ts:81](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/session/BlinkIdScanningResult.ts)

The document subtype transcription

***

### driverLicenseDetailedInfo?

> `optional` **driverLicenseDetailedInfo**: [`DriverLicenceDetailedInfo`](DriverLicenceDetailedInfo.md)\<[`StringResult`](StringResult.md)\>

Defined in: [session/BlinkIdScanningResult.ts:115](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/session/BlinkIdScanningResult.ts)

The driver license detailed info

***

### eligibilityCategory?

> `optional` **eligibilityCategory**: [`StringResult`](StringResult.md)

Defined in: [session/BlinkIdScanningResult.ts:91](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/session/BlinkIdScanningResult.ts)

The eligibility category

***

### employer?

> `optional` **employer**: [`StringResult`](StringResult.md)

Defined in: [session/BlinkIdScanningResult.ts:61](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/session/BlinkIdScanningResult.ts)

The employer of the document owner

***

### fathersName?

> `optional` **fathersName**: [`StringResult`](StringResult.md)

Defined in: [session/BlinkIdScanningResult.ts:37](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/session/BlinkIdScanningResult.ts)

The father's name of the document owner

***

### firstName?

> `optional` **firstName**: [`StringResult`](StringResult.md)

Defined in: [session/BlinkIdScanningResult.ts:27](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/session/BlinkIdScanningResult.ts)

The first name of the document owner

***

### fullName?

> `optional` **fullName**: [`StringResult`](StringResult.md)

Defined in: [session/BlinkIdScanningResult.ts:31](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/session/BlinkIdScanningResult.ts)

The full name of the document owner

***

### issuingAuthority?

> `optional` **issuingAuthority**: [`StringResult`](StringResult.md)

Defined in: [session/BlinkIdScanningResult.ts:79](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/session/BlinkIdScanningResult.ts)

The issuing authority of the document

***

### lastName?

> `optional` **lastName**: [`StringResult`](StringResult.md)

Defined in: [session/BlinkIdScanningResult.ts:29](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/session/BlinkIdScanningResult.ts)

The last name of the document owner

***

### localizedName?

> `optional` **localizedName**: [`StringResult`](StringResult.md)

Defined in: [session/BlinkIdScanningResult.ts:35](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/session/BlinkIdScanningResult.ts)

The localized name of the document owner

***

### manufacturingYear?

> `optional` **manufacturingYear**: [`StringResult`](StringResult.md)

Defined in: [session/BlinkIdScanningResult.ts:87](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/session/BlinkIdScanningResult.ts)

The manufacturing year

***

### maritalStatus?

> `optional` **maritalStatus**: [`StringResult`](StringResult.md)

Defined in: [session/BlinkIdScanningResult.ts:57](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/session/BlinkIdScanningResult.ts)

The marital status of the document owner

***

### mode?

> `optional` **mode**: [`RecognitionMode`](RecognitionMode.md)

Defined in: [session/BlinkIdScanningResult.ts:18](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/session/BlinkIdScanningResult.ts)

Scanning mode used to scan current document

***

### mothersName?

> `optional` **mothersName**: [`StringResult`](StringResult.md)

Defined in: [session/BlinkIdScanningResult.ts:39](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/session/BlinkIdScanningResult.ts)

The mother's name of the document owner

***

### nationalInsuranceNumber?

> `optional` **nationalInsuranceNumber**: [`StringResult`](StringResult.md)

Defined in: [session/BlinkIdScanningResult.ts:103](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/session/BlinkIdScanningResult.ts)

The national insurance number of the document owner

***

### nationality?

> `optional` **nationality**: [`StringResult`](StringResult.md)

Defined in: [session/BlinkIdScanningResult.ts:49](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/session/BlinkIdScanningResult.ts)

The nationality of the document owner

***

### personalIdNumber?

> `optional` **personalIdNumber**: [`StringResult`](StringResult.md)

Defined in: [session/BlinkIdScanningResult.ts:71](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/session/BlinkIdScanningResult.ts)

The personal identification number

***

### placeOfBirth?

> `optional` **placeOfBirth**: [`StringResult`](StringResult.md)

Defined in: [session/BlinkIdScanningResult.ts:47](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/session/BlinkIdScanningResult.ts)

The place of birth of the document owner

***

### profession?

> `optional` **profession**: [`StringResult`](StringResult.md)

Defined in: [session/BlinkIdScanningResult.ts:55](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/session/BlinkIdScanningResult.ts)

The profession of the document owner

***

### race?

> `optional` **race**: [`StringResult`](StringResult.md)

Defined in: [session/BlinkIdScanningResult.ts:51](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/session/BlinkIdScanningResult.ts)

The race of the document owner

***

### religion?

> `optional` **religion**: [`StringResult`](StringResult.md)

Defined in: [session/BlinkIdScanningResult.ts:53](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/session/BlinkIdScanningResult.ts)

The religion of the document owner

***

### remarks?

> `optional` **remarks**: [`StringResult`](StringResult.md)

Defined in: [session/BlinkIdScanningResult.ts:83](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/session/BlinkIdScanningResult.ts)

The remarks on the residence permit

***

### residencePermitType?

> `optional` **residencePermitType**: [`StringResult`](StringResult.md)

Defined in: [session/BlinkIdScanningResult.ts:85](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/session/BlinkIdScanningResult.ts)

The residence permit type

***

### residentialStatus?

> `optional` **residentialStatus**: [`StringResult`](StringResult.md)

Defined in: [session/BlinkIdScanningResult.ts:59](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/session/BlinkIdScanningResult.ts)

The residential status of the document owner

***

### sex?

> `optional` **sex**: [`StringResult`](StringResult.md)

Defined in: [session/BlinkIdScanningResult.ts:63](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/session/BlinkIdScanningResult.ts)

The sex of the document owner

***

### specificDocumentValidity?

> `optional` **specificDocumentValidity**: [`StringResult`](StringResult.md)

Defined in: [session/BlinkIdScanningResult.ts:93](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/session/BlinkIdScanningResult.ts)

The specific document validity

***

### sponsor?

> `optional` **sponsor**: [`StringResult`](StringResult.md)

Defined in: [session/BlinkIdScanningResult.ts:65](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/session/BlinkIdScanningResult.ts)

The sponsor of the document owner.

***

### subResults

> **subResults**: [`SingleSideScanningResult`](SingleSideScanningResult.md)[]

Defined in: [session/BlinkIdScanningResult.ts:120](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/session/BlinkIdScanningResult.ts)

The results of scanning each side of the document

***

### vehicleOwner?

> `optional` **vehicleOwner**: [`StringResult`](StringResult.md)

Defined in: [session/BlinkIdScanningResult.ts:97](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/session/BlinkIdScanningResult.ts)

The vehicle owner

***

### vehicleType?

> `optional` **vehicleType**: [`StringResult`](StringResult.md)

Defined in: [session/BlinkIdScanningResult.ts:89](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/session/BlinkIdScanningResult.ts)

The vehicle type

***

### visaType?

> `optional` **visaType**: [`StringResult`](StringResult.md)

Defined in: [session/BlinkIdScanningResult.ts:95](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/session/BlinkIdScanningResult.ts)

The visa type of the document
