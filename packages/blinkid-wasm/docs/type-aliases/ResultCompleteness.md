[**@microblink/blinkid-wasm**](../README.md)

***

[@microblink/blinkid-wasm](../README.md) / ResultCompleteness

# Type Alias: ResultCompleteness

> **ResultCompleteness** = `object`

Represents the completeness of the extraction process for a scanned document.

This structure tracks the status of the scanning process and indicates
whether specific components of the document, such as the specific fields from
the VIZ, MRZ, and barcode, have been successfully extracted.

## Properties

### barcodeExtracted

> **barcodeExtracted**: `boolean`

Whether the barcode fields have been extracted

***

### documentImageExtracted

> **documentImageExtracted**: `boolean`

Whether the document image has been extracted

***

### faceImageExtracted

> **faceImageExtracted**: `boolean`

Whether the face image has been extracted

***

### mrzExtracted

> **mrzExtracted**: `boolean`

Whether the MRZ fields have been extracted

***

### scanningStatus

> **scanningStatus**: [`ScanningStatus`](ScanningStatus.md)

The status of the scanning process

***

### signatureImageExtracted

> **signatureImageExtracted**: `boolean`

Whether the signature image has been extracted

***

### vizExtracted

> **vizExtracted**: `boolean`

Whether the VIZ fields have been extracted
