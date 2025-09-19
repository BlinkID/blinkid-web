[**@microblink/blinkid**](../README.md)

***

[@microblink/blinkid](../README.md) / DetectionStatus

# Type Alias: DetectionStatus

> **DetectionStatus** = `"failed"` \| `"success"` \| `"camera-too-far"` \| `"camera-too-close"` \| `"camera-angle-too-steep"` \| `"document-too-close-to-camera-edge"` \| `"document-partially-visible"`

Represents the status of the document detection process.

This type represents all possible states that can occur during document
detection:

- `failed`

  - Detection has failed
- `success`

  - Document has been successfully detected
- `camera-too-far`

  - Camera is positioned too far from the document
- `camera-too-close`

  - Camera is positioned too close to the document
- `camera-angle-too-steep`

  - Camera angle relative to the document is too steep
- `document-too-close-to-camera-edge`

  - Document is positioned too close to the edge of camera view
- `document-partially-visible`

  - Only part of the document is visible in camera view
