[**@microblink/blinkid-wasm**](../README.md)

***

[@microblink/blinkid-wasm](../README.md) / InputImageAnalysisResult

# Type Alias: InputImageAnalysisResult

> **InputImageAnalysisResult** = `object`

Defined in: [result/InputImageAnalysisResult.ts:25](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/InputImageAnalysisResult.ts)

Represents the results of processing and analyzing an input image.

This structure contains the status of the processing, along with detailed
results from detection, document quality, and information about the document
analysis performed on the input image.

## Properties

### barcodeDetectionStatus

> **barcodeDetectionStatus**: [`ImageAnalysisDetectionStatus`](ImageAnalysisDetectionStatus.md)

Defined in: [result/InputImageAnalysisResult.ts:78](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/InputImageAnalysisResult.ts)

The status of barcode detection

***

### blurDetectionStatus

> **blurDetectionStatus**: [`ImageAnalysisDetectionStatus`](ImageAnalysisDetectionStatus.md)

Defined in: [result/InputImageAnalysisResult.ts:60](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/InputImageAnalysisResult.ts)

The status of blur detection

***

### documentClassInfo

> **documentClassInfo**: [`DocumentClassInfo`](DocumentClassInfo.md)

Defined in: [result/InputImageAnalysisResult.ts:57](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/InputImageAnalysisResult.ts)

Information about the document class

***

### documentColorStatus

> **documentColorStatus**: [`DocumentImageColor`](DocumentImageColor.md)

Defined in: [result/InputImageAnalysisResult.ts:66](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/InputImageAnalysisResult.ts)

The color status of the document image

***

### documentDetectionStatus

> **documentDetectionStatus**: [`DetectionStatus`](DetectionStatus.md)

Defined in: [result/InputImageAnalysisResult.ts:51](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/InputImageAnalysisResult.ts)

The status of the document detection

***

### documentHandOcclusionStatus

> **documentHandOcclusionStatus**: [`ImageAnalysisDetectionStatus`](ImageAnalysisDetectionStatus.md)

Defined in: [result/InputImageAnalysisResult.ts:87](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/InputImageAnalysisResult.ts)

The status of hand occlusion detection in the document image

***

### documentLightingStatus

> **documentLightingStatus**: [`ImageAnalysisLightingStatus`](ImageAnalysisLightingStatus.md)

Defined in: [result/InputImageAnalysisResult.ts:84](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/InputImageAnalysisResult.ts)

The status of lighting conditions in the document image

***

### documentLocation?

> `optional` **documentLocation**: [`Quadrilateral`](Quadrilateral.md)

Defined in: [result/InputImageAnalysisResult.ts:54](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/InputImageAnalysisResult.ts)

The location of the detected document within an image

***

### documentMoireStatus

> **documentMoireStatus**: [`ImageAnalysisDetectionStatus`](ImageAnalysisDetectionStatus.md)

Defined in: [result/InputImageAnalysisResult.ts:69](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/InputImageAnalysisResult.ts)

The status of moire pattern detection in the document image

***

### documentOrientation

> **documentOrientation**: [`DocumentOrientation`](DocumentOrientation.md)

Defined in: [result/InputImageAnalysisResult.ts:90](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/InputImageAnalysisResult.ts)

The orientation of the document

***

### documentRotation

> **documentRotation**: [`DocumentRotation`](DocumentRotation.md)

Defined in: [result/InputImageAnalysisResult.ts:93](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/InputImageAnalysisResult.ts)

The rotation of the document in the frame

***

### extractedFields

> **extractedFields**: [`FieldType`](FieldType.md)[]

Defined in: [result/InputImageAnalysisResult.ts:33](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/InputImageAnalysisResult.ts)

List of fields that were extracted from the document

***

### extraPresentFields

> **extraPresentFields**: [`FieldType`](FieldType.md)[]

Defined in: [result/InputImageAnalysisResult.ts:42](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/InputImageAnalysisResult.ts)

List of fields that weren't expected on the document but were present

***

### faceDetectionStatus

> **faceDetectionStatus**: [`ImageAnalysisDetectionStatus`](ImageAnalysisDetectionStatus.md)

Defined in: [result/InputImageAnalysisResult.ts:72](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/InputImageAnalysisResult.ts)

The status of face detection

***

### glareDetectionStatus

> **glareDetectionStatus**: [`ImageAnalysisDetectionStatus`](ImageAnalysisDetectionStatus.md)

Defined in: [result/InputImageAnalysisResult.ts:63](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/InputImageAnalysisResult.ts)

The status of glare detection

***

### imageExtractionFailures

> **imageExtractionFailures**: [`ImageExtractionType`](ImageExtractionType.md)[]

Defined in: [result/InputImageAnalysisResult.ts:45](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/InputImageAnalysisResult.ts)

List of failed image extractions

***

### invalidCharacterFields

> **invalidCharacterFields**: [`FieldType`](FieldType.md)[]

Defined in: [result/InputImageAnalysisResult.ts:39](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/InputImageAnalysisResult.ts)

List of fields that contained characters which were not expected in that
field

***

### missingMandatoryFields

> **missingMandatoryFields**: [`FieldType`](FieldType.md)[]

Defined in: [result/InputImageAnalysisResult.ts:30](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/InputImageAnalysisResult.ts)

List of fields that were expected on the document but were missing

***

### mrzDetectionStatus

> **mrzDetectionStatus**: [`ImageAnalysisDetectionStatus`](ImageAnalysisDetectionStatus.md)

Defined in: [result/InputImageAnalysisResult.ts:75](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/InputImageAnalysisResult.ts)

The status of MRZ detection

***

### processingStatus

> **processingStatus**: [`ProcessingStatus`](ProcessingStatus.md)

Defined in: [result/InputImageAnalysisResult.ts:27](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/InputImageAnalysisResult.ts)

Status of the processing

***

### realIDDetectionStatus

> **realIDDetectionStatus**: [`ImageAnalysisDetectionStatus`](ImageAnalysisDetectionStatus.md)

Defined in: [result/InputImageAnalysisResult.ts:81](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/InputImageAnalysisResult.ts)

The status of real ID detection

***

### scanningSide

> **scanningSide**: [`ScanningSide`](ScanningSide.md)

Defined in: [result/InputImageAnalysisResult.ts:48](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/InputImageAnalysisResult.ts)

Side of the document being scanned
