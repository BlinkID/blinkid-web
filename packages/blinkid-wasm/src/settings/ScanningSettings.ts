/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import { AnonymizationMode } from "./AnonymizationMode";
import { CroppedImageSettings } from "./CroppedImageSettings";
import { DetectionLevel } from "./DetectionLevel";
import { DocumentAnonymizationSettings } from "./DocumentAnonymizationSettings";
import { DocumentRules } from "./DocumentRules";
import { RecognitionModeFilter } from "./RecognitionModeFilter";

/**
 * Represents the configurable settings for scanning a document.
 *
 * This structure defines various parameters and policies related to the
 * scanning process, including image quality handling, data extraction and
 * anonymization, along with options for frame processing and image extraction.
 */
export type ScanningSettings = {
  /**
   * The level of blur detection in the document image.
   *
   * Defines the severity of blur detected in the document image, as defined in
   * `DetectionLevel`. Values range from `off` (detection NotAvailable) to
   * higher levels of blur detection.
   *
   * `low` – less sensitive to blur; if something is detected as blur, it is
   * almost certainly actual blur, but some amount of blur may not be detected
   * at all.
   *
   * `high` – highly sensitive to blur; it may detect as blur even something
   * that only resembles blur.
   */
  blurDetectionLevel: DetectionLevel;

  /**
   * Indicates whether images with blur in the document image should be skipped.
   *
   * A value of `true` means images with detected blur will be excluded from
   * further processing to prevent blurred images from being used
   *
   * - If `blurDetectionLevel` is `off` - blurred images will be processed
   * - If blur is detected `InputImageAnalysisResult#processingStatus` will be
   *   `image-preprocessing-failed` and blur will be reported in the
   *   `BlinkIdProcessResult`
   *
   * A value of `false` means images with detected blur will not be excluded
   * from further processing
   *
   * - If `blurDetectionLevel` is not `off` - even if blur is detected, the image
   *   will be processed and blur will be reported in the
   *   `BlinkIdProcessResult`.
   */
  skipImagesWithBlur: boolean;

  /**
   * The level of glare detection in the document image.
   *
   * Defines the severity of glare detected in the document image, as defined in
   * `DetectionLevel`. Values range from `off` (detection NotAvailable) to
   * higher levels of glare detection.
   *
   * `low` – less sensitive to glare; if something is detected as glare, it is
   * almost certainly actual glare, but some amount of glare may not be detected
   * at all.
   *
   * `high` – highly sensitive to glare; it may detect as glare even something
   * that only resembles glare.
   */
  glareDetectionLevel: DetectionLevel;

  /**
   * Indicates whether images with glare in the document image should be
   * skipped.
   *
   * A value of `true` means images with detected glare will be excluded from
   * further processing to prevent glared images from being used
   *
   * - If `glareDetectionLevel` is `off` - glared images will be processed
   * - If glare is detected `InputImageAnalysisResult#processingStatus` will be
   *   `image-preprocessing-failed` and glare will be reported in the
   *   `BlinkIdProcessResult`
   *
   * A value of `false` means images with detected glare will not be excluded
   * from further processing
   *
   * - If `glareDetectionLevel` is not `off` - even if glare is detected, the
   *   image will be processed and glare will be reported in the
   *   `BlinkIdProcessResult`
   */
  skipImagesWithGlare: boolean;

  /**
   * The level of allowed detected tilt of the document in the image.
   *
   * Defines the severity of allowed detected tilt of the document in the image,
   * as defined in `DetectionLevel`. Values range from `off` (detection
   * NotAvailable) to higher levels of allowed tilt.
   *
   * `low` – less sensitive to tilt.
   *
   * `high` – highly sensitive to tilt.
   */
  tiltDetectionLevel: DetectionLevel;

  /**
   * Indicates whether images with inadequate lighting conditions should be
   * rejected.
   *
   * Inadequate lighting conditions are represented as either `too-bright` or
   * `too-dark` document images, as defined in the `ImageAnalysisLightingStatus`
   * type. A value of `true` means images with inadequate lighting conditions
   * will be excluded from further processing to prevent images with inadequate
   * lighting from being used
   *
   * - If inadequate light conditions are detected
   *   `InputImageAnalysisResult#processingStatus` will be
   *   `image-preprocessing-failed` and lighting status will be reported in the
   *   `BlinkIdProcessResult`.
   */
  skipImagesWithInadequateLightingConditions: boolean;

  /**
   * Indicates whether images occluded by hand should be rejected.
   *
   * A value of `true` means images occluded by hand will be excluded from
   * further processing to prevent occluded images from being used
   *
   * - If hand occlusion is detected `InputImageAnalysisResult#processingStatus`
   *   will be `image-preprocessing-failed` and hand occlusion status will be
   *   reported in the `BlinkIdProcessResult`.
   *
   * This setting is applicable only if `scanCroppedDocumentImage` is false.
   */
  skipImagesOccludedByHand: boolean;

  /**
   * Indicates whether the aggregation of data from multiple images is enabled.
   *
   * Disabling this setting will yield higher-quality captured images, but it
   * may slow down the scanning process due to the additional effort required to
   * find the optimal image.
   *
   * Enabling this setting will simplify the extraction process, but the
   * extracted data will be aggregated from multiple images instead of being
   * sourced from a single image.
   *
   * This only applies when `InputImageSource` is equal to `video` - for images
   * from `photo` source, setting will be ignored.
   */
  combineResultsFromMultipleInputImages: boolean;

  /**
   * Enables barcode recognition to proceed even if the initial VIZ extraction
   * fails.
   *
   * If the barcode recognition is successful, the process will still end in a
   * valid state. This setting is applicable only to images from `photo`
   * source.
   *
   * For multi-side scanning, it is permitted only for the back side.
   */
  enableBarcodeScanOnly: boolean;

  /**
   * Defines custom rules for specific document class.
   *
   * When defining customDocumentRules, `documentFilter` is optionally set to
   * specify the document to which the rule applies, and a `fields` with the
   * appropriate `alphabetType` should be specified as mandatory for that
   * document.
   *
   * If a `fields` is set to a field that is optional for that document or does
   * not exist on it, all fields on the document become optional.
   *
   * If a `fields` is set to a field with an incorrect alphabetType, all fields
   * on the document become optional.
   *
   * If a `fields` is set to a field that doesn't exist in the internal rules,
   * that rule is ignored.
   *
   * When adding multiple `fields`, any field that does not match our rules is
   * ignored. Only fields that comply with our rules are set as mandatory.
   *
   * If the documentFilter fields `country`, `region`, or `type` are set to
   * `null`, all supported values for those fields will be considered. For
   * example, if `country = null`, the rule will apply to all supported
   * countries in BlinkID.
   *
   * By default, document fields are validated using internal rules that define
   * mandatory fields for the scanned document class. This setting allows users
   * to narrow down our internal rules on mandatory fields. All undefined fields
   * will become optional. It is not possible to mark fields as mandatory if
   * they cannot theoretically appear on the document.
   *
   * The more detailed document filter will have priority over the other.
   */
  customDocumentRules: DocumentRules[];

  /**
   * The mode of anonymization applied to the document.
   *
   * Redact specific fields based on requirements or laws regarding a specific
   * document. Data can be redacted from the image, the result or both.
   */
  anonymizationMode?: AnonymizationMode;

  /**
   * Redact fields for specific document class.
   *
   * Fields specified by requirements or laws for a specific document will be
   * redacted regardless of this setting. Based on anonymizationMode setting,
   * data will be redacted from the image, the result or both.
   */
  customDocumentAnonymizationSettings: DocumentAnonymizationSettings[];

  /**
   * Indicates whether input images should be returned.
   *
   * Save the input images at the moment of the data extraction or timeout. This
   * significantly increases memory consumption. The scanning performance is not
   * affected.
   */
  returnInputImages: boolean;

  /**
   * Process only cropped document images.
   *
   * Requires the input image to consist solely of the cropped document image
   * with perspective correction applied. This only applies to images from
   * `photo` input image source - for images from `video` input image source,
   * setting will be ignored.
   */
  scanCroppedDocumentImage: boolean;

  /**
   * Indicates whether character validation is enabled.
   *
   * Allow only results containing expected characters for a given field. Each
   * field is validated against a set of rules. All fields have to be
   * successfully validated in order to successfully scan a document. Setting is
   * used to improve scanning accuracy.
   *
   * If set to `true`, when an invalid character is detected
   * `invalid-characters-found` is returned.
   */
  enableCharacterValidation: boolean;

  /**
   * Defines the minimum required margin (in percentage) between the edge of the
   * input image and the document.
   *
   * Default value is `0.02f` (also recommended value). The setting is
   * applicable only when using images from `video` source. The setting is not
   * applicable if `scanCroppedDocumentImage` is enabled (it will be ignored).
   * This setting is implemented to comply with regulations in certain countries
   * that mandate documents to be stored with adequate margins in the image.
   */
  inputImageMargin: number;

  /**
   * Indicates whether backside of unsupported document should be scanned also.
   *
   * By default, back side of the document will not be scanned if only the front
   * side is supported for a specific document.
   */
  scanUnsupportedBack: boolean;

  /**
   * Indicates whether scanning can continue to the next side despite an
   * uncertain front-side scan.
   *
   * This only applies to images from `photo` input image source - for images
   * from `video` source, setting will be ignored.
   */
  allowUncertainFrontSideScan: boolean;

  /**
   * The maximum allowed mismatches per field during data matching.
   *
   * Configures the maximum number of characters per field that can be
   * inconsistent during data matching. By default, no mismatches are allowed.
   */
  maxAllowedMismatchesPerField: number;

  /**
   * Indicates whether only the passport data page should be scanned.
   *
   * Scan only the data page ( page containing `MRZ` ) of the passport. If set
   * to false, it will be required to scan the second page of certain
   * passports.
   */
  scanPassportDataPageOnly: boolean;

  /**
   * Configures the image cropping settings during scanning process.
   *
   * Allows customization of cropped image handling, such as dotsPerInch,
   * extensionFactor, and whether images should be returned for the entire
   * document, face or signature regions.
   */
  croppedImageSettings: CroppedImageSettings;

  /**
   * The filter for recognition modes.
   *
   * Specifies which recognition modes are enabled during the scanning process,
   * default value enables all modes. Used to enable/disable recognition of
   * specific document groups.
   *
   * @experimental This setting will be removed in upcoming releases.
   */
  recognitionModeFilter: RecognitionModeFilter;
};
