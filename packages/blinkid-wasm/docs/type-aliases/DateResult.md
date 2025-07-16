[**@microblink/blinkid-wasm**](../README.md)

***

[@microblink/blinkid-wasm](../README.md) / DateResult

# Type Alias: DateResult\<S\>

> **DateResult**\<`S`\> = `object`

Defined in: [utils/DateResult.ts:12](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/utils/DateResult.ts)

Smart date result structure.

## Type Parameters

### S

`S` *extends* `string` \| [`StringResult`](StringResult.md)

The type of the string result.

## Properties

### day?

> `optional` **day**: `number`

Defined in: [utils/DateResult.ts:14](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/utils/DateResult.ts)

Day in month [1-31]

***

### filledByDomainKnowledge

> **filledByDomainKnowledge**: `boolean`

Defined in: [utils/DateResult.ts:22](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/utils/DateResult.ts)

Indicates whether this date is filled by internal domain knowledge

***

### month?

> `optional` **month**: `number`

Defined in: [utils/DateResult.ts:16](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/utils/DateResult.ts)

Month in year [1-12]

***

### originalString?

> `optional` **originalString**: `S`

Defined in: [utils/DateResult.ts:20](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/utils/DateResult.ts)

Original date string from the document

***

### successfullyParsed?

> `optional` **successfullyParsed**: `boolean`

Defined in: [utils/DateResult.ts:24](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/utils/DateResult.ts)

Indicates whether date was parsed successfully

***

### year?

> `optional` **year**: `number`

Defined in: [utils/DateResult.ts:18](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/utils/DateResult.ts)

Four digit year
