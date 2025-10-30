/// <reference types="vitest/config" />
/// <reference types="@vitest/browser/providers/playwright" />

import UnoCSS from "unocss/vite";
import { defineConfig, PluginOption } from "vite";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import externalize from "vite-plugin-externalize-dependencies";
import solidPlugin from "vite-plugin-solid";
import solidSvg from "vite-plugin-solid-svg";

// we need to externalize these deps because they share state between packages!
const externals = [
  /^solid-js/,
  /^@ark-ui/,
  "solid-zustand",
  "@microblink/camera-manager",
  "@microblink/blinkid-core",
];

export default defineConfig((config) => ({
  build: {
    sourcemap: config.mode === "development",
    minify: config.mode === "production",
    target: "es2022",
    lib: {
      formats: ["es"],
      entry: "./src/index.ts",
      fileName: "blinkid-ux-manager",
    },
    rollupOptions: {
      external: externals,
    },
  },
  test: {
    browser: {
      enabled: true,
      provider: "playwright",
      screenshotFailures: false,
      headless: true,
      instances: [
        {
          browser: "chromium",
          // Doesn't work:
          // headless: false,
        },
      ],
    },
  },
  plugins: [
    UnoCSS({
      configFile: "./uno.config.ts",
      envMode: config.mode === "production" ? "build" : "dev",
    }),
    cssInjectedByJsPlugin({
      useStrictCSP: true,
      injectCodeFunction: (cssCode) => {
        window.__blinkidUxManagerCssCode! = cssCode;
      },
    }),
    // `vite-plugin-externalize-dependencies` only works with `vite dev`
    externalize({
      // vitest fails otherwise
      externals: config.mode === "production" ? externals : [],
    }),
    solidPlugin(),
    solidSvg(),
  ] as PluginOption[],
}));

declare global {
  interface Window {
    __blinkidUxManagerCssCode?: string;
  }
}
