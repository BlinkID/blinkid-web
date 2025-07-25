[**@microblink/blinkid**](../README.md)

***

[@microblink/blinkid](../README.md) / cameraUiRefStore

# Variable: cameraUiRefStore

> `const` **cameraUiRefStore**: `Omit`\<`StoreApi`, `"subscribe"`\> & `object`

The camera UI ref store.

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
