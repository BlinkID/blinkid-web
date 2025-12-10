# @microblink/blinkid-core

## 7.6.3

### Patch Changes

- Improved automatic lightweight build detection for mobile devices
  - Now uses Device Memory API to detect low-memory devices (< 4GB)
  - Applies to all mobile devices (phones and tablets) with available memory information
  - Falls back to `undefined` when memory information is unavailable, allowing manual configuration
  - Previously used a simple user agent check for all mobile devices
- Updated dependencies
  - @microblink/blinkid-worker@7.6.3
  - @microblink/blinkid-wasm@7.6.3

## 7.6.2

### Patch Changes

- Fixes `microblinkProxyUrl` handling
  - Prevent an extra ping to the Microblink server when a proxy URL is configured (previously one redundant request was sent).
  - Preserve the user-provided path when using a proxy URL (previously the path was removed).
- Updated dependencies
  - @microblink/blinkid-wasm@7.6.2
  - @microblink/blinkid-worker@7.6.2

## 7.6.1

### Patch Changes

- Updated dependencies
  - @microblink/blinkid-wasm@7.6.1
  - @microblink/blinkid-worker@7.6.1

## 7.6.0

### Minor Changes

- Rename `formFactor` property on `DerivedDeviceInfo` to `formFactors`

### Patch Changes

- Updated dependencies
  - @microblink/blinkid-worker@7.6.0
  - @microblink/blinkid-wasm@7.6.0

## 7.5.0

### Minor Changes

- Version skip

### Patch Changes

- Updated dependencies
  - @microblink/blinkid-wasm@7.5.0
  - @microblink/blinkid-worker@7.5.0

## 7.4.3

### Patch Changes

- Fixed types
- Updated dependencies
  - @microblink/blinkid-wasm@7.4.3
  - @microblink/blinkid-worker@7.4.3

## 7.4.2

### Patch Changes

- Updated dependencies
  - @microblink/blinkid-worker@7.4.2
  - @microblink/blinkid-wasm@7.4.2

## 7.4.1

### Patch Changes

- Updated dependencies
  - @microblink/blinkid-worker@7.4.1

## 7.4.0

### Minor Changes

- Improved documentation
- Updated dependencies
  - @microblink/blinkid-wasm@7.4.0
  - @microblink/blinkid-worker@7.4.0

## 7.3.2

### Patch Changes

- Introduced utilities for extracting images from the `BlinkIdScanningResult`:
  - `extractSideInputImage`
  - `extractBarcodeImage`
  - `extractSideDocumentImage`
  - `extractFaceImage`
  - `extractSignatureImage`

- Updated dependencies
  - @microblink/blinkid-wasm@7.3.2
  - @microblink/blinkid-worker@7.3.2

## 7.3.1

### Patch Changes

- Updated dependencies
  - @microblink/blinkid-worker@7.3.1

## 7.3.0

### Minor Changes

- Updated dependencies
  - @microblink/blinkid-worker@7.3.0
  - @microblink/blinkid-wasm@7.3.0

## 7.2.2

### Patch Changes

- Fixed an issue where the Web Worker failed to initialize when SDK resources were hosted on a different origin than the application.
- Updated dependencies
  - @microblink/blinkid-wasm@7.2.2
  - @microblink/blinkid-worker@7.2.2

## 7.2.1

### Patch Changes

- Updated dependencies
  - @microblink/blinkid-wasm@7.2.1
  - @microblink/blinkid-worker@7.2.1

## 7.2.0

### Patch Changes

- Updated dependencies
  - @microblink/blinkid-wasm@7.2.0
  - @microblink/blinkid-worker@7.2.0

## 7.1.0

### Patch Changes

- Updated dependencies
  - @microblink/blinkid-wasm@7.1.0
  - @microblink/blinkid-worker@7.1.0

## 7.0.1

### Patch Changes

- Updated dependencies
  - @microblink/blinkid-wasm@7.0.1
  - @microblink/blinkid-worker@7.0.1
