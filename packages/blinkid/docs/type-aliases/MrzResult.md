[**@microblink/blinkid**](../README.md)

***

[@microblink/blinkid](../README.md) / MrzResult

# Type Alias: MrzResult

> **MrzResult** = `object`

Result of Machine Readable Zone extraction

## Properties

### dateOfBirth

> **dateOfBirth**: [`DateResult`](DateResult.md)\<`string`\>

The date of birth from MRZ

***

### dateOfExpiry

> **dateOfExpiry**: [`DateResult`](DateResult.md)\<`string`\>

The date of expiry from MRZ

***

### documentCode

> **documentCode**: `string`

The document code from MRZ

***

### documentNumber

> **documentNumber**: `string`

The document number from MRZ

***

### documentType

> **documentType**: [`MrzDocumentType`](MrzDocumentType.md)

The type of the document

***

### gender

> **gender**: `string`

The gender/sex from MRZ

***

### issuer

> **issuer**: `string`

The document issuer from MRZ

***

### issuerName

> **issuerName**: `string`

The full name of the issuing authority

***

### nationality

> **nationality**: `string`

The nationality code from MRZ

***

### nationalityName

> **nationalityName**: `string`

The full nationality name

***

### opt1

> **opt1**: `string`

The first optional data field from MRZ

***

### opt2

> **opt2**: `string`

The second optional data field from MRZ

***

### primaryId

> **primaryId**: `string`

The primary identifier from MRZ

***

### rawMrzString

> **rawMrzString**: `string`

The entire Machine Readable Zone text

***

### sanitizedDocumentCode

> **sanitizedDocumentCode**: `string`

The document code without padding characters

***

### sanitizedDocumentNumber

> **sanitizedDocumentNumber**: `string`

The document number without padding characters

***

### sanitizedIssuer

> **sanitizedIssuer**: `string`

The issuer code without padding characters

***

### sanitizedNationality

> **sanitizedNationality**: `string`

The nationality code without padding characters

***

### sanitizedOpt1

> **sanitizedOpt1**: `string`

The opt1 field without padding characters

***

### sanitizedOpt2

> **sanitizedOpt2**: `string`

The opt2 field without padding characters

***

### secondaryId

> **secondaryId**: `string`

The secondary identifier from MRZ

***

### verified

> **verified**: `boolean`

Whether all check digits are valid
