/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

/**
 * Generic keywords for back camera.
 */
export const backCameraKeywords = [
  // English
  "back",
  "rear",
  // German
  "rück",
  // French
  "arrière",
  // Spanish
  "trasera",
  // Portuguese
  "trás",
  "traseira",
  // Italian
  "posteriore",
  // Dutch
  "achterzijde",
  // Swedish
  "baksidan",
  // Danish
  "bagside",
  // Norwegian
  "bak",
  // Finnish
  "takakamera",
  // Greek
  "πίσω",
  // Catalan
  "darrere",
  // Russian
  "задней",
  // Polish
  "tylny",
  // Romanian
  "spate",
  // Hungarian
  "hátsó",
  // Czech
  "zadní",
  // Slovak
  "zadná",
  // Ukrainian
  "задня",
  // Croatian
  "stražnja",
  // Arabic
  "الخلفية",
  // Hebrew
  "אחורית",
  // Turkish
  "arka",
  // Chinese (Simplified)
  "后面",
  "后置",
  // Chinese (Traditional)
  "後面",
  "後置",
  "背面",
  "背置",
  // Korean
  "후",
  // Japanese
  "背面",
  // Thai
  "หลัง",
  // Indonesian
  "belakang",
  // Hindi
  "बैक",
  // Latin American Spanish
  "posterior",
] as const satisfies string[];

/**
 * Generic keywords for front camera.
 */
export const frontCameraKeywords = [
  // English
  "front",
  // German
  "vorder",
  // French
  "avant",
  // Spanish
  "frontal",
  // Portuguese
  "frente",
  // Italian
  "frontale",
  // Dutch
  "voorzijde",
  // Swedish
  "framsidan",
  // Danish
  "forside",
  // Norwegian
  "front",
  // Finnish
  "etukamera",
  // Greek
  "μπροστά",
  // Catalan
  "davant",
  // Russian
  "передняя",
  // Polish
  "przedni",
  // Romanian
  "față",
  // Hungarian
  "elülső",
  // Czech
  "přední",
  // Slovak
  "predná",
  // Ukrainian
  "передня",
  // Croatian
  "prednja",
  // Arabic
  "الأمامية",
  // Hebrew
  "קדמית",
  // Turkish
  "ön",
  // Chinese (Simplified)
  "前面",
  "前置",
  // Chinese (Traditional)
  "前面",
  "前置",
  // Korean
  "전면",
  // Japanese
  "前面",
  // Thai
  "หน้า",
  // Indonesian
  "depan",
  // Hindi
  "फ्रंट",
  // Latin American Spanish
  "frontal",
] as const satisfies string[];

/**
 * Localizations for iOS back camera.
 */
export const backCameraLocalizations = [
  "후면 카메라",
  "後置相機",
  "Задна камера",
  "後置鏡頭",
  "Camera mặt sau",
  "Hátoldali kamera",
  "Cámara trasera",
  "Back Camera",
  "Kamera på baksidan",
  "Πίσω κάμερα",
  "Bagsidekamera",
  "Zadná kamera",
  "Fotocamera (posteriore)",
  "Câmara traseira",
  "מצלמה אחורית",
  "Takakamera",
  "Rückkamera",
  "Caméra arrière",
  "Zadní fotoaparát",
  "Артқы камера",
  "Tylny aparat",
  "बैक कैमरा",
  "Hátsó kamera",
  "Camera aan achterzijde",
  "Kamera Belakang",
  "Câmera Traseira",
  "Stražnja kamera",
  "الكاميرا الخلفية",
  "Càmera posterior",
  "Fotocamera posteriore",
  "Càmera del darrere",
  "กล้องด้านหลัง",
  "Cameră spate",
  "Kamera, bagside",
  "背面カメラ",
  "Задня камера",
  "Arka Kamera",
  "后置相机",
  "Камера на задней панели",
  "后置镜头",
  "Kamera bak",
  "Задняя камера",
  "Aparat tylny",
  "Kamera på baksiden",
  "Câmera de Trás",
] as const satisfies string[];

/**
 * Localizations for iOS back dual wide camera.
 */
export const backDualWideCameraLocalizations = [
  "Cameră dublă cu obiectiv superangular spate",
  "מצלמה כפולה רחבה אחורית",
  "Артқы қос кең бұрышты камера",
  "Câmara grande angular dupla traseira",
  "Πίσω διπλή ευρεία κάμερα",
  "後置雙廣角鏡頭相機",
  "Задна двойна широкоъгълна камера",
  "Càmera dual posterior amb gran angular",
  "Zadná duálna širokouhlá kamera",
  "كاميرا خلفية مزدوجة عريضة",
  "Задняя двойная широкоугольная камера",
  "Задня здвоєна ширококутна камера",
  "Cámara amplia posterior doble",
  "Dwikamera Lebar Belakang",
  "Tylny dwuobiektywowy aparat szerokokątny",
  "Dubbel vidvinkelkamera på baksidan",
  "Back Dual Wide Camera",
  "Hátsó, kettős, széles látószögű kamera",
  "후면 듀얼 와이드 카메라",
  "Double caméra grand angle arrière",
  "Fotocamera doppia con grandangolo (posteriore)",
  "Double appareil photo grand angle arrière",
  "Zadní duální širokoúhlý fotoaparát",
  "Çift Geniş Kamera Arka Yüzü",
  "Laajakulmainen kaksoistakakamera",
  "Rückseitige Dual-Weitwinkelkamera",
  "बैक ड्युअल वाइड कैमरा",
  "后置双广角镜头",
  "Câmera Dupla Grande-Angular Traseira",
  "後置雙廣角相機",
  "กล้องคู่ด้านหลังมุมกว้าง",
  "Kamera Lebar Belakang Ganda",
  "Dobbelt vidvinkelkamera bak",
  "Camera kép rộng mặt sau",
  "Cámara trasera dual con gran angular",
  "背面デュアル広角カメラ",
  "Stražnja dvostruka široka kamera",
] as const satisfies string[];

/**
 * Check if a string contains any of the keywords.
 *
 * @param string - The string to check.
 * @param keywords - The keywords to check.
 * @returns true if the string contains any of the keywords.
 */
export const containsKeyword = (string: string, keywords: string[]) => {
  return keywords.some((keyword) => string.toLowerCase().includes(keyword));
};

/**
 * Checks if a string is a back camera name.
 *
 * @param string - The string to check.
 * @returns true if the string is a back camera name.
 */
export const isBackCameraName = (string: string) =>
  containsKeyword(string, backCameraKeywords);

/**
 * Checks if a string is a front camera name.
 *
 * @param string - The string to check.
 * @returns true if the string is a front camera name.
 */
export const isFrontCameraName = (string: string) =>
  containsKeyword(string, frontCameraKeywords);
