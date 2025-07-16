/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import { VehicleClassInfo } from "./VehicleClassInfo";
import { StringResult } from "../result";

/**
 * Represents detailed information from a driver's license.
 *
 * @template S - The type of the string result.
 */
export type DriverLicenceDetailedInfo<S extends string | StringResult> = {
  /**
   * The restrictions to driving privileges for the United States driver license
   * owner
   */
  restrictions?: S;

  /** The additional privileges granted to the US driver license owner */
  endorsements?: S;

  /** The type of vehicle the driver license owner has privilege to drive */
  vehicleClass?: S;

  /** The driver license conditions */
  conditions?: S;

  /** The additional information on vehicle class */
  vehicleClassesInfo?: VehicleClassInfo<S>[];
};
