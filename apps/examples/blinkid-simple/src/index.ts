/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import { createBlinkId } from "@microblink/blinkid";

/**
 * This is the main component of the application.
 * It creates the BlinkID instance. For additional configuration look at the createBlinkId function.
 *
 * @see https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid/docs/functions/createBlinkId.md
 */
const blinkid = await createBlinkId({
  licenseKey: import.meta.env.VITE_LICENCE_KEY,
});

/**
 * This callback is called when the result is ready.
 * This is useful if you want to perform some actions when the result is ready.
 * For additional configuration look at the addOnResultCallback function.
 *
 * @see https://github.com/BlinkID/blinkid-web/blob/main/packages/blinkid/docs/type-aliases/BlinkIdComponent.md#addonresultcallback
 */
blinkid.addOnResultCallback((result) => {
  console.log("Result:", result);
  void blinkid.destroy();
});
