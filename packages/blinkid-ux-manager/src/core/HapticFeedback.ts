/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

/**
 * Haptic feedback types supported by the system.
 */
export type HapticFeedbackType = "short" | "long";

/**
 * Mapping of haptic feedback types to their durations.
 */
export const HAPTIC_FEEDBACK_CONFIGS: Record<HapticFeedbackType, number> = {
  short: 100,
  long: 300,
};

/**
 * Manages haptic feedback for the BlinkID SDK.
 * Provides cross-platform haptic feedback using the Web Vibration API.
 */
export class HapticFeedbackManager {
  #enabled = true;

  /**
   * Check if haptic feedback is supported by the current browser/device.
   *
   * @returns true if haptic feedback is supported
   */
  isSupported(): boolean {
    return typeof navigator !== "undefined" && "vibrate" in navigator;
  }

  /**
   * Enable or disable haptic feedback.
   *
   * @param enabled - Whether haptic feedback should be enabled
   */
  setEnabled(enabled: boolean): void {
    this.#enabled = enabled;
  }

  /**
   * Check if haptic feedback is currently enabled.
   *
   * @returns true if haptic feedback is enabled
   */
  isEnabled(): boolean {
    return this.#enabled;
  }

  /**
   * Trigger haptic feedback with the specified type.
   *
   * @param type - The type of haptic feedback to trigger
   */
  triggerFeedback(type: HapticFeedbackType): void {
    if (!this.#enabled || !this.isSupported()) {
      return;
    }

    const duration = HAPTIC_FEEDBACK_CONFIGS[type];

    try {
      const success = navigator.vibrate([duration]);
      if (success) {
        console.debug(
          `HapticFeedback: Triggered ${type} feedback (${duration}ms)`,
        );
      } else {
        console.debug(`HapticFeedback: Failed to trigger ${type} feedback`);
      }
    } catch (error) {
      console.warn("HapticFeedback: Error triggering vibration:", error);
    }
  }

  /**
   * Stop any ongoing haptic feedback.
   */
  stop(): void {
    if (this.isSupported()) {
      navigator.vibrate(0);
    }
  }

  /**
   * Trigger long haptic feedback.
   * Uses long feedback pattern.
   */
  triggerLong(): void {
    this.triggerFeedback("long");
  }

  /**
   * Trigger short haptic feedback.
   * Uses short feedback pattern.
   */
  triggerShort(): void {
    this.triggerFeedback("short");
  }
}
