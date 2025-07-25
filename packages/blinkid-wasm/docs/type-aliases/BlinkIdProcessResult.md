[**@microblink/blinkid-wasm**](../README.md)

***

[@microblink/blinkid-wasm](../README.md) / BlinkIdProcessResult

# Type Alias: BlinkIdProcessResult

> **BlinkIdProcessResult** = `object`

Represents the overall result of the document processing pipeline.

This structure combines the results of input image analysis and processing,
including detection, document image quality analysis, along with information
about the completeness of the extraction process for the document.

## Properties

### inputImageAnalysisResult

> **inputImageAnalysisResult**: [`InputImageAnalysisResult`](InputImageAnalysisResult.md)

Result of the processing and analysis of the input image.

***

### resultCompleteness

> **resultCompleteness**: [`ResultCompleteness`](ResultCompleteness.md)

Completeness of the extraction process.
