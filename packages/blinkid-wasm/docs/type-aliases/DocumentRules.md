[**@microblink/blinkid-wasm**](../README.md)

***

[@microblink/blinkid-wasm](../README.md) / DocumentRules

# Type Alias: DocumentRules

> **DocumentRules** = `object`

Defined in: [settings/DocumentRules.ts:9](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/settings/DocumentRules.ts)

Represents the document rules.

## Properties

### documentFilter?

> `optional` **documentFilter**: [`DocumentFilter`](DocumentFilter.md)

Defined in: [settings/DocumentRules.ts:14](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/settings/DocumentRules.ts)

Specified fields will overrule our document class field rules if filter
conditions are met.

***

### fields

> **fields**: [`DetailedFieldType`](DetailedFieldType.md)[]

Defined in: [settings/DocumentRules.ts:17](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/settings/DocumentRules.ts)

Fields to overrule our class field rules.
