[**@microblink/blinkid**](../README.md)

***

[@microblink/blinkid](../README.md) / InputImageAnalysisResult

# Type Alias: InputImageAnalysisResult

> **InputImageAnalysisResult** = `object`

Represents the results of processing and analyzing an input image.

This structure contains the status of the processing, along with detailed
results from detection, document quality, and information about the document
analysis performed on the input image.

## Properties

### barcodeDetectionStatus

> **barcodeDetectionStatus**: [`ImageAnalysisDetectionStatus`](ImageAnalysisDetectionStatus.md)

The status of barcode detection

***

### blurDetectionStatus

> **blurDetectionStatus**: [`ImageAnalysisDetectionStatus`](ImageAnalysisDetectionStatus.md)

The status of blur detection

***

### documentClassInfo

> **documentClassInfo**: [`DocumentClassInfo`](DocumentClassInfo.md)

Information about the document class

***

### documentColorStatus

> **documentColorStatus**: [`DocumentImageColor`](DocumentImageColor.md)

The color status of the document image

***

### documentDetectionStatus

> **documentDetectionStatus**: [`DetectionStatus`](DetectionStatus.md)

The status of the document detection

***

### documentHandOcclusionStatus

> **documentHandOcclusionStatus**: [`ImageAnalysisDetectionStatus`](ImageAnalysisDetectionStatus.md)

The status of hand occlusion detection in the document image

***

### documentLightingStatus

> **documentLightingStatus**: [`ImageAnalysisLightingStatus`](ImageAnalysisLightingStatus.md)

The status of lighting conditions in the document image

***

### documentLocation?

> `optional` **documentLocation**: [`Quadrilateral`](Quadrilateral.md)

The location of the detected document within an image

***

### documentMoireStatus

> **documentMoireStatus**: [`ImageAnalysisDetectionStatus`](ImageAnalysisDetectionStatus.md)

The status of moire pattern detection in the document image

***

### documentOrientation

> **documentOrientation**: [`DocumentOrientation`](DocumentOrientation.md)

The orientation of the document

***

### documentRotation

> **documentRotation**: [`DocumentRotation`](DocumentRotation.md)

The rotation of the document in the frame

***

### extractedFields

> **extractedFields**: [`FieldType`](FieldType.md)[]

List of fields that were extracted from the document

***

### extraPresentFields

> **extraPresentFields**: [`FieldType`](FieldType.md)[]

List of fields that weren't expected on the document but were present

***

### faceDetectionStatus

> **faceDetectionStatus**: [`ImageAnalysisDetectionStatus`](ImageAnalysisDetectionStatus.md)

The status of face detection

***

### glareDetectionStatus

> **glareDetectionStatus**: [`ImageAnalysisDetectionStatus`](ImageAnalysisDetectionStatus.md)

The status of glare detection

***

### imageExtractionFailures

> **imageExtractionFailures**: [`ImageExtractionType`](ImageExtractionType.md)[]

List of failed image extractions

***

### invalidCharacterFields

> **invalidCharacterFields**: [`FieldType`](FieldType.md)[]

List of fields that contained characters which were not expected in that
field

***

### missingMandatoryFields

> **missingMandatoryFields**: [`FieldType`](FieldType.md)[]

List of fields that were expected on the document but were missing

***

### mrzDetectionStatus

> **mrzDetectionStatus**: [`ImageAnalysisDetectionStatus`](ImageAnalysisDetectionStatus.md)

The status of MRZ detection

***

### processingStatus

> **processingStatus**: [`ProcessingStatus`](ProcessingStatus.md)

Status of the processing

***

### realIDDetectionStatus

> **realIDDetectionStatus**: [`ImageAnalysisDetectionStatus`](ImageAnalysisDetectionStatus.md)

The status of real ID detection

***

### scanningSide

> **scanningSide**: [`ScanningSide`](ScanningSide.md)

Side of the document being scanned
