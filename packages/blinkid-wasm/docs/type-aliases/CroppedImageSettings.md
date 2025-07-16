[**@microblink/blinkid-wasm**](../README.md)

***

[@microblink/blinkid-wasm](../README.md) / CroppedImageSettings

# Type Alias: CroppedImageSettings

> **CroppedImageSettings** = `object`

Defined in: [settings/CroppedImageSettings.ts:10](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/settings/CroppedImageSettings.ts)

Represents the image cropping options.

## Properties

### dotsPerInch

> **dotsPerInch**: `number`

Defined in: [settings/CroppedImageSettings.ts:15](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/settings/CroppedImageSettings.ts)

The DPI value for the cropped image - Specifies the resolution of the
output image.

***

### extensionFactor

> **extensionFactor**: `number`

Defined in: [settings/CroppedImageSettings.ts:23](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/settings/CroppedImageSettings.ts)

The extension factor for the cropped image - Determines the additional
space around the detected document. Applicable only to document images.
Allowed value is from `0.0` to `1.0`. This determines how much additional
space around the detected document should be included in the crop.

***

### returnDocumentImage

> **returnDocumentImage**: `boolean`

Defined in: [settings/CroppedImageSettings.ts:30](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/settings/CroppedImageSettings.ts)

Whether the document image should be returned - Controls document image
output. When true, the cropped document image will be included in the
result.

***

### returnFaceImage

> **returnFaceImage**: `boolean`

Defined in: [settings/CroppedImageSettings.ts:36](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/settings/CroppedImageSettings.ts)

Whether the face image should be returned - Controls face image output.
When true, the cropped face image will be included in the result.

***

### returnSignatureImage

> **returnSignatureImage**: `boolean`

Defined in: [settings/CroppedImageSettings.ts:43](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/settings/CroppedImageSettings.ts)

Whether the signature image should be returned - Controls signature image
output. When true, the cropped signature image will be included in the
result.
