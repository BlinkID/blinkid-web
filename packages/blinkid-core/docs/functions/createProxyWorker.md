[**@microblink/blinkid-core**](../README.md)

***

[@microblink/blinkid-core](../README.md) / createProxyWorker

# Function: createProxyWorker()

> **createProxyWorker**(`resourcesLocation`): `Promise`\<`Remote`\<[`BlinkIdWorkerProxy`](../type-aliases/BlinkIdWorkerProxy.md)\>\>

Creates a Comlink-proxied Web Worker

## Parameters

### resourcesLocation

`string` = `window.location.href`

where the "resources" directory is placed, default
is `window.location.href`

## Returns

`Promise`\<`Remote`\<[`BlinkIdWorkerProxy`](../type-aliases/BlinkIdWorkerProxy.md)\>\>

a Comlink-proxied instance of the Web Worker
