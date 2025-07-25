[**@microblink/blinkid**](../README.md)

***

[@microblink/blinkid](../README.md) / createProxyWorker

# Variable: createProxyWorker()

> `const` **createProxyWorker**: (`resourcesLocation?`) => `Promise`\<`Remote`\>

Creates a Comlink-proxied Web Worker

## Parameters

### resourcesLocation?

`string`

where the "resources" directory is placed, default
is `window.location.href`

## Returns

`Promise`\<`Remote`\>

a Comlink-proxied instance of the Web Worker
