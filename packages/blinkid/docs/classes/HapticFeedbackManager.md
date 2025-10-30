[**@microblink/blinkid**](../README.md)

***

[@microblink/blinkid](../README.md) / HapticFeedbackManager

# Class: HapticFeedbackManager

Manages haptic feedback for the BlinkID SDK.
Provides cross-platform haptic feedback using the Web Vibration API.

## Constructors

### Constructor

> **new HapticFeedbackManager**(): `HapticFeedbackManager`

#### Returns

`HapticFeedbackManager`

## Methods

### isEnabled()

> **isEnabled**(): `boolean`

Check if haptic feedback is currently enabled.

#### Returns

`boolean`

true if haptic feedback is enabled

***

### isSupported()

> **isSupported**(): `boolean`

Check if haptic feedback is supported by the current browser/device.

#### Returns

`boolean`

true if haptic feedback is supported

***

### setEnabled()

> **setEnabled**(`enabled`): `void`

Enable or disable haptic feedback.

#### Parameters

##### enabled

`boolean`

Whether haptic feedback should be enabled

#### Returns

`void`

***

### stop()

> **stop**(): `void`

Stop any ongoing haptic feedback.

#### Returns

`void`

***

### triggerFeedback()

> **triggerFeedback**(`type`): `void`

Trigger haptic feedback with the specified type.

#### Parameters

##### type

[`HapticFeedbackType`](../type-aliases/HapticFeedbackType.md)

The type of haptic feedback to trigger

#### Returns

`void`

***

### triggerLong()

> **triggerLong**(): `void`

Trigger long haptic feedback.
Uses long feedback pattern.

#### Returns

`void`

***

### triggerShort()

> **triggerShort**(): `void`

Trigger short haptic feedback.
Uses short feedback pattern.

#### Returns

`void`
