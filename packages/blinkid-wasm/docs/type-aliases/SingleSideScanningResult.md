[**@microblink/blinkid-wasm**](../README.md)

***

[@microblink/blinkid-wasm](../README.md) / SingleSideScanningResult

# Type Alias: SingleSideScanningResult

> **SingleSideScanningResult** = `object`

Defined in: [result/SingleSideScanningResult.ts:12](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/SingleSideScanningResult.ts)

Results of scanning a single side of a document

## Properties

### barcode?

> `optional` **barcode**: [`BarcodeResult`](BarcodeResult.md)

Defined in: [result/SingleSideScanningResult.ts:20](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/SingleSideScanningResult.ts)

The data extracted from the barcode

***

### barcodeInputImage?

> `optional` **barcodeInputImage**: `ImageData`

Defined in: [result/SingleSideScanningResult.ts:26](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/SingleSideScanningResult.ts)

The input image containing parsable barcode

***

### documentImage?

> `optional` **documentImage**: `ImageData`

Defined in: [result/SingleSideScanningResult.ts:29](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/SingleSideScanningResult.ts)

The cropped document image

***

### faceImage?

> `optional` **faceImage**: [`DetailedCroppedImageResult`](DetailedCroppedImageResult.md)

Defined in: [result/SingleSideScanningResult.ts:32](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/SingleSideScanningResult.ts)

The cropped face image

***

### inputImage?

> `optional` **inputImage**: `ImageData`

Defined in: [result/SingleSideScanningResult.ts:23](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/SingleSideScanningResult.ts)

The input image

***

### mrz?

> `optional` **mrz**: [`MrzResult`](MrzResult.md)

Defined in: [result/SingleSideScanningResult.ts:17](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/SingleSideScanningResult.ts)

The data extracted from the Machine Readable Zone

***

### signatureImage?

> `optional` **signatureImage**: [`DetailedCroppedImageResult`](DetailedCroppedImageResult.md)

Defined in: [result/SingleSideScanningResult.ts:35](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/SingleSideScanningResult.ts)

The cropped signature image

***

### viz?

> `optional` **viz**: [`VizResult`](VizResult.md)

Defined in: [result/SingleSideScanningResult.ts:14](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/SingleSideScanningResult.ts)

The data extracted from the Visual Inspection Zone
