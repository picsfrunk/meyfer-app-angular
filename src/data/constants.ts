export const CATALOG_COLLECTION_NAME = 'catalog'

export const BARCODE_PREFIX = '420'
export const BARCODE_PAD = '0'

export const PRODUCT_SECTIONS_CORRECT_MAP = new Map<string, string>([
  ["abrazadera", "Abrazaderas"],
  ["precintos", "Ferretería"],
  ["anafe", "Rural"],
  ["luz", "Electricidad"],
]);

export const PRODUCT_SECTIONS_CORRECT_REGEX = new RegExp(
  `\\b(${Array.from(PRODUCT_SECTIONS_CORRECT_MAP.keys()).join("|")})\\b`,
  "gi"
);

export const SPECIAL_NAME_CASES = [
  "griferia",
  "alambre",
  "acople"
]
