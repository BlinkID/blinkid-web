/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import {
  defineConfig,
  presetUno,
  transformerDirectives,
  type PresetUnoTheme,
} from "unocss";
import {
  addScaleMultiplier,
  createSpacingRules,
  sizeObject,
} from "./src/_rules/index.ts";

export default defineConfig({
  presets: [presetUno()],
  rules: [...createSpacingRules()],
  extendTheme: (theme: PresetUnoTheme) => {
    return {
      ...theme,
      breakpoints: {
        xs: "380px",
        ...theme.breakpoints,
      },
    };
  },
  shortcuts: {
    "btn-focus":
      "focus:outline focus:outline-2px focus:outline-solid focus:outline-accent-400 focus:outline-offset-4px",
    "btn-disabled":
      "[&[disabled]]:cursor-not-allowed [&[disabled]]:bg-gray-200 [&[disabled]]:text-gray-500 hover:[&[disabled]]:bg-gray-200 hover:[&[disabled]]:text-gray-500 [&[disabled]]:ring-0",

    btn: "px-5 py-1 text-sm text-nowrap rounded-10 border-none transition-colors transition-duration-100 appearance-none h-[2.5rem] btn-disabled btn-focus",

    "btn-primary":
      "btn bg-primary text-white hover:bg-accent-700 active:bg-accent-800",
    "btn-secondary":
      "btn bg-transparent text-primary ring-primary ring-1 hover:bg-accent-25 hover:ring-accent-700 hover:text-accent-700 active:ring-accent-800 active:text-accent-800 active:bg-accent-50",
  },
  theme: {
    spacing: sizeObject,
    // would be nice if there was a single property to define all sizing,
    // like spacing, but for now we have to define each property separately
    blockSize: sizeObject,
    inlineSize: sizeObject,
    width: sizeObject,
    height: sizeObject,
    minWidth: sizeObject,
    minHeight: sizeObject,
    // TODO: see why max-width is not working
    maxWidth: sizeObject,
    maxHeight: sizeObject,
    borderRadius: sizeObject,
    // prettier-ignore
    fontSize: {
      ...sizeObject,
      'xs':   [addScaleMultiplier('0.75', "rem"),   addScaleMultiplier('1', "rem")],
      'sm':   [addScaleMultiplier('0.875', "rem"),  addScaleMultiplier('1.25', "rem")],
      'base': [addScaleMultiplier('1', "rem"),      addScaleMultiplier('1.5', "rem")],
      'lg':   [addScaleMultiplier('1.125', "rem"),  addScaleMultiplier('1.75', "rem")],
      'xl':   [addScaleMultiplier('1.25', "rem"),   addScaleMultiplier('1.75', "rem")],
      '2xl':  [addScaleMultiplier('1.5', "rem"),    addScaleMultiplier('2', "rem")],
      '3xl':  [addScaleMultiplier('1.875', "rem"),  addScaleMultiplier('2.25', "rem")],
      '4xl':  [addScaleMultiplier('2.25', "rem"),   addScaleMultiplier('2.5', "rem")],
      '5xl':  [addScaleMultiplier('3', "rem"),      addScaleMultiplier('1')],
      '6xl':  [addScaleMultiplier('3.75', "rem"),   addScaleMultiplier('1')],
      '7xl':  [addScaleMultiplier('4.5', "rem"),    addScaleMultiplier('1')],
      '8xl':  [addScaleMultiplier('6', "rem"),      addScaleMultiplier('1')],
      '9xl':  [addScaleMultiplier('8', "rem"),      addScaleMultiplier('1')],
    },
    colors: {
      black: "rgb(var(--color-black-rgb-value) / <alpha-value>)",
      white: "rgb(var(--color-white-rgb-value) / <alpha-value>)",
      primary: "rgb(var(--color-primary) / <alpha-value>)",
      accent: {
        "25": "rgb(var(--color-accent-25-rgb-value) / <alpha-value>)",
        "50": "rgb(var(--color-accent-50-rgb-value) / <alpha-value>)",
        "100": "rgb(var(--color-accent-100-rgb-value) / <alpha-value>)",
        "200": "rgb(var(--color-accent-200-rgb-value) / <alpha-value>)",
        "300": "rgb(var(--color-accent-300-rgb-value) / <alpha-value>)",
        "400": "rgb(var(--color-accent-400-rgb-value) / <alpha-value>)",
        "500": "rgb(var(--color-accent-500-rgb-value) / <alpha-value>)",
        "600": "rgb(var(--color-accent-600-rgb-value) / <alpha-value>)",
        "700": "rgb(var(--color-accent-700-rgb-value) / <alpha-value>)",
        "800": "rgb(var(--color-accent-800-rgb-value) / <alpha-value>)",
        "900": "rgb(var(--color-accent-900-rgb-value) / <alpha-value>)",
      },
      error: {
        "25": "rgb(var(--color-error-25-rgb-value) / <alpha-value>)",
        "50": "rgb(var(--color-error-50-rgb-value) / <alpha-value>)",
        "100": "rgb(var(--color-error-100-rgb-value) / <alpha-value>)",
        "200": "rgb(var(--color-error-200-rgb-value) / <alpha-value>)",
        "300": "rgb(var(--color-error-300-rgb-value) / <alpha-value>)",
        "400": "rgb(var(--color-error-400-rgb-value) / <alpha-value>)",
        "500": "rgb(var(--color-error-500-rgb-value) / <alpha-value>)",
        "600": "rgb(var(--color-error-600-rgb-value) / <alpha-value>)",
        "700": "rgb(var(--color-error-700-rgb-value) / <alpha-value>)",
        "800": "rgb(var(--color-error-800-rgb-value) / <alpha-value>)",
        "900": "rgb(var(--color-error-900-rgb-value) / <alpha-value>)",
      },
      success: {
        "25": "rgb(var(--color-success-25-rgb-value) / <alpha-value>)",
        "50": "rgb(var(--color-success-50-rgb-value) / <alpha-value>)",
        "100": "rgb(var(--color-success-100-rgb-value) / <alpha-value>)",
        "200": "rgb(var(--color-success-200-rgb-value) / <alpha-value>)",
        "300": "rgb(var(--color-success-300-rgb-value) / <alpha-value>)",
        "400": "rgb(var(--color-success-400-rgb-value) / <alpha-value>)",
        "500": "rgb(var(--color-success-500-rgb-value) / <alpha-value>)",
        "600": "rgb(var(--color-success-600-rgb-value) / <alpha-value>)",
        "700": "rgb(var(--color-success-700-rgb-value) / <alpha-value>)",
        "800": "rgb(var(--color-success-800-rgb-value) / <alpha-value>)",
        "900": "rgb(var(--color-success-900-rgb-value) / <alpha-value>)",
      },
      warning: {
        "25": "rgb(var(--color-warning-25-rgb-value) / <alpha-value>)",
        "50": "rgb(var(--color-warning-50-rgb-value) / <alpha-value>)",
        "100": "rgb(var(--color-warning-100-rgb-value) / <alpha-value>)",
        "200": "rgb(var(--color-warning-200-rgb-value) / <alpha-value>)",
        "300": "rgb(var(--color-warning-300-rgb-value) / <alpha-value>)",
        "400": "rgb(var(--color-warning-400-rgb-value) / <alpha-value>)",
        "500": "rgb(var(--color-warning-500-rgb-value) / <alpha-value>)",
        "600": "rgb(var(--color-warning-600-rgb-value) / <alpha-value>)",
        "700": "rgb(var(--color-warning-700-rgb-value) / <alpha-value>)",
        "800": "rgb(var(--color-warning-800-rgb-value) / <alpha-value>)",
        "900": "rgb(var(--color-warning-900-rgb-value) / <alpha-value>)",
      },
      "deep-blue": {
        "25": "rgb(var(-color-deep-blue-25-rgb-value) / <alpha-value>)",
        "50": "rgb(var(-color-deep-blue-50-rgb-value) / <alpha-value>)",
        "100": "rgb(var(-color-deep-blue-100-rgb-value) / <alpha-value>)",
        "200": "rgb(var(-color-deep-blue-200-rgb-value) / <alpha-value>)",
        "300": "rgb(var(-color-deep-blue-300-rgb-value) / <alpha-value>)",
        "400": "rgb(var(-color-deep-blue-400-rgb-value) / <alpha-value>)",
        "500": "rgb(var(-color-deep-blue-500-rgb-value) / <alpha-value>)",
        "600": "rgb(var(-color-deep-blue-600-rgb-value) / <alpha-value>)",
        "700": "rgb(var(-color-deep-blue-700-rgb-value) / <alpha-value>)",
        "800": "rgb(var(-color-deep-blue-800-rgb-value) / <alpha-value>)",
        "900": "rgb(var(-color-deep-blue-900-rgb-value) / <alpha-value>)",
      },
      "light-blue": {
        "25": "rgb(var(-color-light-blue-25-rgb-value) / <alpha-value>)",
        "50": "rgb(var(-color-light-blue-50-rgb-value) / <alpha-value>)",
        "100": "rgb(var(-color-light-blue-100-rgb-value) / <alpha-value>)",
        "200": "rgb(var(-color-light-blue-200-rgb-value) / <alpha-value>)",
        "300": "rgb(var(-color-light-blue-300-rgb-value) / <alpha-value>)",
        "400": "rgb(var(-color-light-blue-400-rgb-value) / <alpha-value>)",
        "500": "rgb(var(-color-light-blue-500-rgb-value) / <alpha-value>)",
        "600": "rgb(var(-color-light-blue-600-rgb-value) / <alpha-value>)",
        "700": "rgb(var(-color-light-blue-700-rgb-value) / <alpha-value>)",
        "800": "rgb(var(-color-light-blue-800-rgb-value) / <alpha-value>)",
        "900": "rgb(var(-color-light-blue-900-rgb-value) / <alpha-value>)",
      },
      gray: {
        "50": "rgb(var(--color-gray-50-rgb-value) / <alpha-value>)",
        "100": "rgb(var(--color-gray-100-rgb-value) / <alpha-value>)",
        "200": "rgb(var(--color-gray-200-rgb-value) / <alpha-value>)",
        "300": "rgb(var(--color-gray-300-rgb-value) / <alpha-value>)",
        "400": "rgb(var(--color-gray-400-rgb-value) / <alpha-value>)",
        "500": "rgb(var(--color-gray-500-rgb-value) / <alpha-value>)",
        "600": "rgb(var(--color-gray-600-rgb-value) / <alpha-value>)",
        "700": "rgb(var(--color-gray-700-rgb-value) / <alpha-value>)",
        "800": "rgb(var(--color-gray-800-rgb-value) / <alpha-value>)",
        "900": "rgb(var(--color-gray-900-rgb-value) / <alpha-value>)",
        "950": "rgb(var(--color-gray-950-rgb-value) / <alpha-value>)",
      },
      "blue-gray": {
        "50": "rgb(var(--color-dark-50-rgb-value) / <alpha-value>)",
        "100": "rgb(var(--color-dark-100-rgb-value) / <alpha-value>)",
        "200": "rgb(var(--color-dark-200-rgb-value) / <alpha-value>)",
        "300": "rgb(var(--color-dark-300-rgb-value) / <alpha-value>)",
        "400": "rgb(var(--color-dark-400-rgb-value) / <alpha-value>)",
        "500": "rgb(var(--color-dark-500-rgb-value) / <alpha-value>)",
        "600": "rgb(var(--color-dark-600-rgb-value) / <alpha-value>)",
        "700": "rgb(var(--color-dark-700-rgb-value) / <alpha-value>)",
        "800": "rgb(var(--color-dark-800-rgb-value) / <alpha-value>)",
        "900": "rgb(var(--color-dark-900-rgb-value) / <alpha-value>)",
        "950": "rgb(var(--color-dark-950-rgb-value) / <alpha-value>)",
      },
    },
  },
  transformers: [transformerDirectives()],
});
