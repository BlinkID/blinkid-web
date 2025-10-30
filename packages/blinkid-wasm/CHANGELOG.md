# @microblink/blinkid-wasm

## 7.6.0

### Minor Changes

- Add support for ping v3
- Added support for capturing the back of US passports that feature a barcode
- Unparsable barcodes no longer prevent the scanning process from finishing and will be returned as raw data in the result if the `recognitionModeFilter` is set to `enableFullDocumentRecognition`. Using `enableBarcodeId` still requires the barcode to be parsable in order to successfully finish the scanning process
- Added a new `parsed` property on the barcode property of the `SingleSideScanningResult` which indicates if the raw barcode data was successfully parsed into structured information.
- Prevent parsing of two-line MRZ in TD1 format unless it's explicitly allowed. This will prevent false positive MRZ extraction on documents where the last line of the MRZ is covered or not fully visible
- Users are no longer forced to scan back sides of Alien and Refugee passports
- Fixed the issue with Togo ID where document number from VIZ was overriden by a wrong value from MRZ

#### New Documents Support

- Angola - Paper Passport
- Bahrain - Polycarbonate Passport
- Burkina Faso - Polycarbonate Passport
- Cameroon - Driver's License
- Canada, Manitoba - Metis Federation Card
- East Timor - Polycarbonate Passport
- El Salvador - Paper Passport
- Eritrea - Paper Passport
- France - Adr Certificate
- Germany - Adr Certificate
- Ghana - Voter ID
- India, Telangana - Driver's License
- Ivory Coast - Paper Passport
- Japan - Polycarbonate Passport
- Liberia - Paper Passport
- Liberia - Voter ID
- Malawi - Identity Card
- Malawi - Paper Passport
- Maldives - Polycarbonate Passport
- Mali - Paper Passport
- Mauritius - Paper Passport
- Oman - Vehicle Registration
- Paraguay - Polycarbonate Passport
- Rwanda - Driver's License
- Senegal - Driver's License
- Sierra Leone - Paper Passport
- Somalia - Paper Passport
- Switzerland - Adr Certificate
- Togo - Driver's License
- Togo - Paper Passport
- USA, Maryland - Medical Marijuana ID
- Vietnam - Paper Passport

#### New Document Versions for Supported Documents

- Chile - Polycarbonate Passport
- India - Paper Passport
- Moldova - Identity Card
- Pakistan - Identity Card
- Peru - Identity Card
- Romania - Identity Card
- Slovakia - Identity Card
- USA, California - Driver's License
- USA, California - Identity Card
- USA, New Hampshire - Identity Card
- USA, Georgia - Medical Marijuana ID
- USA, Pennsylvania - Medical Marijuana ID
- USA, South Carolina - Driver's License
- USA, South Carolina - Identity Card
- USA, Texas - Driver's License
- USA, Texas - Identity Card

##### New Segments Supported on Documents

- Switzerland, Residence Permit - 'dateOfEntry'
- Hungary, Identity Card - 'maidenName', 'nationality', 'sexOrGender', 'documentNumber', 'dateOfBirth'
- Greece, Identity Card - 'fathersName' (Latin and Greek), 'mothersName' (Latin and Greek), 'personalIdNumber', 'issuingAuthority' (Greek), 'municipalityOfRegistration' (Greek)
- Mexico, Voter ID - 'sectionCode', 'stateCode', 'municipalityCode', 'localityCode'
- Mexico, Consular Voter ID - 'stateCode', 'stateName'

##### Renamed segments

- Hungary - Identity Card - `additionalNameInformation` -> `mothersName`

### Patch Changes

- Update dependencies

## 7.5.0

### Minor Changes

- Version skip

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
