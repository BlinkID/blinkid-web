[**@microblink/blinkid-core**](../README.md)

***

[@microblink/blinkid-core](../README.md) / CroppedImageSettings

# Type Alias: CroppedImageSettings

> **CroppedImageSettings** = `object`

Represents the image cropping options.

## Properties

### dotsPerInch

> **dotsPerInch**: `number`

The DPI value for the cropped image - Specifies the resolution of the
output image.

***

### extensionFactor

> **extensionFactor**: `number`

The extension factor for the cropped image - Determines the additional
space around the detected document. Applicable only to document images.
Allowed value is from `0.0` to `1.0`. This determines how much additional
space around the detected document should be included in the crop.

***

### returnDocumentImage

> **returnDocumentImage**: `boolean`

Whether the document image should be returned - Controls document image
output. When true, the cropped document image will be included in the
result.

***

### returnFaceImage

> **returnFaceImage**: `boolean`

Whether the face image should be returned - Controls face image output.
When true, the cropped face image will be included in the result.

***

### returnSignatureImage

> **returnSignatureImage**: `boolean`

Whether the signature image should be returned - Controls signature image
output. When true, the cropped signature image will be included in the
result.
