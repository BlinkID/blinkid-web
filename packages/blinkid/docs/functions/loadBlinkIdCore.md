[**@microblink/blinkid**](../README.md)

***

[@microblink/blinkid](../README.md) / loadBlinkIdCore

# Function: loadBlinkIdCore()

> **loadBlinkIdCore**(`settings`, `progressCallback?`): `Promise`\<\{ `progressStatusCallback?`: `Promise`\<`undefined`\> \| `Remote`\<[`ProgressStatusCallback`](../type-aliases/ProgressStatusCallback.md)\>; `createBlinkIdScanningSession`: `Promise`\<`Remote`\<`object` & `object` & `ProxyMarked`\>\>; `createProxySession`: `Promise`\<`Remote`\<`object` & `object` & `ProxyMarked`\>\>; `initBlinkId`: `Promise`\<`void`\>; `ping`: `Promise`\<`number`\>; `terminate`: `Promise`\<`void`\>; \}\>

Creates and initializes a BlinkID core instance.

## Parameters

### settings

Configuration for BlinkID initialization including license key and resources location

#### initialMemory?

`number`

The initial memory allocation for the Wasm module, in megabytes.
Larger values may improve performance but increase memory usage.

#### licenseKey

`string`

The license key required to unlock and use the BlinkID SDK.
This must be a valid license key obtained from Microblink.

#### microblinkProxyUrl?

`string`

The URL of the Microblink proxy server. This proxy handles requests to Microblink's Baltazar and Ping servers.

**Requirements:**
- Must be a valid HTTPS URL
- The proxy server must implement the expected Microblink API endpoints
- This feature is only available if explicitly permitted by your license

**Endpoints:**
- Ping: `{proxyUrl}/ping`
- Baltazar: `{proxyUrl}/api/v2/status/check`

**Example**

```ts
"https://your-proxy.example.com"
```

#### resourcesLocation?

`string`

The parent directory where the `/resources` directory is hosted.
Defaults to `window.location.href`, at the root of the current page.

#### useLightweightBuild?

`boolean`

Whether to use the lightweight build of the SDK.
Lightweight builds have reduced size but may have limited functionality.

#### userId?

`string`

A unique identifier for the user/session.
Used for analytics and tracking purposes.

#### wasmVariant?

`WasmVariant`

The WebAssembly module variant to use.
Different variants may offer different performance/size tradeoffs.

### progressCallback?

[`ProgressStatusCallback`](../type-aliases/ProgressStatusCallback.md)

Optional callback for tracking resource download progress (WASM, data files)

## Returns

`Promise`\<\{ `progressStatusCallback?`: `Promise`\<`undefined`\> \| `Remote`\<[`ProgressStatusCallback`](../type-aliases/ProgressStatusCallback.md)\>; `createBlinkIdScanningSession`: `Promise`\<`Remote`\<`object` & `object` & `ProxyMarked`\>\>; `createProxySession`: `Promise`\<`Remote`\<`object` & `object` & `ProxyMarked`\>\>; `initBlinkId`: `Promise`\<`void`\>; `ping`: `Promise`\<`number`\>; `terminate`: `Promise`\<`void`\>; \}\>

Promise that resolves with initialized BlinkID core instance

## Throws

Error if initialization fails
