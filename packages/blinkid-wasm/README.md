# @microblink/blinkid-wasm

This package contains the WebAssembly (Wasm) and native bindings for the BlinkID SDK. It provides the core C++ code compiled to WebAssembly, along with Emscripten bindings for use in web environments.

## Overview

- Provides the low-level Wasm module for BlinkID document scanning.
- Exposes C++ APIs to JavaScript via Emscripten embind.
- Used internally by higher-level BlinkID packages such as [`@microblink/blinkid-core`](https://www.npmjs.com/package/@microblink/blinkid-core).
- Not intended for direct use by end-users; use [`@microblink/blinkid`](https://www.npmjs.com/package/@microblink/blinkid) or [`@microblink/blinkid-core`](https://www.npmjs.com/package/@microblink/blinkid-core) instead.

## Usage

This package is not published or intended for direct consumption. It is bundled and distributed as part of the BlinkID browser SDK packages.

If you are looking to use BlinkID in your project, please refer to:

- [`@microblink/blinkid`](https://www.npmjs.com/package/@microblink/blinkid)
- [`@microblink/blinkid-core`](https://www.npmjs.com/package/@microblink/blinkid-core)

The output WebAssembly and supporting JS files can be found in the `dist/` directory.
