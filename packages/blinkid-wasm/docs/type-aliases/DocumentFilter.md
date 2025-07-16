[**@microblink/blinkid-wasm**](../README.md)

***

[@microblink/blinkid-wasm](../README.md) / DocumentFilter

# Type Alias: DocumentFilter

> **DocumentFilter** = `object`

Defined in: [settings/DocumentFilter.ts:8](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/settings/DocumentFilter.ts)

Represents the document filter.

## Properties

### country?

> `optional` **country**: [`Country`](Country.md)

Defined in: [settings/DocumentFilter.ts:13](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/settings/DocumentFilter.ts)

If set, only specified country will pass the filter criteria. Otherwise,
issuing country will not be taken into account.

***

### region?

> `optional` **region**: [`Region`](Region.md)

Defined in: [settings/DocumentFilter.ts:19](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/settings/DocumentFilter.ts)

If set, only specified country will pass the filter criteria. Otherwise,
issuing region will not be taken into account.

***

### type?

> `optional` **type**: [`DocumentType`](DocumentType.md)

Defined in: [settings/DocumentFilter.ts:25](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/settings/DocumentFilter.ts)

If set, only specified type will pass the filter criteria. Otherwise,
issuing type will not be taken into account.
