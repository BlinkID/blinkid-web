[**@microblink/blinkid**](../README.md)

***

[@microblink/blinkid](../README.md) / cameraManagerStore

# Variable: cameraManagerStore

> `const` **cameraManagerStore**: `Omit`\<`StoreApi`, `"subscribe"`\> & `object`

⚠️ DANGER AHEAD ⚠️

The Zustand store. Use only if you know what you're doing.

Never set the state as this will break the application logic. We do not have
two-way binding. Make sure you only observe the state.

Prefer using subscriptions if you require observable state.

## Type declaration

### subscribe()

> **subscribe**: \{(`listener`): () => `void`; \<`U`\>(`selector`, `listener`, `options?`): () => `void`; \}

#### Call Signature

> (`listener`): () => `void`

##### Parameters

###### listener

(`selectedState`, `previousSelectedState`) => `void`

##### Returns

> (): `void`

###### Returns

`void`

#### Call Signature

> \<`U`\>(`selector`, `listener`, `options?`): () => `void`

##### Type Parameters

###### U

`U`

##### Parameters

###### selector

(`state`) => `U`

###### listener

(`selectedState`, `previousSelectedState`) => `void`

###### options?

###### equalityFn?

(`a`, `b`) => `boolean`

###### fireImmediately?

`boolean`

##### Returns

> (): `void`

###### Returns

`void`

## See

https://github.com/pmndrs/zustand for more details.
