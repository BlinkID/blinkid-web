[**@microblink/blinkid-core**](../README.md)

***

[@microblink/blinkid-core](../README.md) / PingBase

# Interface: PingBase\<TData, TSchemaName, TSchemaVersion, TSessionNumber\>

Represents the base structure for a ping event.

## Type Parameters

### TData

`TData`

### TSchemaName

`TSchemaName` *extends* [`SchemaName`](../type-aliases/SchemaName.md)

### TSchemaVersion

`TSchemaVersion` *extends* `Semver`

### TSessionNumber

`TSessionNumber` *extends* `number` = `number`

## Properties

### data

> **data**: `TData`

The data payload of the event.

***

### schemaName

> **schemaName**: `TSchemaName`

The name of the schema.

***

### schemaVersion

> **schemaVersion**: `TSchemaVersion`

The version of the schema.

***

### sessionNumber?

> `optional` **sessionNumber**: `TSessionNumber`

The session number associated with the event.
