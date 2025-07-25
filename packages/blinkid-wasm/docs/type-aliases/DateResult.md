[**@microblink/blinkid-wasm**](../README.md)

***

[@microblink/blinkid-wasm](../README.md) / DateResult

# Type Alias: DateResult\<S\>

> **DateResult**\<`S`\> = `object`

Smart date result structure.

## Type Parameters

### S

`S` *extends* `string` \| [`StringResult`](StringResult.md)

The type of the string result.

## Properties

### day?

> `optional` **day**: `number`

Day in month [1-31]

***

### filledByDomainKnowledge

> **filledByDomainKnowledge**: `boolean`

Indicates whether this date is filled by internal domain knowledge

***

### month?

> `optional` **month**: `number`

Month in year [1-12]

***

### originalString?

> `optional` **originalString**: `S`

Original date string from the document

***

### successfullyParsed?

> `optional` **successfullyParsed**: `boolean`

Indicates whether date was parsed successfully

***

### year?

> `optional` **year**: `number`

Four digit year
