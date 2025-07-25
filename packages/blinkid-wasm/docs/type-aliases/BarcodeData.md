[**@microblink/blinkid-wasm**](../README.md)

***

[@microblink/blinkid-wasm](../README.md) / BarcodeData

# Type Alias: BarcodeData

> **BarcodeData** = `object`

Data extracted from barcode.

## Properties

### barcodeType

> **barcodeType**: [`BarcodeType`](BarcodeType.md)

Format of recognized barcode.

***

### rawData

> **rawData**: `Uint8Array`

The raw bytes contained inside barcode.

***

### stringData

> **stringData**: `string`

String representation of data inside barcode.

***

### uncertain

> **uncertain**: `boolean`

True if returned result is uncertain, i.e. if scanned barcode was
incomplete (has parts of it missing).
