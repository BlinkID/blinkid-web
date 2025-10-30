[**@microblink/blinkid-ux-manager**](../README.md)

***

[@microblink/blinkid-ux-manager](../README.md) / FeedbackUiOptions

# Type Alias: FeedbackUiOptions

> **FeedbackUiOptions** = `object`

The options for the createBlinkIdFeedbackUi function.

## Properties

### localizationStrings?

> `optional` **localizationStrings**: `Partial`\<[`LocalizationStrings`](LocalizationStrings.md)\>

The localization strings.

***

### preserveSdkInstance?

> `optional` **preserveSdkInstance**: `boolean`

If set to `true`, the BlinkID instance will not be terminated when the
feedback UI is unmounted.

#### Default Value

```ts
false
```

***

### showDocumentFilteredModal?

> `optional` **showDocumentFilteredModal**: `boolean`

If set to `true`, the document filtered modal will be shown.

#### Default Value

```ts
true
```

***

### showHelpButton?

> `optional` **showHelpButton**: `boolean`

If set to `true`, the help button will be shown.

#### Default Value

```ts
true
```

***

### showHelpTooltipTimeout?

> `optional` **showHelpTooltipTimeout**: `number`

The timeout for the help tooltip.

#### Default Value

```ts
3000
```

***

### showOnboardingGuide?

> `optional` **showOnboardingGuide**: `boolean`

If set to `true`, the onboarding guide will be shown.

#### Default Value

```ts
true
```

***

### showTimeoutModal?

> `optional` **showTimeoutModal**: `boolean`

If set to `true`, the timeout modal will be shown.

#### Default Value

```ts
true
```

***

### showUnsupportedDocumentModal?

> `optional` **showUnsupportedDocumentModal**: `boolean`

If set to `true`, the document unsupported modal will be shown.

#### Default Value

```ts
true
```
