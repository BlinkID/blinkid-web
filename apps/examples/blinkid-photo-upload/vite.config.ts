/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import { getPackagePath, linkResources } from "@microblink/utils";
import dns from "dns";
import { ServerOptions, defineConfig } from "vite";
import mkcert from "vite-plugin-mkcert";
import { qrcode } from "vite-plugin-qrcode";
import solidPlugin from "vite-plugin-solid";
import { fs } from "zx";
import { dependencies } from "./package.json";

// https://vitejs.dev/guide/migration.html#architecture-changes-and-legacy-options
dns.setDefaultResultOrder("verbatim");

const serverOptions: ServerOptions = {
  port: 3000,
  // hmr: false,
  // host: true,
  headers: {
    "Cross-Origin-Embedder-Policy": "require-corp",
    "Cross-Origin-Opener-Policy": "same-origin",
  },
};

export default defineConfig((config) => {
  return {
    build: {
      sourcemap: config.mode === "development",
      target: "es2022",
    },
    plugins: [
      {
        name: "move-resources",
        buildStart: async () => {
          if (ranOnce) {
            return;
          }
          moveResources("@microblink/blinkid-core");
          ranOnce = true;
        },
      },
      qrcode(),
      solidPlugin(),
      // Generates certificates for https
      mkcert(),
    ],
    server: serverOptions,
    preview: serverOptions,
  };
});

let ranOnce = false;

type Dependency = keyof typeof dependencies;

async function moveResources(packagePath: Dependency) {
  const pkgPath = getPackagePath(packagePath);
  const resourcesPath = `${pkgPath}/dist/resources`;
  const files = fs.readdirSync(resourcesPath);

  fs.ensureDirSync(`public/resources`);

  for (const path of files) {
    await linkResources(`${resourcesPath}/${path}`, `public/resources/${path}`);
  }
}
