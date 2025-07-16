[**@microblink/blinkid-core**](../README.md)

---

[@microblink/blinkid-core](../README.md) / getUserId

# Function: getUserId()

> **getUserId**(): `string`

Defined in: [packages/blinkid-core/src/getUserId.ts:16](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-core/src/getUserId.ts)

Gets the user id from local storage, or generates a new one.

This is a workaround for the lack of a user id in the worker scope.

## Returns

`string`

a unique user id
