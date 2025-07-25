[**@microblink/blinkid-wasm**](../README.md)

***

[@microblink/blinkid-wasm](../README.md) / VehicleClassInfo

# Type Alias: VehicleClassInfo\<S\>

> **VehicleClassInfo**\<`S`\> = `object`

Represents the information about the vehicle class.

## Type Parameters

### S

`S` *extends* `string` \| [`StringResult`](StringResult.md)

The type of the string result.

## Properties

### effectiveDate?

> `optional` **effectiveDate**: [`DateResult`](DateResult.md)\<`S`\>

The date since licence is effective.

***

### expiryDate?

> `optional` **expiryDate**: [`DateResult`](DateResult.md)\<`S`\>

The date of expiry of licence.

***

### licenceType?

> `optional` **licenceType**: `S`

The type of driver licence.

***

### vehicleClass?

> `optional` **vehicleClass**: `S`

The type of vehicle the driver license owner has privilege to drive.
