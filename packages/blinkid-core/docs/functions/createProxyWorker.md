[**@microblink/blinkid-core**](../README.md)

---

[@microblink/blinkid-core](../README.md) / createProxyWorker

# Function: createProxyWorker()

> **createProxyWorker**(`resourcesLocation`): `Promise`\<`Remote`\<`BlinkIdWorkerProxy`\>\>

Defined in: [packages/blinkid-core/src/createProxyWorker.ts:75](https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid-core/src/createProxyWorker.ts)

Creates a Comlink-proxied Web Worker

## Parameters

### resourcesLocation

`string` = `window.location.href`

where the "resources" directory is placed, default
is `window.location.href`

## Returns

`Promise`\<`Remote`\<`BlinkIdWorkerProxy`\>\>

a Comlink-proxied instance of the Web Worker
