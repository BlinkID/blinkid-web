[**@microblink/blinkid**](../README.md)

***

[@microblink/blinkid](../README.md) / BarcodeResult

# Type Alias: BarcodeResult

> **BarcodeResult** = `object`

Contains data extracted from the barcode

- In case of uncertain results, some of the properties may not be available.
  Their values will be set to `BARCODE_FIELD_UNREADABLE`

## Properties

### additionalNameInformation

> **additionalNameInformation**: `string`

The additional name information of the document owner.

***

### address

> **address**: `string`

The address of the document owner.

***

### addressDetailedInfo

> **addressDetailedInfo**: [`AddressDetailedInfo`](AddressDetailedInfo.md)

The details about the address of the document owner.

***

### barcodeData

> **barcodeData**: [`BarcodeData`](BarcodeData.md)

The raw, unparsed barcode data.

***

### dateOfBirth

> **dateOfBirth**: [`DateResult`](DateResult.md)\<`string`\>

The date of birth of the document owner.

***

### dateOfExpiry

> **dateOfExpiry**: [`DateResult`](DateResult.md)\<`string`\>

The date of expiry of the document.

***

### dateOfIssue

> **dateOfIssue**: [`DateResult`](DateResult.md)\<`string`\>

The date of issue of the document.

***

### documentAdditionalNumber

> **documentAdditionalNumber**: `string`

The additional number of the document.

***

### documentNumber

> **documentNumber**: `string`

The document number.

***

### driverLicenseDetailedInfo

> **driverLicenseDetailedInfo**: [`DriverLicenceDetailedInfo`](DriverLicenceDetailedInfo.md)\<`string`\>

The driver license detailed info.

***

### employer

> **employer**: `string`

The employer of the document owner.

***

### extendedElements

> **extendedElements**: [`BarcodeElement`](BarcodeElement.md)[]

Document specific extended elements that contain all barcode fields

***

### firstName

> **firstName**: `string`

The first name of the document owner.

***

### fullName

> **fullName**: `string`

The full name of the document owner.

***

### issuingAuthority

> **issuingAuthority**: `string`

The issuing authority of the document.

***

### lastName

> **lastName**: `string`

The last name of the document owner.

***

### maritalStatus

> **maritalStatus**: `string`

The marital status of the document owner.

***

### middleName

> **middleName**: `string`

The middle name of the document owner.

***

### nationality

> **nationality**: `string`

The nationality of the document owner.

***

### parsed

> **parsed**: `boolean`

Whether the raw barcode data was successfully parsed into structured information.

***

### personalIdNumber

> **personalIdNumber**: `string`

The personal identification number.

***

### placeOfBirth

> **placeOfBirth**: `string`

The place of birth of the document owner.

***

### profession

> **profession**: `string`

The profession of the document owner.

***

### race

> **race**: `string`

The race of the document owner.

***

### religion

> **religion**: `string`

The religion of the document owner.

***

### residentialStatus

> **residentialStatus**: `string`

The residential status of the document owner.

***

### sex

> **sex**: `string`

The sex of the document owner.
