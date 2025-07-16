[**@microblink/blinkid-wasm**](../README.md)

***

[@microblink/blinkid-wasm](../README.md) / DriverLicenceDetailedInfo

# Type Alias: DriverLicenceDetailedInfo\<S\>

> **DriverLicenceDetailedInfo**\<`S`\> = `object`

Defined in: [utils/DriverLicenceDetailedInfo.ts:13](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/utils/DriverLicenceDetailedInfo.ts)

Represents detailed information from a driver's license.

## Type Parameters

### S

`S` *extends* `string` \| [`StringResult`](StringResult.md)

The type of the string result.

## Properties

### conditions?

> `optional` **conditions**: `S`

Defined in: [utils/DriverLicenceDetailedInfo.ts:27](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/utils/DriverLicenceDetailedInfo.ts)

The driver license conditions

***

### endorsements?

> `optional` **endorsements**: `S`

Defined in: [utils/DriverLicenceDetailedInfo.ts:21](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/utils/DriverLicenceDetailedInfo.ts)

The additional privileges granted to the US driver license owner

***

### restrictions?

> `optional` **restrictions**: `S`

Defined in: [utils/DriverLicenceDetailedInfo.ts:18](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/utils/DriverLicenceDetailedInfo.ts)

The restrictions to driving privileges for the United States driver license
owner

***

### vehicleClass?

> `optional` **vehicleClass**: `S`

Defined in: [utils/DriverLicenceDetailedInfo.ts:24](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/utils/DriverLicenceDetailedInfo.ts)

The type of vehicle the driver license owner has privilege to drive

***

### vehicleClassesInfo?

> `optional` **vehicleClassesInfo**: [`VehicleClassInfo`](VehicleClassInfo.md)\<`S`\>[]

Defined in: [utils/DriverLicenceDetailedInfo.ts:30](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/utils/DriverLicenceDetailedInfo.ts)

The additional information on vehicle class
