[**@microblink/blinkid-wasm**](../README.md)

***

[@microblink/blinkid-wasm](../README.md) / BarcodeData

# Type Alias: BarcodeData

> **BarcodeData** = `object`

Defined in: [result/barcode/BarcodeData.ts:31](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/barcode/BarcodeData.ts)

Data extracted from barcode.

## Properties

### barcodeType

> **barcodeType**: [`BarcodeType`](BarcodeType.md)

Defined in: [result/barcode/BarcodeData.ts:33](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/barcode/BarcodeData.ts)

Format of recognized barcode.

***

### rawData

> **rawData**: `Uint8Array`

Defined in: [result/barcode/BarcodeData.ts:45](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/barcode/BarcodeData.ts)

The raw bytes contained inside barcode.

***

### stringData

> **stringData**: `string`

Defined in: [result/barcode/BarcodeData.ts:42](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/barcode/BarcodeData.ts)

String representation of data inside barcode.

***

### uncertain

> **uncertain**: `boolean`

Defined in: [result/barcode/BarcodeData.ts:39](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-wasm/src/result/barcode/BarcodeData.ts)

True if returned result is uncertain, i.e. if scanned barcode was
incomplete (has parts of it missing).
