/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

declare module "*.module.scss" {
  const classes: { [key: string]: string };
  export default classes;
}

declare module "*.svg?component-solid" {
  import { Component } from "solid-js";
  const SVGComponent: Component<{ class?: string }>;
  export default SVGComponent;
}
