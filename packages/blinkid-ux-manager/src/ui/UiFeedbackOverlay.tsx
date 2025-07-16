/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import { Rerun } from "@solid-primitives/keyed";
import {
  Component,
  createEffect,
  createSignal,
  Match,
  onCleanup,
  ParentComponent,
  Show,
  Switch,
} from "solid-js";
import { Motion, Presence } from "solid-motionone";

import { clsx } from "clsx";
import {
  BlinkIdUiState,
  blinkIdUiStateMap,
  firstSideCapturedStates,
} from "../core/blinkid-ui-state";
import { useLocalization } from "./LocalizationContext";
import { feedbackMessages } from "./feedbackMessages";

// icons
import CardIconBack from "./assets/reticles/card-back.svg?component-solid";
import CardIconFront from "./assets/reticles/card-front.svg?component-solid";
import DoneIcon from "./assets/reticles/done.svg?component-solid";
import FullIcon from "./assets/reticles/full.svg?component-solid";
import PassportBottom from "./assets/reticles/passport-bottom.svg?component-solid";
import PassportHighlight from "./assets/reticles/passport-highlight.svg?component-solid";
import PassportTop from "./assets/reticles/passport-top.svg?component-solid";
import SearchIcon from "./assets/reticles/searching.svg?component-solid";
import ScanIcon from "./assets/reticles/spin.svg?component-solid";

/**
 * The UiFeedbackOverlay component.
 *
 * @param props - The props for the UiFeedbackOverlay component.
 * @returns The UiFeedbackOverlay component.
 */
export const UiFeedbackOverlay: Component<{
  uiState: BlinkIdUiState;
}> = (props) => {
  /**
   * This is a hack since we don't have a discrete state for both a successful
   * scan and a card flip.
   */
  const [showSuccessOnly, setShowSuccessOnly] = createSignal(false);
  let timeout: number;

  /**
   * Handles showing the success feedback before other states defined in `firstSideCapturedStates`
   */
  createEffect(() => {
    if (firstSideCapturedStates.includes(props.uiState.key)) {
      setShowSuccessOnly(true);

      // TODO: incorrectly resolving to NodeJS timeout
      timeout = window.setTimeout(
        () => setShowSuccessOnly(false),
        blinkIdUiStateMap.DOCUMENT_CAPTURED.minDuration,
      );
    } else {
      setShowSuccessOnly(false);
      clearTimeout(timeout!);
    }

    onCleanup(() => clearTimeout(timeout!));
  });

  const isPassportCaptureState = () => {
    return (
      props.uiState.key === "MOVE_TOP" ||
      props.uiState.key === "MOVE_LEFT" ||
      props.uiState.key === "MOVE_RIGHT"
    );
  };

  const getDirection = () => {
    switch (props.uiState.key) {
      case "MOVE_TOP":
        return "top";
      case "MOVE_LEFT":
        return "left";
      case "MOVE_RIGHT":
        return "right";
      default:
        return "top";
    }
  };

  return (
    <>
      <div
        class="absolute left-0 top-0 grid size-full select-none place-items-center
          contain-strict overflow-hidden"
      >
        <div>
          {/* we only want the actual reticle-like spinners to remain in the screen center
          which is why the container is sized the same dimensions as the reticle

          The layout size shouldn't change between the different reticle types, so that the
          message positioning is consistent.
           */}
          <div class="size-24">
            <div class="relative size-full grid place-items-center" aria-hidden>
              {/* default spinners */}
              <Switch>
                <Match when={props.uiState.reticleType === "searching"}>
                  <SearchReticle />
                </Match>
                <Match when={props.uiState.reticleType === "processing"}>
                  <ScanningReticle />
                </Match>
                <Match when={props.uiState.reticleType === "error"}>
                  <ErrorReticle />
                </Match>

                {/* Success – reused between multiple states */}
                <Match
                  when={
                    props.uiState.reticleType === "done" || showSuccessOnly()
                  }
                >
                  <SuccessFeedback />
                </Match>

                {/* flip card */}
                <Match
                  when={
                    props.uiState.reticleType === "flip" && !showSuccessOnly()
                  }
                >
                  <FlipCardFeedback />
                </Match>

                {/* move passport */}
                <Match when={isPassportCaptureState() && !showSuccessOnly()}>
                  <PassportAnimation
                    direction={getDirection()}
                    duration={blinkIdUiStateMap[props.uiState.key].minDuration}
                  />
                </Match>
              </Switch>
            </div>
          </div>

          {/* feedback message */}
          <Show when={!showSuccessOnly()}>
            <UiFeedbackMessage uiState={props.uiState} />
          </Show>
        </div>
      </div>
    </>
  );
};

/**
 * The SuccessFeedback component. This is the component that displays the
 * feedback for the success state.
 *
 * @returns The SuccessFeedback component.
 */
const SuccessFeedback: Component = () => {
  return (
    <Motion
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{
        opacity: 1,
        scale: 1,
        transition: { easing: "ease-in-out", duration: 0.3 },
      }}
      exit={{ opacity: 0, scale: 5 }}
    >
      <DoneIcon class="[&>path]:fill-[initial] size-24 drop-shadow-[0_0_15px_rgba(0,0,0,0.1)]" />
    </Motion>
  );
};

/**
 * The FlipCardFeedback component. This is the component that displays the
 * feedback for the flip card state.
 *
 * @returns The FlipCardFeedback component.
 */
const FlipCardFeedback: Component = () => {
  const cardSideStyles = `backface-hidden drop-shadow-[0_0_15px_rgba(0,0,0,0.1)]`;

  return (
    <div class="absolute perspective-300px bottom-0">
      <Motion
        class="relative preserve-3d w-24"
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          rotateY: ["180deg"],
          transition: {
            rotateY: {
              duration: blinkIdUiStateMap.FLIP_CARD.minDuration / 1000,
            },
            opacity: {
              duration: 0.5,
            },
          },
        }}
        exit={{ opacity: 0 }}
      >
        {/* we don't set the dimensions, so that the ratio is naturally preserved */}
        <CardIconFront class={cardSideStyles} />
        <CardIconBack
          class={clsx(
            cardSideStyles,
            "absolute top-0 left-0 w-full transform rotate-y-180",
          )}
        />
      </Motion>
    </div>
  );
};

/**
 * The PassportAnimation component. This is the component that displays the
 * feedback for the passport animation state.
 *
 * @param props - The props for the PassportAnimation component.
 * @returns The PassportAnimation component.
 */
const PassportAnimation: Component<{
  direction: "top" | "right" | "left";
  duration: number;
}> = (props) => {
  const rotation = () => {
    switch (props.direction) {
      case "top":
        return "0deg";
      case "right":
        return "90deg";
      case "left":
        return "-90deg";
    }
  };

  return (
    <div class="absolute perspective-300px bottom-0">
      <Motion
        class="relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div class="relative" style={{ transform: `rotate(${rotation()})` }}>
          <Motion
            class="w-24"
            initial={{ opacity: 0.3 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: props.duration / 1000,
              easing: "ease",
            }}
          >
            <PassportTop class="[&>path]:fill-[currentColor] drop-shadow-[0_0_15px_rgba(0,0,0,0.1)]" />
          </Motion>

          <Motion
            class="w-24"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0.3 }}
            transition={{
              duration: props.duration / 1000,
              easing: "ease",
            }}
          >
            <PassportBottom class="[&>path]:fill-[currentColor] drop-shadow-[0_0_15px_rgba(0,0,0,0.1)]" />
          </Motion>

          <Motion
            class="absolute bottom-0 w-full"
            initial={{ y: "0" }}
            animate={{ y: "-100%" }}
            transition={{
              duration: props.duration / 1000,
              easing: "ease",
            }}
          >
            <PassportHighlight class="scale-130" />
          </Motion>
        </div>
      </Motion>
    </div>
  );
};

/**
 * The ReticleContainer component. This is the component that displays the
 * reticle container.
 *
 * @param props - The props for the ReticleContainer component.
 * @returns The ReticleContainer component.
 */
const ReticleContainer: ParentComponent<{
  type: BlinkIdUiState["reticleType"];
}> = (props) => {
  return (
    <Motion.div
      class={clsx(
        `absolute bottom-0 grid size-full place-items-center rounded-full
        backdrop-blur-xl bg-opacity-30`,
        props.type === "error" ? "bg-error-500 " : "bg-dark-100",
      )}
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 0.05 },
      }}
      transition={{ duration: 0.05 }}
    >
      {props.children}
    </Motion.div>
  );
};

/**
 * The SearchReticle component. This is the component that displays the
 * feedback for the search state.
 *
 * @returns The SearchReticle component.
 */
const SearchReticle: Component = () => (
  <ReticleContainer type="searching">
    <Motion
      class="will-change-transform"
      animate={{ opacity: 1, transform: "rotate(360deg)" }}
      transition={{
        transform: {
          duration: 1,
          easing: "ease-in-out",
          repeat: Infinity,
        },
      }}
    >
      <SearchIcon class="size-12" />
    </Motion>
  </ReticleContainer>
);

/**
 * The ErrorReticle component. This is the component that displays the
 * feedback for the error state.
 *
 * @returns The ErrorReticle component.
 */
const ErrorReticle: Component = () => (
  <ReticleContainer type="error">
    <FullIcon class="size-12" />
  </ReticleContainer>
);

/**
 * The ScanningReticle component. This is the component that displays the
 * feedback for the scanning state.
 *
 * @returns The ScanningReticle component.
 */
const ScanningReticle: Component = () => (
  <ReticleContainer type="processing">
    <Motion
      animate={{ opacity: 1, rotate: "360deg" }}
      transition={{
        rotate: {
          duration: 0.8,
          easing: [0.23, 0.58, 0.58, 0.23],
          repeat: Infinity,
        },
      }}
    >
      <ScanIcon class="size-12" />
    </Motion>
  </ReticleContainer>
);

/**
 * The UiFeedbackMessage component. This is the component that displays the
 * feedback message to the user. It is shown below the reticle.
 *
 * @param props - The props for the UiFeedbackMessage component.
 * @returns The UiFeedbackMessage component.
 */
const UiFeedbackMessage: Component<{
  uiState: BlinkIdUiState;
}> = (props) => {
  const { t } = useLocalization();

  const message = () => {
    const key = props.uiState.key;
    if (key in feedbackMessages) {
      return feedbackMessages[key];
    }

    return;
  };

  return (
    <div class="absolute left-0 mt-3 w-full flex justify-center p-inline-4">
      <Presence exitBeforeEnter>
        <Rerun on={() => props.uiState.key}>
          <Show when={message()}>
            <Motion.div
              initial={{ opacity: 0, transform: "translateY(2rem)" }}
              animate={{
                opacity: 1,
                transform: "translateY(0)",
                transition: { delay: 0.05 },
              }}
              transition={{ duration: 0.05 }}
              exit={{ opacity: 0, transform: "translateY(-2rem)" }}
              class="max-w-45 text-base gap-1 rounded-2 bg-opacity-30 bg-dark-100 px-2 py-3
                text-center text-balance text-white font-bold
                text-shadow-[0_1px_4px_rgba(0,0,0,0.1)] backdrop-blur-xl will-change-transform"
            >
              <div role="alert">{t[message()!]}</div>
            </Motion.div>
          </Show>
        </Rerun>
      </Presence>
    </div>
  );
};
