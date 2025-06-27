/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import type { CameraManagerComponent } from "@microblink/camera-manager";
import {
  createContext,
  onCleanup,
  type ParentComponent,
  useContext,
} from "solid-js";
import { createStore, SetStoreFunction } from "solid-js/store";
import type { BlinkIdProcessingError } from "../core/BlinkIdProcessingError";
import type { BlinkIdUxManager } from "../core/BlinkIdUxManager";

export type BlinkIdUiStore = {
  blinkIdUxManager: BlinkIdUxManager;
  cameraManagerComponent: CameraManagerComponent;
  // TODO: should this be part of `BlinkIdUxManager`?
  errorState?: BlinkIdProcessingError;
  documentFiltered: boolean;
  showOnboardingGuide?: boolean;
  showHelpTooltipTimeout?: number;
  showHelpModal?: boolean;
  showHelpButton?: boolean;
  dismountFeedbackUi: () => void;
};

type BlinkIdUiStoreContextValue = {
  store: BlinkIdUiStore;
  updateStore: SetStoreFunction<BlinkIdUiStore>;
};

const BlinkIdUiStoreContext = createContext<BlinkIdUiStoreContextValue>();

export const BlinkIdUiStoreProvider: ParentComponent<{
  blinkIdUxManager: BlinkIdUxManager;
  cameraManagerComponent: CameraManagerComponent;
  showOnboardingGuide?: boolean;
  showHelpButton?: boolean;
  showHelpTooltipTimeout?: number;
  dismountFeedbackUi: () => void;
}> = (props) => {
  const [store, updateStore] = createStore<BlinkIdUiStore>(
    {} as BlinkIdUiStore,
  );

  // This needs to be created outside of `useEffect` since we
  // need it immediately on mount
  updateStore({
    /* eslint-disable solid/reactivity */
    blinkIdUxManager: props.blinkIdUxManager,
    cameraManagerComponent: props.cameraManagerComponent,
    showOnboardingGuide: props.showOnboardingGuide,
    showHelpTooltipTimeout: props.showHelpTooltipTimeout,
    showHelpButton: props.showHelpButton,
    dismountFeedbackUi: props.dismountFeedbackUi,
    /* eslint-enable solid/reactivity */
  });

  const contextValue = {
    store,
    updateStore,
  };

  onCleanup(() => {
    console.debug("BlinkIdUiStoreProvider cleanup");
  });

  return (
    <BlinkIdUiStoreContext.Provider value={contextValue}>
      {props.children}
    </BlinkIdUiStoreContext.Provider>
  );
};

export function useBlinkIdUiStore() {
  const ctx = useContext(BlinkIdUiStoreContext);
  if (!ctx) {
    throw new Error("BlinkIdUiStoreContext.Provider not in scope");
  }

  return ctx;
}
