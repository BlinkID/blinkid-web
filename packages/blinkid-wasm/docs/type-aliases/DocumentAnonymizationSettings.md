[**@microblink/blinkid-wasm**](../README.md)

***

[@microblink/blinkid-wasm](../README.md) / DocumentAnonymizationSettings

# Type Alias: DocumentAnonymizationSettings

> **DocumentAnonymizationSettings** = `object`

Defined in: [settings/DocumentAnonymizationSettings.ts:24](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/settings/DocumentAnonymizationSettings.ts)

Represents the document anonymization settings.

## Properties

### documentFilter?

> `optional` **documentFilter**: [`DocumentFilter`](DocumentFilter.md)

Defined in: [settings/DocumentAnonymizationSettings.ts:26](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/settings/DocumentAnonymizationSettings.ts)

Specified fields will be anonymized if filter conditions are met.

***

### documentNumberAnonymizationSettings?

> `optional` **documentNumberAnonymizationSettings**: [`DocumentNumberAnonymizationSettings`](DocumentNumberAnonymizationSettings.md)

Defined in: [settings/DocumentAnonymizationSettings.ts:32](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/settings/DocumentAnonymizationSettings.ts)

Document number anonymization settings.

***

### fields

> **fields**: [`FieldType`](FieldType.md)[]

Defined in: [settings/DocumentAnonymizationSettings.ts:29](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/settings/DocumentAnonymizationSettings.ts)

Fields to be anonymized.
