[**@microblink/blinkid-wasm**](../README.md)

***

[@microblink/blinkid-wasm](../README.md) / ResultCompleteness

# Type Alias: ResultCompleteness

> **ResultCompleteness** = `object`

Defined in: [result/ResultCompleteness.ts:14](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/ResultCompleteness.ts)

Represents the completeness of the extraction process for a scanned document.

This structure tracks the status of the scanning process and indicates
whether specific components of the document, such as the specific fields from
the VIZ, MRZ, and barcode, have been successfully extracted.

## Properties

### barcodeExtracted

> **barcodeExtracted**: `boolean`

Defined in: [result/ResultCompleteness.ts:25](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/ResultCompleteness.ts)

Whether the barcode fields have been extracted

***

### documentImageExtracted

> **documentImageExtracted**: `boolean`

Defined in: [result/ResultCompleteness.ts:28](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/ResultCompleteness.ts)

Whether the document image has been extracted

***

### faceImageExtracted

> **faceImageExtracted**: `boolean`

Defined in: [result/ResultCompleteness.ts:31](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/ResultCompleteness.ts)

Whether the face image has been extracted

***

### mrzExtracted

> **mrzExtracted**: `boolean`

Defined in: [result/ResultCompleteness.ts:22](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/ResultCompleteness.ts)

Whether the MRZ fields have been extracted

***

### scanningStatus

> **scanningStatus**: [`ScanningStatus`](ScanningStatus.md)

Defined in: [result/ResultCompleteness.ts:16](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/ResultCompleteness.ts)

The status of the scanning process

***

### signatureImageExtracted

> **signatureImageExtracted**: `boolean`

Defined in: [result/ResultCompleteness.ts:34](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/ResultCompleteness.ts)

Whether the signature image has been extracted

***

### vizExtracted

> **vizExtracted**: `boolean`

Defined in: [result/ResultCompleteness.ts:19](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/ResultCompleteness.ts)

Whether the VIZ fields have been extracted
