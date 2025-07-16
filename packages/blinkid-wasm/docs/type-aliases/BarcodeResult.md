[**@microblink/blinkid-wasm**](../README.md)

***

[@microblink/blinkid-wasm](../README.md) / BarcodeResult

# Type Alias: BarcodeResult

> **BarcodeResult** = `object`

Defined in: [result/barcode/BarcodeResult.ts:30](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/barcode/BarcodeResult.ts)

Contains data extracted from the barcode

- In case of uncertain results, some of the properties may not be available.
  Their values will be set to `BARCODE_FIELD_UNREADABLE`

## Properties

### additionalNameInformation

> **additionalNameInformation**: `string`

Defined in: [result/barcode/BarcodeResult.ts:43](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/barcode/BarcodeResult.ts)

The additional name information of the document owner.

***

### address

> **address**: `string`

Defined in: [result/barcode/BarcodeResult.ts:46](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/barcode/BarcodeResult.ts)

The address of the document owner.

***

### addressDetailedInfo

> **addressDetailedInfo**: [`AddressDetailedInfo`](AddressDetailedInfo.md)

Defined in: [result/barcode/BarcodeResult.ts:84](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/barcode/BarcodeResult.ts)

The details about the address of the document owner.

***

### barcodeData

> **barcodeData**: [`BarcodeData`](BarcodeData.md)

Defined in: [result/barcode/BarcodeResult.ts:32](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/barcode/BarcodeResult.ts)

The raw, unparsed barcode data.

***

### dateOfBirth

> **dateOfBirth**: [`DateResult`](DateResult.md)\<`string`\>

Defined in: [result/barcode/BarcodeResult.ts:68](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/barcode/BarcodeResult.ts)

The date of birth of the document owner.

***

### dateOfExpiry

> **dateOfExpiry**: [`DateResult`](DateResult.md)\<`string`\>

Defined in: [result/barcode/BarcodeResult.ts:72](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/barcode/BarcodeResult.ts)

The date of expiry of the document.

***

### dateOfIssue

> **dateOfIssue**: [`DateResult`](DateResult.md)\<`string`\>

Defined in: [result/barcode/BarcodeResult.ts:70](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/barcode/BarcodeResult.ts)

The date of issue of the document.

***

### documentAdditionalNumber

> **documentAdditionalNumber**: `string`

Defined in: [result/barcode/BarcodeResult.ts:79](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/barcode/BarcodeResult.ts)

The additional number of the document.

***

### documentNumber

> **documentNumber**: `string`

Defined in: [result/barcode/BarcodeResult.ts:75](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/barcode/BarcodeResult.ts)

The document number.

***

### driverLicenseDetailedInfo

> **driverLicenseDetailedInfo**: [`DriverLicenceDetailedInfo`](DriverLicenceDetailedInfo.md)\<`string`\>

Defined in: [result/barcode/BarcodeResult.ts:87](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/barcode/BarcodeResult.ts)

The driver license detailed info.

***

### employer

> **employer**: `string`

Defined in: [result/barcode/BarcodeResult.ts:63](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/barcode/BarcodeResult.ts)

The employer of the document owner.

***

### extendedElements

> **extendedElements**: [`BarcodeElement`](BarcodeElement.md)[]

Defined in: [result/barcode/BarcodeResult.ts:90](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/barcode/BarcodeResult.ts)

Document specific extended elements that contain all barcode fields

***

### firstName

> **firstName**: `string`

Defined in: [result/barcode/BarcodeResult.ts:35](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/barcode/BarcodeResult.ts)

The first name of the document owner.

***

### fullName

> **fullName**: `string`

Defined in: [result/barcode/BarcodeResult.ts:41](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/barcode/BarcodeResult.ts)

The full name of the document owner.

***

### issuingAuthority

> **issuingAuthority**: `string`

Defined in: [result/barcode/BarcodeResult.ts:81](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/barcode/BarcodeResult.ts)

The issuing authority of the document.

***

### lastName

> **lastName**: `string`

Defined in: [result/barcode/BarcodeResult.ts:39](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/barcode/BarcodeResult.ts)

The last name of the document owner.

***

### maritalStatus

> **maritalStatus**: `string`

Defined in: [result/barcode/BarcodeResult.ts:59](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/barcode/BarcodeResult.ts)

The marital status of the document owner.

***

### middleName

> **middleName**: `string`

Defined in: [result/barcode/BarcodeResult.ts:37](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/barcode/BarcodeResult.ts)

The middle name of the document owner.

***

### nationality

> **nationality**: `string`

Defined in: [result/barcode/BarcodeResult.ts:50](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/barcode/BarcodeResult.ts)

The nationality of the document owner.

***

### personalIdNumber

> **personalIdNumber**: `string`

Defined in: [result/barcode/BarcodeResult.ts:77](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/barcode/BarcodeResult.ts)

The personal identification number.

***

### placeOfBirth

> **placeOfBirth**: `string`

Defined in: [result/barcode/BarcodeResult.ts:48](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/barcode/BarcodeResult.ts)

The place of birth of the document owner.

***

### profession

> **profession**: `string`

Defined in: [result/barcode/BarcodeResult.ts:57](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/barcode/BarcodeResult.ts)

The profession of the document owner.

***

### race

> **race**: `string`

Defined in: [result/barcode/BarcodeResult.ts:53](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/barcode/BarcodeResult.ts)

The race of the document owner.

***

### religion

> **religion**: `string`

Defined in: [result/barcode/BarcodeResult.ts:55](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/barcode/BarcodeResult.ts)

The religion of the document owner.

***

### residentialStatus

> **residentialStatus**: `string`

Defined in: [result/barcode/BarcodeResult.ts:61](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/barcode/BarcodeResult.ts)

The residential status of the document owner.

***

### sex

> **sex**: `string`

Defined in: [result/barcode/BarcodeResult.ts:65](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/barcode/BarcodeResult.ts)

The sex of the document owner.
