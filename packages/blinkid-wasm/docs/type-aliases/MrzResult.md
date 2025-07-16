[**@microblink/blinkid-wasm**](../README.md)

***

[@microblink/blinkid-wasm](../README.md) / MrzResult

# Type Alias: MrzResult

> **MrzResult** = `object`

Defined in: [result/mrz/MrzResult.ts:21](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/mrz/MrzResult.ts)

Result of Machine Readable Zone extraction

## Properties

### dateOfBirth

> **dateOfBirth**: [`DateResult`](DateResult.md)\<`string`\>

Defined in: [result/mrz/MrzResult.ts:62](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/mrz/MrzResult.ts)

The date of birth from MRZ

***

### dateOfExpiry

> **dateOfExpiry**: [`DateResult`](DateResult.md)\<`string`\>

Defined in: [result/mrz/MrzResult.ts:65](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/mrz/MrzResult.ts)

The date of expiry from MRZ

***

### documentCode

> **documentCode**: `string`

Defined in: [result/mrz/MrzResult.ts:26](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/mrz/MrzResult.ts)

The document code from MRZ

***

### documentNumber

> **documentNumber**: `string`

Defined in: [result/mrz/MrzResult.ts:32](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/mrz/MrzResult.ts)

The document number from MRZ

***

### documentType

> **documentType**: [`MrzDocumentType`](MrzDocumentType.md)

Defined in: [result/mrz/MrzResult.ts:68](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/mrz/MrzResult.ts)

The type of the document

***

### gender

> **gender**: `string`

Defined in: [result/mrz/MrzResult.ts:41](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/mrz/MrzResult.ts)

The gender/sex from MRZ

***

### issuer

> **issuer**: `string`

Defined in: [result/mrz/MrzResult.ts:29](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/mrz/MrzResult.ts)

The document issuer from MRZ

***

### issuerName

> **issuerName**: `string`

Defined in: [result/mrz/MrzResult.ts:53](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/mrz/MrzResult.ts)

The full name of the issuing authority

***

### nationality

> **nationality**: `string`

Defined in: [result/mrz/MrzResult.ts:44](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/mrz/MrzResult.ts)

The nationality code from MRZ

***

### nationalityName

> **nationalityName**: `string`

Defined in: [result/mrz/MrzResult.ts:56](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/mrz/MrzResult.ts)

The full nationality name

***

### opt1

> **opt1**: `string`

Defined in: [result/mrz/MrzResult.ts:35](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/mrz/MrzResult.ts)

The first optional data field from MRZ

***

### opt2

> **opt2**: `string`

Defined in: [result/mrz/MrzResult.ts:38](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/mrz/MrzResult.ts)

The second optional data field from MRZ

***

### primaryId

> **primaryId**: `string`

Defined in: [result/mrz/MrzResult.ts:47](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/mrz/MrzResult.ts)

The primary identifier from MRZ

***

### rawMrzString

> **rawMrzString**: `string`

Defined in: [result/mrz/MrzResult.ts:23](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/mrz/MrzResult.ts)

The entire Machine Readable Zone text

***

### sanitizedDocumentCode

> **sanitizedDocumentCode**: `string`

Defined in: [result/mrz/MrzResult.ts:83](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/mrz/MrzResult.ts)

The document code without padding characters

***

### sanitizedDocumentNumber

> **sanitizedDocumentNumber**: `string`

Defined in: [result/mrz/MrzResult.ts:86](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/mrz/MrzResult.ts)

The document number without padding characters

***

### sanitizedIssuer

> **sanitizedIssuer**: `string`

Defined in: [result/mrz/MrzResult.ts:80](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/mrz/MrzResult.ts)

The issuer code without padding characters

***

### sanitizedNationality

> **sanitizedNationality**: `string`

Defined in: [result/mrz/MrzResult.ts:77](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/mrz/MrzResult.ts)

The nationality code without padding characters

***

### sanitizedOpt1

> **sanitizedOpt1**: `string`

Defined in: [result/mrz/MrzResult.ts:71](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/mrz/MrzResult.ts)

The opt1 field without padding characters

***

### sanitizedOpt2

> **sanitizedOpt2**: `string`

Defined in: [result/mrz/MrzResult.ts:74](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/mrz/MrzResult.ts)

The opt2 field without padding characters

***

### secondaryId

> **secondaryId**: `string`

Defined in: [result/mrz/MrzResult.ts:50](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/mrz/MrzResult.ts)

The secondary identifier from MRZ

***

### verified

> **verified**: `boolean`

Defined in: [result/mrz/MrzResult.ts:59](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/mrz/MrzResult.ts)

Whether all check digits are valid
