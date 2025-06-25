# Release notes

All notable changes to this project will be documented in this file.

# v7.2.2

## Hotfix Release

- Fixed an issue where the SDK failed to initialize properly when resources were hosted on a different origin than the application, which was caused by Web Worker initialization failures.

### Fixes

- Fixed an issue where the Web Worker failed to initialize when SDK resources were hosted on a different origin than the application.

# v7.2.1

## Hotfix Release

- Fixed an issue with frame quality estimation that could cause the recognition process to get stuck. This fix significantly improves success rate of document capturing, especially for the desktop cameras

### Fixes

- Fixed an issue with frame quality estimation.

# v7.2.0

## What's new

- Added the ability to filter documents using the `addDocumentClassFilter` method on the BlinkID UX Manager.
- Added new user feedback for scanning multi-page passport documents.
- Added message for hand occlusion detection. The setting `skipImagesOccludedByHand` set to `true` by default
- Added message for poor lighting conditions detection. The setting `skipImagesWithInadequateLightingConditions` set to `true` by default
- Added "Demo" overlay for the demo licenses (non-production)
- Added "Powered by Microblink" overlay option for licenses with this enabled

## Bug Fixes

- Fixed data match bug when partial anonymisation is enabled
- Fixed face extraction bug for rotated face images on documents
- Improved face extraction for documents without face image (skipping face image extraction in that case)
- Fixed face extraction bug for Philippines Passport document
- Fixed an issue with filling the ProcessResult during the Barcode Capture step, ensuring only relevant fields are filled
- Fixed bug that forced scanning of the back side of the Germany Residence Permit in passport document
- Fixed bug that caused skipping back side when only signature was present
- Fixed an issue which caused certain feedback messages to be displayed too briefly.

# v7.1.0

## What's New

#### New Documents Support

- Austria - Refugee Passport
- Austria - Polycarbonate Refugee Passport
- Burkina Faso - Driver's License
- Burkina Faso - Paper Passport
- Costa Rica - Residence Permit
- Gambia - Paper Passport
- Guinea - Polycarbonate Passport
- Rwanda - Polycarbonate Passport
- South Korea - Polycarbonate Passport
- Tanzania - Polycarbonate Passport
- Uganda - Paper Passport
- Uganda - Polycarbonate Passport
- Zambia - Driver's License
- Zambia - Paper Passport
- USA, Florida - Medical Marijuana ID
- USA, Pennsylvania - - Medical Marijuana ID

#### New Beta Documents Support

- Benin - Paper Passport
- Burundi - Polycarbonate Passport
- Chad - Identity Card
- Kenya - Driver's License
- Mozambique - Polycarbonate Passport
- Spain - Registration Certificate
- Sudan - Identity Card
- Zimbabwe - Driver's License
- USA, Nevada - Medical Marijuana ID
- USA, New York - Medical Marijuana ID
- USA, Oklahoma - Medical Marijuana ID

#### New Document Versions for Supported Documents

- Bangladesh - Second data page support on Paper Passport and Polycarbonate Passport
- Kosovo - Paper Passport
- Mexico, Colima - Driver's License
- Mexico, Mexico - Driver's License
- Netherlands - Identity Card
- Netherlands - Polycarbonate Passport
- Romania - Identity Card, Back side scanning
- Romania - Polycarbonate Passport
- Singapore - Employment Pass, Back side scanning
- Slovakia - Polycarbonate Passport
- Syria - Paper Passport
- USA, Wyoming - Driver's License

#### New Document Versions for Beta-Supported Documents

- Mexico, Guanajuato - Driver's License
- Mexico, Puebla - Driver's License
- Croatia - Health Insurance Card

#### New Segments Supported on Documents

- Greece
  - Identity Cards, Driver's Licenses, Residence Permits and Passports
  - expanding support for extracting segments in Greek script
- Saudi Arabia, Identity Card
  - expanding support for extracting segments in Arabic script
- Egypt, Driver's Licenses
  - expanding support for extracting segments in Arabic script

### Affected Packages

- @microblink/blinkid
- @microblink/blinkid-core
- @microblink/blinkid-ux-manager
- @microblink/camera-manager

### Installation

```bash
npm install @microblink/blinkid@7.1.0
```

Or with pnpm:

```bash
pnpm add @microblink/blinkid@7.1.0
```

# v7.0.1

## Hotfix Release

This is a hotfix release that addresses issues with remote licenses.

### Fixes

- Fixed issues with remote license handling

### Affected Packages

- @microblink/blinkid
- @microblink/blinkid-core
- @microblink/blinkid-ux-manager
- @microblink/camera-manager

### Installation

```bash
npm install @microblink/blinkid@7.0.1
```

Or with pnpm:

```bash
pnpm add @microblink/blinkid@7.0.1
```

---

# v7.0.0

We're excited to introduce BlinkID v7, a major upgrade designed to simplify your integration and deliver a simpler ID scanning experience. With BlinkID v7, we're taking a fresh approach to scanning logic by introducing a more straightforward, session-based API for an easier configuration path, all while boosting first-time scan success rate.

## Highlights & Integration Improvements

- **Unified session-based API**: We've moved away from juggling multiple recognizers (e.g., SingleSide, MultiSide) to a single session-based approach, unifying scanning logic under one simplified API. There's no need to switch recognizers anymore.
- **Backward compatibility**: Existing production keys will continue to work with v7.0. No new license key is required for the upgrade.
- **More maintainable codebase**: This new architecture sets the stage for easier and faster updates.

## Architecture Changes

- **New core components**: Instead of Recognizer-based architecture, BlinkID uses a streamlined session-based approach.
- **Modern TypeScript**: Written with modern TypeScript features for improved developer experience.
- **Component-based UI**: Simplified, customizable UI components for easier integration.
- **Simplified flow**: More straightforward API with clearer separation of concerns.

## Major API Changes

- **New session-based API**

  - Replaces the recognizer-based approach with a single, streamlined session model for easier scanning logic and better maintainability.

- **Modular SDK structure**

  - The SDK is now modular:
    - [`@microblink/blinkid-core`](https://www.npmjs.com/package/@microblink/blinkid-core) for scanning logic.
    - [`@microblink/blinkid-ux-manager`](https://www.npmjs.com/package/@microblink/blinkid-ux-manager) for prebuilt UI components.
    - [`@microblink/camera-manager`](https://www.npmjs.com/package/@microblink/camera-manager) for camera stream handling.
    - [`@microblink/blinkid`](https://www.npmjs.com/package/@microblink/blinkid) as the all-in-one package.

- **Simplified initialization & result handling**

  - New SDK initialization method:

    ```javascript
    import { createBlinkId } from "@microblink/blinkid";

    const blinkid = await createBlinkId({
      licenseKey: "your-license-key",
    });
    ```

  - Results are now retrieved through structured session-based callbacks.

- **Enhanced UI customization**

  - UI settings enable direct customization of typography, colors, and strings.
  - The modular architecture allows advanced modifications for branding and accessibility.

- **Renamed settings for improved clarity**
  - `blurStrictnessLevel` → `blurDetectionLevel`
  - `enableBlurFilter` → `skipFramesWithBlur`
  - `glareStrictnessLevel` → `glareDetectionLevel`
  - `enableGlareFilter` → `skipFramesWithGlare`
  - `combineFrameResults` → `enableMultiFrameExtraction`
  - `cardRotation`→ `documentRotation`
  - And more...

## Plan Your Upgrade

Note that v6 is now considered legacy. Comprehensive documentation is in development - in the meantime, please refer to our example applications in the repository under `apps/examples` for integration patterns:

- **[blinkid-simple](https://github.com/BlinkID/blinkid-web/tree/main/apps/examples/blinkid-simple/)**: Minimal integration with default UI
- **[blinkid-core-api](https://github.com/BlinkID/blinkid-web/tree/main/apps/examples/blinkid-core-api/)**: Low-level usage of the core API
- **[blinkid-advanced-setup](https://github.com/BlinkID/blinkid-web/tree/main/apps/examples/blinkid-advanced-setup/)**: Custom UI and advanced configuration
- **[blinkid-preload](https://github.com/BlinkID/blinkid-web/tree/main/apps/examples/blinkid-preload/)**: Preloading resources for faster startup

For any questions or feedback, reach out to support@microblink.com. We value your input and look forward to hearing how BlinkID v7 improves your app's experience!
