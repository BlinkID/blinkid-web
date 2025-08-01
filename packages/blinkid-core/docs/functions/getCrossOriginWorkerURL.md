[**@microblink/blinkid-core**](../README.md)

***

[@microblink/blinkid-core](../README.md) / getCrossOriginWorkerURL

# Function: getCrossOriginWorkerURL()

> **getCrossOriginWorkerURL**(`originalWorkerUrl`, `_options`): `Promise`\<`string`\>

Gets a cross-origin worker URL as a data URL or blob URL. If the URL is same-origin, it will return the original URL.

## Parameters

### originalWorkerUrl

`string`

The original worker URL.

### \_options

`Options` = `{}`

The options for the worker.

## Returns

`Promise`\<`string`\>

A promise that resolves with the cross-origin worker URL.
