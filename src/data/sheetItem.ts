export interface SheetItem {
  CODIGO: number;
  DESCRIPCIÓN: string;
  RUBRO: string;
  PRECIO: number;
  UNIDAD: string;
  FECHA: number;
}

export function getProductPrefix(description: string): string {
  return description.replace(/\d+.*$/, '').trim(); // Quita números y variantes
}

export function getProductPrefix1word(description: string): string {
  return description.split(/\s+/)[0];  // Divide por espacios y toma el primer elemento
}
