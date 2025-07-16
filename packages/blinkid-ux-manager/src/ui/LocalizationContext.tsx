/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import {
  ParentComponent,
  createContext,
  createEffect,
  useContext,
} from "solid-js";
import { SetStoreFunction, createStore } from "solid-js/store";

import enLocaleStrings from "./locales/en";

/**
 * The locale record type.
 */
export type LocaleRecord = typeof enLocaleStrings;

/**
 * The localization strings type.
 */
export type LocalizationStrings = {
  // This allows for autocomplete for defaults, but also overriding
  // https://twitter.com/mattpocockuk/status/1709281782325977101
  // eslint-disable-next-line @typescript-eslint/ban-types
  [K in keyof LocaleRecord]: LocaleRecord[K] | (string & {});
};

/**
 * The localization context.
 */
const LocalizationContext = createContext<{
  t: LocalizationStrings;
  updateLocalization: SetStoreFunction<LocalizationStrings>;
}>();

/**
 * The localization provider.
 */
export const LocalizationProvider: ParentComponent<{
  userStrings?: Partial<LocalizationStrings>;
}> = (props) => {
  const [localizationStore, updateLocalizationStore] =
    // avoid initing with original as proxying to the original object will
    // mutate the original object on store updates
    createStore<LocalizationStrings>({} as LocalizationStrings);

  const mergedStrings = () => ({
    ...enLocaleStrings,
    ...props.userStrings,
  });

  // update store as a side-effects of userStrings changing
  createEffect(() => {
    updateLocalizationStore(mergedStrings());
  });

  const contextValue = {
    t: localizationStore,
    updateLocalization: updateLocalizationStore,
  };

  return (
    <LocalizationContext.Provider value={contextValue}>
      {props.children}
    </LocalizationContext.Provider>
  );
};

/**
 * The use localization hook.
 *
 * @returns The localization strings.
 */
export function useLocalization() {
  const ctx = useContext(LocalizationContext);
  if (!ctx) {
    throw new Error("LocalizationContext.Provider not in scope.");
  }
  return ctx;
}
