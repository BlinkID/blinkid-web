[**@microblink/blinkid**](../README.md)

***

[@microblink/blinkid](../README.md) / NavigatorUAData

# Interface: NavigatorUAData

## See

https://wicg.github.io/ua-client-hints/#navigatoruadata

## Extends

- [`UALowEntropyJSON`](UALowEntropyJSON.md)

## Properties

### brands

> `readonly` **brands**: [`NavigatorUABrandVersion`](NavigatorUABrandVersion.md)[]

#### Inherited from

[`UALowEntropyJSON`](UALowEntropyJSON.md).[`brands`](UALowEntropyJSON.md#brands)

***

### mobile

> `readonly` **mobile**: `boolean`

#### Inherited from

[`UALowEntropyJSON`](UALowEntropyJSON.md).[`mobile`](UALowEntropyJSON.md#mobile)

***

### platform

> `readonly` **platform**: `string`

#### Inherited from

[`UALowEntropyJSON`](UALowEntropyJSON.md).[`platform`](UALowEntropyJSON.md#platform)

## Methods

### getHighEntropyValues()

> **getHighEntropyValues**(`hints`): `Promise`\<[`UADataValues`](UADataValues.md)\>

#### Parameters

##### hints

keyof [`UADataValues`](UADataValues.md)[] | `string`[]

#### Returns

`Promise`\<[`UADataValues`](UADataValues.md)\>

***

### toJSON()

> **toJSON**(): [`UALowEntropyJSON`](UALowEntropyJSON.md)

#### Returns

[`UALowEntropyJSON`](UALowEntropyJSON.md)
