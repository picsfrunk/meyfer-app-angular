export const CATALOG_COLLECTION_NAME = 'catalog'

export const BARCODE_PREFIX = '420'
export const BARCODE_PAD = '0'

export const PROFIT_GLOBAL = 10

// Map para asginar manualmente ciertos productos que contengan la palabra
// de la clave 1 y lo asigne al rubro de la clave 2
export const PRODUCT_SECTIONS_CORRECT_MAP
  = new Map<string, string>([
  ["ABRAZADERA", "A"],
  ["PRECINTOS ", "F"],
  ["ANAFE", "R"],
  ["LUZ", "E"],
  ["CABO", "F"],
  ["BALDE", "F"],
  ["ARCO", "F"],
]);

export const PRODUCT_SECTIONS_CORRECT_REGEX
  = new RegExp(
  `\\b(${Array.from(PRODUCT_SECTIONS_CORRECT_MAP.keys()).join("|")})\\b`,
  "gi"
);

// Array para que agrupe en una sola familia los productos que contengan esta palabra
export const SPECIAL_NAME_CASES
  = [
  "GRIFERIA",
  "ALAMBRE",
  "ACOPLE",
  "BARRAL",
  "CABO",
  "BALDE",
  "CANILLA",
  "BASE DE TANQUE",
  "BOYA",
  "RODILLO",
  "CAJA DE LUZ",
  "LLUVIA",
  "ASIENTO",
  "BASE",
  "REGULADOR",
  "REJILLA",
  "CALEFON",
  "SIFON",
  "SOPORTE",
  "GRIFO",
  "VALVULA DESCARGA",
  "VALVULA CANILLA",
]
