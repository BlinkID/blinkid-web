import { getPackagePath, linkResources } from "@microblink/utils";
import { defineConfig } from "vite";
import { dependencies } from "./package.json";
import { fs, path } from "zx";

export default defineConfig((config) => ({
  build: {
    sourcemap: config.mode === "development",
    minify: config.mode === "production",
    target: "es2022",
    lib: {
      formats: ["es"],
      entry: "./src/index.ts",
      fileName: "blinkid",
    },
  },
  plugins: [
    {
      name: "move-resources",
      buildStart: async () => {
        if (ranOnce) {
          return;
        }
        await moveBlinkIdResources();
        ranOnce = true;
      },
    },
  ],
}));

let ranOnce = false;
type Dependency = keyof typeof dependencies;

async function moveBlinkIdResources() {
  const packageName: Dependency = "@microblink/blinkid-core";
  const pkgPath = getPackagePath(packageName);
  const distPath = path.join(pkgPath, "dist", "resources");
  const files = fs.readdirSync(distPath);

  fs.ensureDirSync(`public/resources`);

  for (const filePath of files) {
    await linkResources(
      path.join(distPath, filePath),
      path.join("public/resources", filePath),
    );
  }
}
