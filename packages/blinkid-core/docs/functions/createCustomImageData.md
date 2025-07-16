[**@microblink/blinkid-core**](../README.md)

---

[@microblink/blinkid-core](../README.md) / createCustomImageData

# Function: createCustomImageData()

> **createCustomImageData**(`imageData`): `ImageData`

Defined in: [packages/blinkid-core/src/createCustomImageData.ts:12](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-core/src/createCustomImageData.ts)

Creates a custom ImageData object with the same properties as the original ImageData.
This is a workaround for the performance issue in Chromium browsers.

## Parameters

### imageData

`ImageData`

The original ImageData object to be wrapped.

## Returns

`ImageData`

A custom ImageData object with the same properties.
