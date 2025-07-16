/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import { getKeyWithHighestValue } from "./utils";
import { StringKeyOf } from "type-fest";

/**
 * Represents a UI state configuration with timing and weight parameters.
 * Used to define how different UI states should behave in the stabilization process.
 */
export type UiState = {
  /** Unique identifier for the UI state */
  key: string;

  /** Minimum duration (in milliseconds) this state should be displayed */
  minDuration: number;

  /**
   * If true, the event will be emitted once the previous event is done.
   * It bypasses the averaging process and is handled separately.
   */
  singleEmit?: boolean;

  /**
   * Initial weight for this state when it enters the stabilization queue.
   * Higher values give the state more influence in the averaging process.
   */
  initialWeight?: number;
};

/**
 * Represents a UI state event in the stabilization queue.
 * These events are processed to determine which UI state should be displayed.
 */
export type UiStateEvent = {
  /** Identifier matching a UI state key */
  key: string;

  /** High-resolution timestamp when the event occurred */
  timeStamp: DOMHighResTimeStamp;

  /** Current weight of this event in the stabilization process */
  currentWeight: number;

  /**
   * If true, this event will be emitted once the previous event completes.
   * It bypasses the normal stabilization process.
   */
  singleEmit?: boolean;
};

/**
 * Maps state keys to their corresponding UI state configurations.
 */
export type UiStateMap = Record<string, UiState>;

/**
 * FeedbackStabilizer provides UI state management with temporal smoothing.
 * 
 * It helps prevent UI "flickering" by:
 * - Maintaining a time-windowed history of UI state changes
 * - Applying weighted averaging to determine the most appropriate state
 * - Supporting immediate state changes through single-emit events
 * - Enforcing minimum display durations for states
 * 
 * @typeParam SdkSpecificStateMap - Type extending UiStateMap for SDK-specific states
 */
export class FeedbackStabilizer<SdkSpecificStateMap extends UiStateMap> {
  /** The initial key. */
  private initialKey: StringKeyOf<SdkSpecificStateMap>;
  /** The UI state map. */
  private uiStateMap: SdkSpecificStateMap;
  /** Time window (in ms) for considering UI state events. */
  private timeWindow = 3000;
  /** The decay rate. */
  /** Rate at which event weights decay over time */
  private decayRate = 0.95;
  /** Queue of regular UI state events within the time window */
  private eventQueue: UiStateEvent[] = [];
  /** Special queue for single-emit events that bypass normal stabilization */
  private singleEventQueue: UiStateEvent[] = [];
  /** Currently displayed state key */
  private currentKey: StringKeyOf<SdkSpecificStateMap>;
  /** Timestamp when current state started displaying */
  private currentStateStartTime = performance.now();
  /** Accumulated scores for each state in current calculation */
  private summedScores: Record<string, number> = {};
  /** History of scores for each state */
  private scoreBoard: Record<string, number[]> = {};

  /**
   * Gets the currently active UI state configuration.
   * 
   * @returns The currently active UI state configuration.
   */
  get currentState() {
    return this.uiStateMap[this.currentKey];
  }

  /**
   * Gets a copy of the current event queue for debugging.
   * 
   * @returns A copy of the current event queue.
   */
  getEventQueue() {
    return structuredClone(this.eventQueue);
  }

  /**
   * Gets the current summed scores for each state.
   * 
   * @returns The current summed scores for each state.
   */
  getScores() {
    return structuredClone(this.summedScores);
  }

  /**
   * Gets the score history for each state.
   * 
   * @returns The score history for each state.
   */
  getScoreBoard() {
    return structuredClone(this.scoreBoard);
  }

  /**
   * Updates the time window used for state stabilization
   * 
   * @param timeWindow - New time window in milliseconds
   */
  setTimeWindow(timeWindow: number) {
    this.timeWindow = timeWindow;
  }

  /**
   * Creates a new FeedbackStabilizer instance.
   * 
   * @param uiStateMap - Map of all possible UI states and their configurations
   * @param initialKey - Key of the initial UI state to display
   * @param timeWindow - Optional custom time window (in ms) for state averaging
   * @param decayRate - Optional custom decay rate for event weights
   */
  constructor(
    uiStateMap: SdkSpecificStateMap,
    initialKey: StringKeyOf<SdkSpecificStateMap>,
    timeWindow?: number,
    decayRate?: number,
  ) {
    this.uiStateMap = uiStateMap;
    this.initialKey = initialKey;
    this.currentKey = initialKey;

    this.getNewUiState(initialKey);

    if (timeWindow) {
      this.timeWindow = timeWindow;
    }
    if (decayRate) {
      this.decayRate = decayRate;
    }
  }

  /**
   * Resets the stabilizer to its initial state.
   * 
   * @returns The initial state.
   */
  reset() {
    this.currentKey = this.initialKey;
    this.eventQueue = [];
    this.singleEventQueue = [];
    this.summedScores = {};
  }

  /**
   * Checks if enough time has passed to show a new UI state
   * 
   * @returns true if the current state's minimum duration has elapsed
   */
  canShowNewUiState = () => {
    return (
      performance.now() - this.currentStateStartTime >=
      this.currentState.minDuration
    );
  };

  /**
   * Processes a new UI state event and determines the state to display.
   *
   * This method:
   * 1. Handles single-emit events that bypass normal stabilization
   * 2. Maintains a time-windowed queue of regular events
   * 3. Applies temporal averaging with decay to determine the winning state
   *
   * @param incomingUiStateKey - Key of the new UI state event
   * @returns The UI state that should be displayed.
   */
  getNewUiState(
    incomingUiStateKey: StringKeyOf<SdkSpecificStateMap>,
  ): SdkSpecificStateMap[StringKeyOf<SdkSpecificStateMap>] {
    const now = performance.now();

    const initialWeight = this.uiStateMap[incomingUiStateKey].initialWeight;

    // create new event
    const uiStateEvent: UiStateEvent = {
      key: incomingUiStateKey,
      timeStamp: now,
      currentWeight: initialWeight ?? 1,
      singleEmit: this.uiStateMap[incomingUiStateKey].singleEmit,
    };

    // single emitted events are placed in a different queue and emitted once the previous event is done
    if (uiStateEvent.singleEmit) {
      this.singleEventQueue.push(uiStateEvent);
    }

    // if there is a single event in the queue, show it
    if (this.singleEventQueue.length > 0 && this.canShowNewUiState()) {
      const singleEvent = this.singleEventQueue.shift()!; // we know it's not empty
      // clear the queue of regular events
      this.eventQueue = [];
      // early exit, no need to calculate the state
      this.currentKey = singleEvent.key as StringKeyOf<SdkSpecificStateMap>;
      this.currentStateStartTime = now;
      return this.uiStateMap[
        singleEvent.key
      ] as SdkSpecificStateMap[StringKeyOf<SdkSpecificStateMap>];
    }

    // place new event on stack
    this.eventQueue.push(uiStateEvent);

    // set up the scoreboard for current stack iteration
    this.scoreBoard = {};

    // start iterating from the oldest events
    this.eventQueue.forEach((eventInQueue) => {
      // delete and skip events outside of time window
      if (now - eventInQueue.timeStamp > this.timeWindow) {
        this.eventQueue.shift();
        return;
      }

      const relativeTime = eventInQueue.timeStamp / now;

      // Decay weight based on time, not only index.
      eventInQueue.currentWeight *= this.decayRate * relativeTime;

      // prefill board
      if (!this.scoreBoard[eventInQueue.key]) {
        this.scoreBoard[eventInQueue.key] = [];
      }

      // push the score on the current track
      this.scoreBoard[eventInQueue.key]!.push(eventInQueue.currentWeight); // we know it's not empty
    });

    // Return same state if under minimum duration
    if (!this.canShowNewUiState()) {
      return this.uiStateMap[this.currentKey];
    }

    // Otherwise calculate new UI state

    // We use this record to sum individual tracks
    this.summedScores = {};

    // score board is full, pick a winning state
    for (const trackKey in this.scoreBoard) {
      const track = this.scoreBoard[trackKey];

      if (!track) {
        throw new Error("no track - SHOULD NOT HAPPEN");
      }

      if (!this.scoreBoard[trackKey]) {
        throw new Error("no score board for key");
      }

      // TODO: See if relative amount makes sense
      const relativeAmount = track.length / this.eventQueue.length;

      const summedTrackScores = this.scoreBoard[trackKey].reduce(
        (partialSum, a) => partialSum + a,
        0,
      );

      this.summedScores[trackKey] = summedTrackScores * relativeAmount;
    }

    // TODO: this sometimes fails with 0 keys - inspect!
    if (Object.keys(this.summedScores).length === 0) {
      return this.uiStateMap[this.currentKey];
    }

    const winningKey = getKeyWithHighestValue(
      this.summedScores as Record<StringKeyOf<SdkSpecificStateMap>, number>,
    );

    const winningState = this.uiStateMap[winningKey];

    // start tracking time if it's a different state
    if (winningState.key !== this.currentKey) {
      this.currentKey = winningKey;
      this.currentStateStartTime = now;
    }

    return winningState;
  }
}
