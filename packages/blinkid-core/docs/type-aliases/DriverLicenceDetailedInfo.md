[**@microblink/blinkid-core**](../README.md)

***

[@microblink/blinkid-core](../README.md) / DriverLicenceDetailedInfo

# Type Alias: DriverLicenceDetailedInfo\<S\>

> **DriverLicenceDetailedInfo**\<`S`\> = `object`

Represents detailed information from a driver's license.

## Type Parameters

### S

`S` *extends* `string` \| [`StringResult`](StringResult.md)

The type of the string result.

## Properties

### conditions?

> `optional` **conditions**: `S`

The driver license conditions

***

### endorsements?

> `optional` **endorsements**: `S`

The additional privileges granted to the US driver license owner

***

### restrictions?

> `optional` **restrictions**: `S`

The restrictions to driving privileges for the United States driver license
owner

***

### vehicleClass?

> `optional` **vehicleClass**: `S`

The type of vehicle the driver license owner has privilege to drive

***

### vehicleClassesInfo?

> `optional` **vehicleClassesInfo**: [`VehicleClassInfo`](VehicleClassInfo.md)\<`S`\>[]

The additional information on vehicle class
