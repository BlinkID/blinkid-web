[**@microblink/blinkid-core**](../README.md)

***

[@microblink/blinkid-core](../README.md) / SingleSideScanningResult

# Type Alias: SingleSideScanningResult

> **SingleSideScanningResult** = `object`

Results of scanning a single side of a document

## Properties

### barcode?

> `optional` **barcode**: [`BarcodeResult`](BarcodeResult.md)

The data extracted from the barcode

***

### barcodeInputImage?

> `optional` **barcodeInputImage**: `ImageData`

The input image containing parsable barcode

***

### documentImage?

> `optional` **documentImage**: `ImageData`

The cropped document image

***

### faceImage?

> `optional` **faceImage**: [`DetailedCroppedImageResult`](DetailedCroppedImageResult.md)

The cropped face image

***

### inputImage?

> `optional` **inputImage**: `ImageData`

The input image

***

### mrz?

> `optional` **mrz**: [`MrzResult`](MrzResult.md)

The data extracted from the Machine Readable Zone

***

### signatureImage?

> `optional` **signatureImage**: [`DetailedCroppedImageResult`](DetailedCroppedImageResult.md)

The cropped signature image

***

### viz?

> `optional` **viz**: [`VizResult`](VizResult.md)

The data extracted from the Visual Inspection Zone
