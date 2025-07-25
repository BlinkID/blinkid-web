[**@microblink/blinkid-core**](../README.md)

***

[@microblink/blinkid-core](../README.md) / DocumentFilter

# Type Alias: DocumentFilter

> **DocumentFilter** = `object`

Represents the document filter.

## Properties

### country?

> `optional` **country**: [`Country`](Country.md)

If set, only specified country will pass the filter criteria. Otherwise,
issuing country will not be taken into account.

***

### region?

> `optional` **region**: [`Region`](Region.md)

If set, only specified country will pass the filter criteria. Otherwise,
issuing region will not be taken into account.

***

### type?

> `optional` **type**: [`DocumentType`](DocumentType.md)

If set, only specified type will pass the filter criteria. Otherwise,
issuing type will not be taken into account.
