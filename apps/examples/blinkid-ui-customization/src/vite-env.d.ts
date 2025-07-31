/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_LICENCE_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// CSS Modules type support
declare module "*.module.css" {
  const classes: Record<string, string>;
  export default classes;
}
