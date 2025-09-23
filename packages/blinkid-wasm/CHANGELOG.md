# @microblink/blinkid-wasm

## 7.4.3

### Patch Changes

- Bump versions

## 7.4.2

### Patch Changes

- Fixed small memory leak happening while creating user agent string
- Now generating size manifests for resource files

## 7.4.1

### Patch Changes

- Bumped version

## 7.4.0

### Minor Changes

- Improved documentation

## 7.3.2

### Patch Changes

#### Bug Fixes

- Resolved issues where EMBind mapped properties with invalid names.

  - `BarcodeResult.rawBytes` has been renamed to `rawData` to match the TypeScript declaration.
  - `MrzResult` now correctly populates the `opt1` and `opt2` fields.
  - Corrected casing in `MrzResult`: `primaryId` and `secondaryId` are no longer incorrectly mapped as `primaryID` and `secondaryID`.
  - Fixed an issue where the `lowerLeft` property in `BlinkIdProcessResult` had a trailing space in its name.
  - Fixed and clarified the type specification for `MrzResult.dateOfBirth` and `MrzResult.dateOfExpiry`: although the runtime values already matched the `DateResult<string>` type, the declaration was previously set to `Date`.

- Removed unused property declarations from `BlinkIdScanningResult`:
  - `inputImagesScanningSide`
  - `barcodeInputImageScanningSide`
  - `documentImagesScanningSide`
  - `faceImageScanningSide`
  - `signatureImageScanningSide`

## 7.3.1

### Patch Changes

- Bumped version

## 7.3.0

### Minor Changes

- Fixed incorrect property name in `MrzResult`: `rawMRZString` is now correctly exposed as `rawMrzString`.
- Fixed incorrect `full-document` type `document` type in `ImageExtractionType`.
- Fixed typing issue by correctly adding the `vehicleOwner` property to `BlinkIdScanningResult`.
- Added `certificateNumber`, `countryCode` and `nationalInsuranceNumber` to `BlinkIdScanningResult` and `VizResult` types.
- Added `non-card-tribal-id` and `diplomatic-id` to `DocumentType`
- This change updates the Emscripten toolchain to version 4.0.9, upgrades multiple C++ package dependencies, and adds new document types (`non-card-tribal-id`, `diplomatic-id`) and field types (certificateNumber, countryCode, nationalInsuranceNumber) to the BlinkID recognition system.

## 7.2.2

### Patch Changes

- Fixed an issue where the Web Worker failed to initialize when SDK resources were hosted on a different origin than the application.

## 7.2.1

### Patch Changes

- Fixed an issue with frame quality estimation that could cause the recognition process to get stuck. This fix significantly improves success rate of document capturing, especially for the desktop cameras

## 7.2.0

### Minor Changes

- Update WASM files
- Implemented `showDemoOverlay` and `showProductionOverlay`
- Various bugfixes

## 7.1.0

### Minor Changes

- Updated internal dependencies
- Added new documents support

## 7.0.1

### Patch Changes

- Bump package version
