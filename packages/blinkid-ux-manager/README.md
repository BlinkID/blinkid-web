# @microblink/blinkid-ux-manager

This package provides user experience management and feedback UI for the BlinkID browser SDK. It parses results from [`@microblink/blinkid-core`](https://www.npmjs.com/package/@microblink/blinkid-core) and guides the user through the scanning process, controlling [`@microblink/camera-manager`](https://www.npmjs.com/package/@microblink/camera-manager) as needed.

## Features

- **Smart UI State Management:** Provides both headless and UI components for user feedback during scanning
- **Camera Integration:** Integrates with BlinkID Core and Camera Manager
- **Haptic Feedback:** Built-in haptic feedback support for enhanced user experience on mobile devices
- **Document Filtering:** Advanced document class filtering capabilities
- **Timeout Management:** Configurable scanning timeouts with automatic state management
- **Localization Support:** Multi-language support with customizable strings

## Overview

- Provides both headless and UI components for user feedback during scanning.
- Integrates with BlinkID Core and Camera Manager.
- Includes haptic feedback system for mobile devices.
- Used by [`@microblink/blinkid`](https://www.npmjs.com/package/@microblink/blinkid) and can be used directly for custom UI integrations.

## Installation

Install from npm using your preferred package manager:

```sh
npm install @microblink/blinkid-ux-manager
# or
yarn add @microblink/blinkid-ux-manager
# or
pnpm add @microblink/blinkid-ux-manager
```

## Haptic Feedback

The UX Manager includes a comprehensive haptic feedback system that provides tactile responses during the document scanning process. **This feature is primarily designed for Android devices using Chrome browser**, where it works reliably to enhance the scanning experience.

### Haptic Feedback Types

| Event              | Duration | Type  | Description                                   |
| ------------------ | -------- | ----- | --------------------------------------------- |
| First Side Success | 100ms    | Short | When the first side of an ID card is captured |
| Final Success      | 300ms    | Long  | When document scanning is completed           |
| Error States       | 100ms    | Short | Quality issues (blur, glare, positioning)     |
| Error Dialogs      | 300ms    | Long  | Timeout or critical errors                    |
| Flashlight Toggle  | 100ms    | Short | When camera flashlight is activated           |
| Warning States     | 100ms    | Short | During sensing phases (with 1s cooldown)      |

### Haptic Feedback Usage

```javascript
import {
  BlinkIdUxManager,
  HapticFeedbackManager,
} from "@microblink/blinkid-ux-manager";

// Create UX Manager (haptic feedback enabled by default)
const uxManager = new BlinkIdUxManager(cameraManager, scanningSession);

// Check if haptic feedback is supported
if (uxManager.isHapticFeedbackSupported()) {
  console.log("Device supports haptic feedback");
}

// Enable/disable haptic feedback
uxManager.setHapticFeedbackEnabled(true); // Enable
uxManager.setHapticFeedbackEnabled(false); // Disable

// Access haptic manager directly for manual control
const hapticManager = uxManager.getHapticFeedbackManager();
hapticManager.triggerShort(); // 100ms vibration for short feedback
hapticManager.triggerLong(); // 300ms vibration for long feedback
hapticManager.stop(); // Stop all vibration
```

### Browser Compatibility

**⚠️ Important:** Haptic feedback uses the [Web Vibration API](https://developer.mozilla.org/en-US/docs/Web/API/Vibration_API), which has **limited browser support**:

## Usage

You can use `@microblink/blinkid-ux-manager` directly in your project for advanced or custom integrations. For most use cases, use [`@microblink/blinkid`](https://www.npmjs.com/package/@microblink/blinkid) for a simpler setup.

See the example apps in the `apps/examples` directory in the GitHub repository for usage details.

## Development

To build the package locally:

1. Install dependencies in the monorepo root:

   ```sh
   pnpm install
   ```

2. Build the package:

   ```sh
   pnpm build
   ```

3. Run tests:

   ```sh
   pnpm test
   ```

The output files will be available in the `dist/` and `types/` directories.

### Internationalization

You can customize UI strings when creating the feedback UI:

```
createBlinkIdFeedbackUi(uxManager, cameraUi, {
   localizationStrings: {
      scan_the_barcode: "Please scan the barcode"
   }
});
```

#### Provided Translations

<details>
<summary>Click to see all available translation files</summary>

- [ak.ts](src/ui/locales/ak.ts)
- [am.ts](src/ui/locales/am.ts)
- [ar.ts](src/ui/locales/ar.ts)
- [bn.ts](src/ui/locales/bn.ts)
- [cs.ts](src/ui/locales/cs.ts)
- [da.ts](src/ui/locales/da.ts)
- [de.ts](src/ui/locales/de.ts)
- [el.ts](src/ui/locales/el.ts)
- [en.ts](src/ui/locales/en.ts)
- [en_GB.ts](src/ui/locales/en_GB.ts)
- [es.ts](src/ui/locales/es.ts)
- [es_MX.ts](src/ui/locales/es_MX.ts)
- [fa-latn.ts](src/ui/locales/fa-latn.ts)
- [fi.ts](src/ui/locales/fi.ts)
- [fil.ts](src/ui/locales/fil.ts)
- [fr.ts](src/ui/locales/fr.ts)
- [fr_CA.ts](src/ui/locales/fr_CA.ts)
- [ha.ts](src/ui/locales/ha.ts)
- [he.ts](src/ui/locales/he.ts)
- [hi.ts](src/ui/locales/hi.ts)
- [hr.ts](src/ui/locales/hr.ts)
- [hu.ts](src/ui/locales/hu.ts)
- [id.ts](src/ui/locales/id.ts)
- [is.ts](src/ui/locales/is.ts)
- [it.ts](src/ui/locales/it.ts)
- [ja.ts](src/ui/locales/ja.ts)
- [ka_GE.ts](src/ui/locales/ka_GE.ts)
- [kk.ts](src/ui/locales/kk.ts)
- [km_KH.ts](src/ui/locales/km_KH.ts)
- [ko.ts](src/ui/locales/ko.ts)
- [lv.ts](src/ui/locales/lv.ts)
- [ms.ts](src/ui/locales/ms.ts)
- [ne.ts](src/ui/locales/ne.ts)
- [nl.ts](src/ui/locales/nl.ts)
- [no.ts](src/ui/locales/no.ts)
- [pl.ts](src/ui/locales/pl.ts)
- [ps_AF.ts](src/ui/locales/ps_AF.ts)
- [pt.ts](src/ui/locales/pt.ts)
- [pt_BR.ts](src/ui/locales/pt_BR.ts)
- [ro.ts](src/ui/locales/ro.ts)
- [ru.ts](src/ui/locales/ru.ts)
- [si.ts](src/ui/locales/si.ts)
- [sk.ts](src/ui/locales/sk.ts)
- [sl.ts](src/ui/locales/sl.ts)
- [sr.ts](src/ui/locales/sr.ts)
- [sv.ts](src/ui/locales/sv.ts)
- [sw.ts](src/ui/locales/sw.ts)
- [th.ts](src/ui/locales/th.ts)
- [tr.ts](src/ui/locales/tr.ts)
- [uk.ts](src/ui/locales/uk.ts)
- [ur.ts](src/ui/locales/ur.ts)
- [uz.ts](src/ui/locales/uz.ts)
- [vi.ts](src/ui/locales/vi.ts)
- [yo.ts](src/ui/locales/yo.ts)
- [zh_CN.ts](src/ui/locales/zh_CN.ts)
- [zh_TW.ts](src/ui/locales/zh_TW.ts)

</details>

---

You can import any of these files directly or use them as a starting point for your own localization.
