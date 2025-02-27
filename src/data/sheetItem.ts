import {Item} from '../models/interfaces.model';

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
