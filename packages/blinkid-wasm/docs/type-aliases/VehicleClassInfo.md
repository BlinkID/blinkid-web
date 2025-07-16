[**@microblink/blinkid-wasm**](../README.md)

***

[@microblink/blinkid-wasm](../README.md) / VehicleClassInfo

# Type Alias: VehicleClassInfo\<S\>

> **VehicleClassInfo**\<`S`\> = `object`

Defined in: [utils/VehicleClassInfo.ts:13](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/utils/VehicleClassInfo.ts)

Represents the information about the vehicle class.

## Type Parameters

### S

`S` *extends* `string` \| [`StringResult`](StringResult.md)

The type of the string result.

## Properties

### effectiveDate?

> `optional` **effectiveDate**: [`DateResult`](DateResult.md)\<`S`\>

Defined in: [utils/VehicleClassInfo.ts:21](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/utils/VehicleClassInfo.ts)

The date since licence is effective.

***

### expiryDate?

> `optional` **expiryDate**: [`DateResult`](DateResult.md)\<`S`\>

Defined in: [utils/VehicleClassInfo.ts:24](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/utils/VehicleClassInfo.ts)

The date of expiry of licence.

***

### licenceType?

> `optional` **licenceType**: `S`

Defined in: [utils/VehicleClassInfo.ts:18](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/utils/VehicleClassInfo.ts)

The type of driver licence.

***

### vehicleClass?

> `optional` **vehicleClass**: `S`

Defined in: [utils/VehicleClassInfo.ts:15](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/utils/VehicleClassInfo.ts)

The type of vehicle the driver license owner has privilege to drive.
