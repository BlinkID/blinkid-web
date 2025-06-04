# BlinkID Browser

## Quickstart

### Install as a dependency

```
npm install @microblink/blinkid
```

Or use another package manager, such as `yarn` or `pnpm`:

- `yarn add @microblink/blinkid`
- `pnpm add @microblink/blinkid`

### Get a license key

You also need a license key. Go to our [developer portal](https://developer.microblink.com/license/new):

- Product: **BlinkID**
- Platform: **In-browser**
- Domain: localhost if you're just testing, otherwise the domain where your app is hosted

This license key needs to be available to the SDK.

The best way to expose the license key is through an .env file. In this tutorial, we'll be using Vite as the bundler and `VITE_LICENSE_KEY` as the variable name, but you could implement the same thing in another bundler. Just make sure to pass the value of the license key to the `licenseKey` parameter of the `createBlinkId` function.

For example, using Vite:

```bash
echo 'VITE_LICENSE_KEY=<your license key here>' > .env.local
```

(Or use another, more appropriate .env file, [depending on the environment](https://vite.dev/guide/env-and-mode#env-files).)

### Integrate into your app

```js
import { createBlinkId } from "@microblink/blinkid";

const blinkid = await createBlinkId({
  licenseKey: import.meta.env.VITE_LICENSE_KEY,
});
```

The above is a minimal example of how to import and initialize scanning in your app.

You could, for example, show the extracted information in the console (taken from the [blinkid-simple](https://github.com/BlinkID/blinkid-web/tree/main/apps/examples/blinkid-simple) demo app):


```js
blinkid.addOnResultCallback((result) => {
  console.log("Result:", result);
  void blinkid.destroy();
});
```

### Host resources

In order to integrate the SDK code for web scanning, you need to serve the WebAssembly binary to your app under `/resources`. The contents must be those in `node_modules/@microblink/blinkid/dist/resources/`.

If you use Vite as your bundler, you can run `vite build` and the resulting `dist` directory will contain the resources at the expected path. Similarly, `vite` will do the same if you are running a local development server.

Some other requirements related to hosting resources:

- Must be served in a [secure context](https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts).
- For multithreaded builds, your site must be [cross-origin isolated](https://web.dev/articles/why-coop-coep):

  ```
  Cross-Origin-Embedder-Policy: require-corp
  Cross-Origin-Opener-Policy: same-origin
  ```

### Example apps

Explore example applications in the GitHub repository for ready-to-run demos:

- **[blinkid-simple](https://github.com/BlinkID/blinkid-web/tree/main/apps/examples/blinkid-simple)**: Minimal integration with default UI.
- **[blinkid-core-api](https://github.com/BlinkID/blinkid-web/tree/main/apps/examples/blinkid-core-api)**: Low-level usage of the core API.
- **[blinkid-advanced-setup](https://github.com/BlinkID/blinkid-web/tree/main/apps/examples/blinkid-advanced-setup)**: Custom UI and advanced configuration.
- **[blinkid-preload](https://github.com/BlinkID/blinkid-web/tree/main/apps/examples/blinkid-preload)**: Preloading resources for faster startup.

Each example demonstrates different integration patterns and features.

## Guides

Todo!

## Reference

Todo!

## Project structure

This project is set up as a monorepo. The SDK is split into multiple packages, located inside the `/packages` directory.

### Project quickstart

1. Install dependencies:

   ```
   nvm use --lts
   pnpm install
   ```

2. Build the project:

   ```
   pnpm build
   ```


4. Go to one of the example apps in `apps/examples`, create a local file for environment variables, and add your license key:

   ```
   cd apps/examples/blinkid-simple
   touch .env.local
   echo 'VITE_LICENSE_KEY=<your license key here>' > .env.local
   ```

5. From the example app directory, start the development server:

   ```
   pnpm dev
   ```

6. In the browser, navigate to `localhost:3000` and perform your first scan.


### Published packages

Published packages can be found here:

- https://www.npmjs.com/package/@microblink/blinkid
- https://www.npmjs.com/package/@microblink/blinkid-core
- https://www.npmjs.com/package/@microblink/blinkid-ux-manager
- https://www.npmjs.com/package/@microblink/camera-manager