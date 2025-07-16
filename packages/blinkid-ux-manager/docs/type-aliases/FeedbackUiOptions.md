[**@microblink/blinkid-ux-manager**](../README.md)

---

[@microblink/blinkid-ux-manager](../README.md) / FeedbackUiOptions

# Type Alias: FeedbackUiOptions

> **FeedbackUiOptions** = `object`

Defined in: [blinkid-ux-manager/src/ui/createBlinkIdFeedbackUi.tsx:16](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-ux-manager/src/ui/createBlinkIdFeedbackUi.tsx)

The options for the createBlinkIdFeedbackUi function.

## Properties

### localizationStrings?

> `optional` **localizationStrings**: `Partial`\<[`LocalizationStrings`](LocalizationStrings.md)\>

Defined in: [blinkid-ux-manager/src/ui/createBlinkIdFeedbackUi.tsx:20](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-ux-manager/src/ui/createBlinkIdFeedbackUi.tsx)

The localization strings.

---

### preserveSdkInstance?

> `optional` **preserveSdkInstance**: `boolean`

Defined in: [blinkid-ux-manager/src/ui/createBlinkIdFeedbackUi.tsx:27](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-ux-manager/src/ui/createBlinkIdFeedbackUi.tsx)

If set to `true`, the BlinkID instance will not be terminated when the
feedback UI is unmounted.

#### Default Value

```ts
false;
```

---

### showHelpButton?

> `optional` **showHelpButton**: `boolean`

Defined in: [blinkid-ux-manager/src/ui/createBlinkIdFeedbackUi.tsx:39](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-ux-manager/src/ui/createBlinkIdFeedbackUi.tsx)

If set to `true`, the help button will be shown.

#### Default Value

```ts
true;
```

---

### showOnboardingGuide?

> `optional` **showOnboardingGuide**: `boolean`

Defined in: [blinkid-ux-manager/src/ui/createBlinkIdFeedbackUi.tsx:33](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-ux-manager/src/ui/createBlinkIdFeedbackUi.tsx)

If set to `true`, the onboarding guide will be shown.

#### Default Value

```ts
true;
```
