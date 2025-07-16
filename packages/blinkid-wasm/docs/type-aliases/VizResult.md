[**@microblink/blinkid-wasm**](../README.md)

***

[@microblink/blinkid-wasm](../README.md) / VizResult

# Type Alias: VizResult

> **VizResult** = `object`

Defined in: [result/viz/VizResult.ts:10](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/viz/VizResult.ts)

VizResult contains data extracted from the Visual Inspection Zone.

## Properties

### additionalAddressInformation?

> `optional` **additionalAddressInformation**: [`StringResult`](StringResult.md)

Defined in: [result/viz/VizResult.ts:29](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/viz/VizResult.ts)

The additional address information of the document owner

***

### additionalNameInformation?

> `optional` **additionalNameInformation**: [`StringResult`](StringResult.md)

Defined in: [result/viz/VizResult.ts:18](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/viz/VizResult.ts)

The additional name information of the document owner

***

### additionalOptionalAddressInformation?

> `optional` **additionalOptionalAddressInformation**: [`StringResult`](StringResult.md)

Defined in: [result/viz/VizResult.ts:31](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/viz/VizResult.ts)

Additional optional address information of the document owner

***

### additionalPersonalIdNumber?

> `optional` **additionalPersonalIdNumber**: [`StringResult`](StringResult.md)

Defined in: [result/viz/VizResult.ts:74](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/viz/VizResult.ts)

The additional personal identification number

***

### address?

> `optional` **address**: [`StringResult`](StringResult.md)

Defined in: [result/viz/VizResult.ts:27](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/viz/VizResult.ts)

The address of the document owner

***

### bloodType?

> `optional` **bloodType**: [`StringResult`](StringResult.md)

Defined in: [result/viz/VizResult.ts:54](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/viz/VizResult.ts)

The blood type of the document owner

***

### certificateNumber?

> `optional` **certificateNumber**: [`StringResult`](StringResult.md)

Defined in: [result/viz/VizResult.ts:101](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/viz/VizResult.ts)

The certificate number of the document owner

***

### countryCode?

> `optional` **countryCode**: [`StringResult`](StringResult.md)

Defined in: [result/viz/VizResult.ts:103](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/viz/VizResult.ts)

The country code of the document owner

***

### dateOfBirth?

> `optional` **dateOfBirth**: [`DateResult`](DateResult.md)\<[`StringResult`](StringResult.md)\>

Defined in: [result/viz/VizResult.ts:57](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/viz/VizResult.ts)

The date of birth of the document owner

***

### dateOfExpiry?

> `optional` **dateOfExpiry**: [`DateResult`](DateResult.md)\<[`StringResult`](StringResult.md)\>

Defined in: [result/viz/VizResult.ts:61](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/viz/VizResult.ts)

The date of expiry of the document

***

### dateOfExpiryPermanent?

> `optional` **dateOfExpiryPermanent**: `boolean`

Defined in: [result/viz/VizResult.ts:63](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/viz/VizResult.ts)

Determines if date of expiry is permanent

***

### dateOfIssue?

> `optional` **dateOfIssue**: [`DateResult`](DateResult.md)\<[`StringResult`](StringResult.md)\>

Defined in: [result/viz/VizResult.ts:59](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/viz/VizResult.ts)

The date of issue of the document

***

### dependentsInfo?

> `optional` **dependentsInfo**: [`DependentInfo`](DependentInfo.md)[]

Defined in: [result/viz/VizResult.ts:97](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/viz/VizResult.ts)

The dependents info

***

### documentAdditionalNumber?

> `optional` **documentAdditionalNumber**: [`StringResult`](StringResult.md)

Defined in: [result/viz/VizResult.ts:70](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/viz/VizResult.ts)

The additional number of the document

***

### documentNumber?

> `optional` **documentNumber**: [`StringResult`](StringResult.md)

Defined in: [result/viz/VizResult.ts:66](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/viz/VizResult.ts)

The document number

***

### documentOptionalAdditionalNumber?

> `optional` **documentOptionalAdditionalNumber**: [`StringResult`](StringResult.md)

Defined in: [result/viz/VizResult.ts:72](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/viz/VizResult.ts)

Additional optional number of the document

***

### documentSubtype?

> `optional` **documentSubtype**: [`StringResult`](StringResult.md)

Defined in: [result/viz/VizResult.ts:83](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/viz/VizResult.ts)

The transcription of the document subtype

***

### driverLicenseDetailedInfo?

> `optional` **driverLicenseDetailedInfo**: [`DriverLicenceDetailedInfo`](DriverLicenceDetailedInfo.md)\<[`StringResult`](StringResult.md)\>

Defined in: [result/viz/VizResult.ts:80](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/viz/VizResult.ts)

The driver license detailed info

***

### eligibilityCategory?

> `optional` **eligibilityCategory**: [`StringResult`](StringResult.md)

Defined in: [result/viz/VizResult.ts:93](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/viz/VizResult.ts)

The eligibility category

***

### employer?

> `optional` **employer**: [`StringResult`](StringResult.md)

Defined in: [result/viz/VizResult.ts:48](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/viz/VizResult.ts)

The employer of the document owner

***

### fathersName?

> `optional` **fathersName**: [`StringResult`](StringResult.md)

Defined in: [result/viz/VizResult.ts:22](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/viz/VizResult.ts)

The father's name of the document owner

***

### firstName?

> `optional` **firstName**: [`StringResult`](StringResult.md)

Defined in: [result/viz/VizResult.ts:12](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/viz/VizResult.ts)

The first name of the document owner

***

### fullName?

> `optional` **fullName**: [`StringResult`](StringResult.md)

Defined in: [result/viz/VizResult.ts:16](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/viz/VizResult.ts)

The full name of the document owner

***

### issuingAuthority?

> `optional` **issuingAuthority**: [`StringResult`](StringResult.md)

Defined in: [result/viz/VizResult.ts:76](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/viz/VizResult.ts)

The issuing authority of the document

***

### lastName?

> `optional` **lastName**: [`StringResult`](StringResult.md)

Defined in: [result/viz/VizResult.ts:14](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/viz/VizResult.ts)

The last name of the document owner

***

### localizedName?

> `optional` **localizedName**: [`StringResult`](StringResult.md)

Defined in: [result/viz/VizResult.ts:20](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/viz/VizResult.ts)

The localized name of the document owner

***

### manufacturingYear?

> `optional` **manufacturingYear**: [`StringResult`](StringResult.md)

Defined in: [result/viz/VizResult.ts:89](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/viz/VizResult.ts)

The manufacturing year

***

### maritalStatus?

> `optional` **maritalStatus**: [`StringResult`](StringResult.md)

Defined in: [result/viz/VizResult.ts:44](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/viz/VizResult.ts)

The marital status of the document owner

***

### mothersName?

> `optional` **mothersName**: [`StringResult`](StringResult.md)

Defined in: [result/viz/VizResult.ts:24](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/viz/VizResult.ts)

The mother's name of the document owner

***

### nationalInsuranceNumber?

> `optional` **nationalInsuranceNumber**: [`StringResult`](StringResult.md)

Defined in: [result/viz/VizResult.ts:105](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/viz/VizResult.ts)

The national insurance number of the document owner

***

### nationality?

> `optional` **nationality**: [`StringResult`](StringResult.md)

Defined in: [result/viz/VizResult.ts:35](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/viz/VizResult.ts)

The nationality of the document owner

***

### personalIdNumber?

> `optional` **personalIdNumber**: [`StringResult`](StringResult.md)

Defined in: [result/viz/VizResult.ts:68](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/viz/VizResult.ts)

The personal identification number

***

### placeOfBirth?

> `optional` **placeOfBirth**: [`StringResult`](StringResult.md)

Defined in: [result/viz/VizResult.ts:33](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/viz/VizResult.ts)

The place of birth of the document owner

***

### profession?

> `optional` **profession**: [`StringResult`](StringResult.md)

Defined in: [result/viz/VizResult.ts:42](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/viz/VizResult.ts)

The profession of the document owner

***

### race?

> `optional` **race**: [`StringResult`](StringResult.md)

Defined in: [result/viz/VizResult.ts:38](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/viz/VizResult.ts)

The race of the document owner

***

### religion?

> `optional` **religion**: [`StringResult`](StringResult.md)

Defined in: [result/viz/VizResult.ts:40](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/viz/VizResult.ts)

The religion of the document owner

***

### remarks?

> `optional` **remarks**: [`StringResult`](StringResult.md)

Defined in: [result/viz/VizResult.ts:85](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/viz/VizResult.ts)

The remarks on the residence permit

***

### residencePermitType?

> `optional` **residencePermitType**: [`StringResult`](StringResult.md)

Defined in: [result/viz/VizResult.ts:87](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/viz/VizResult.ts)

The residence permit type

***

### residentialStatus?

> `optional` **residentialStatus**: [`StringResult`](StringResult.md)

Defined in: [result/viz/VizResult.ts:46](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/viz/VizResult.ts)

The residential status of the document owner

***

### sex?

> `optional` **sex**: [`StringResult`](StringResult.md)

Defined in: [result/viz/VizResult.ts:50](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/viz/VizResult.ts)

The sex of the document owner

***

### specificDocumentValidity?

> `optional` **specificDocumentValidity**: [`StringResult`](StringResult.md)

Defined in: [result/viz/VizResult.ts:95](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/viz/VizResult.ts)

The specific document validity

***

### sponsor?

> `optional` **sponsor**: [`StringResult`](StringResult.md)

Defined in: [result/viz/VizResult.ts:52](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/viz/VizResult.ts)

The sponsor of the document owner

***

### vehicleOwner?

> `optional` **vehicleOwner**: [`StringResult`](StringResult.md)

Defined in: [result/viz/VizResult.ts:99](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/viz/VizResult.ts)

The vehicle owner

***

### vehicleType?

> `optional` **vehicleType**: [`StringResult`](StringResult.md)

Defined in: [result/viz/VizResult.ts:91](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/viz/VizResult.ts)

The vehicle type

***

### visaType?

> `optional` **visaType**: [`StringResult`](StringResult.md)

Defined in: [result/viz/VizResult.ts:78](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/viz/VizResult.ts)

The visa type of the document
