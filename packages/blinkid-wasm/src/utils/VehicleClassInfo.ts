/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import { DateResult } from "./DateResult";
import { StringResult } from "../result";

/**
 * Represents the information about the vehicle class.
 *
 * @template S - The type of the string result.
 */
export type VehicleClassInfo<S extends string | StringResult> = {
  /** The type of vehicle the driver license owner has privilege to drive. */
  vehicleClass?: S;

  /** The type of driver licence. */
  licenceType?: S;

  /** The date since licence is effective. */
  effectiveDate?: DateResult<S>;

  /** The date of expiry of licence. */
  expiryDate?: DateResult<S>;
};
