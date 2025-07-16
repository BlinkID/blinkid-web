/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import { type Rule, type PresetUnoTheme } from "unocss";

/**
 * 4px baseline grid, 0.25rem = 4px, respects --mb-size multiplier
 */
export const addScaleMultiplier = (value: string, unit?: string) =>
  `calc(var(--mb-size)*${value + (unit || "")})`;

function gridUnitToSize(value: number) {
  return addScaleMultiplier(String(value * 0.25), "rem");
}

function gridUnitToPx(value: number) {
  return value * 4;
}

const sizeArray = [...Array(100)].map((_, i) => gridUnitToSize(i));

export const sizeObject = sizeArray.reduce(
  (obj: Record<string, string>, value, index) => {
    obj[String(index)] = value;
    return obj;
  },
  {},
);

/**
 *
 * @param min grid units
 * @param vmin pixels
 * @param max grid units
 * @param vmax pixels
 * @returns something the browser can parse
 */
const fancyClamp = (min: number, vmin: number, max: number, vmax: number) => {
  const minPx = gridUnitToPx(min);
  const maxPx = gridUnitToPx(max);

  const slope = (maxPx - minPx) / (vmax - vmin);

  const clampMin = gridUnitToSize(min);
  const clampVal = `${gridUnitToSize(min)} + (100vw - ${vmin}px) * ${slope}`;
  const clampMax = gridUnitToSize(max);

  // TODO: `calc` is not needed inside `clamp`
  return `clamp(${clampMin}, ${clampVal}, ${clampMax})`;
};

const createLerped = (
  ruleKey: string,
  cssProperty: string,
): Rule<PresetUnoTheme> => {
  const breakpointKeysMatcher = "[a-z]+";
  const viewportPattern = `(?:\\d+|${breakpointKeysMatcher})`;

  const regex = new RegExp(
    `^lerp:${ruleKey}-(\\d+)@(${viewportPattern}),(\\d+)@(${viewportPattern})$`,
  );
  return [
    regex,
    (match: RegExpMatchArray, ruleContext) => {
      const theme = ruleContext.theme;
      const [_, min, vMin, max, vMax] = match;

      // Convert viewport values if they're breakpoint keys
      const resolveViewport = (viewport: string) => {
        // check if the string is a number
        if (!isNaN(parseInt(viewport))) {
          return parseInt(viewport);
        }

        if (viewport in theme.breakpoints) {
          return parseFloat(theme.breakpoints[viewport]);
        }

        return 1;
      };

      const clampedValue = fancyClamp(
        parseInt(min),
        resolveViewport(vMin),
        parseInt(max),
        resolveViewport(vMax),
      );

      /** CUSTOM COMMENT */
      return [{ [cssProperty]: clampedValue }];
    },
  ];
};

/**
 * TODO: there has to be a better way to do this...
 * @see https://unocss.dev/config/variants
 */
const pseudoClasses = [
  // all margins
  ["m", "margin"],
  ["mx", "margin-inline"],
  ["my", "margin-block"],
  ["mt", "margin-top"],
  ["mr", "margin-right"],
  ["mb", "margin-bottom"],
  ["ml", "margin-left"],
  ["gap", "gap"],

  // all paddings
  ["p", "padding"],
  ["px", "padding-inline"],
  ["py", "padding-block"],
  ["pt", "padding-top"],
  ["pr", "padding-right"],
  ["pb", "padding-bottom"],
  ["pl", "padding-left"],

  // sizing
  ["w", "width"],
  ["h", "height"],
  ["min-w", "min-width"],
  ["min-h", "min-height"],
  ["max-w", "max-width"],
  ["max-h", "max-height"],
  ["rounded", "border-radius"],
];

export const createSpacingRules = () => {
  const rules: Rule[] = pseudoClasses.map(([tw, css]) => {
    return createLerped(tw, css);
  });
  return rules;
};
