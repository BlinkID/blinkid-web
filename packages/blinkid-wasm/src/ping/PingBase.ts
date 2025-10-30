/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import { SchemaName } from "./Ping";

type Semver =
  | `${number}.${number}.${number}`
  | `${number}.${number}.${number}-${string}`;

/** Represents the base structure for a ping event. */
export interface PingBase<
  TData,
  TSchemaName extends SchemaName,
  TSchemaVersion extends Semver,
  TSessionNumber extends number = number,
> {
  /** The data payload of the event. */
  data: TData;

  /** The name of the schema. */
  schemaName: TSchemaName;

  /** The version of the schema. */
  schemaVersion: TSchemaVersion;

  /** The session number associated with the event. */
  sessionNumber?: TSessionNumber;
}
