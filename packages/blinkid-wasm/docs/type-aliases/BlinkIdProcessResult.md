[**@microblink/blinkid-wasm**](../README.md)

***

[@microblink/blinkid-wasm](../README.md) / BlinkIdProcessResult

# Type Alias: BlinkIdProcessResult

> **BlinkIdProcessResult** = `object`

Defined in: [session/BlinkIdProcessResult.ts:15](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/session/BlinkIdProcessResult.ts)

Represents the overall result of the document processing pipeline.

This structure combines the results of input image analysis and processing,
including detection, document image quality analysis, along with information
about the completeness of the extraction process for the document.

## Properties

### inputImageAnalysisResult

> **inputImageAnalysisResult**: [`InputImageAnalysisResult`](InputImageAnalysisResult.md)

Defined in: [session/BlinkIdProcessResult.ts:17](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/session/BlinkIdProcessResult.ts)

Result of the processing and analysis of the input image.

***

### resultCompleteness

> **resultCompleteness**: [`ResultCompleteness`](ResultCompleteness.md)

Defined in: [session/BlinkIdProcessResult.ts:19](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/session/BlinkIdProcessResult.ts)

Completeness of the extraction process.
