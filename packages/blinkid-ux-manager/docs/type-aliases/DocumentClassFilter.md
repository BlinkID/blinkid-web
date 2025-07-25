[**@microblink/blinkid-ux-manager**](../README.md)

***

[@microblink/blinkid-ux-manager](../README.md) / DocumentClassFilter

# Type Alias: DocumentClassFilter()

> **DocumentClassFilter** = (`documentClassInfo`) => `boolean`

A type representing a filter function for document classification.

This function is used to determine whether a document class is supported or
not. It takes a `DocumentClassInfo` object as input and returns a boolean
value:
- `true`: The document class is supported.
- `false`: The document class is not supported, and the document will be
marked as "unsupported-document".

## Parameters

### documentClassInfo

`DocumentClassInfo`

Information about the document class, such as country and type.

## Returns

`boolean`

A boolean indicating whether the document class is supported.
