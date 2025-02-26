import { Injectable } from '@angular/core';
import {DexieDbService} from './dexie-db.service';
import {SheetDataItem} from '../../data/sheetDataItem';

@Injectable({
  providedIn: 'root'
})
export class ProductCatalogService {

  constructor(private dexieDbService: DexieDbService) { }

  async addSheetData(elements: SheetDataItem[]) {
    // En el futuro aquí se decidirìa si guardar en IndexedDB o llamar a una API REST
    await this.dexieDbService.addSheetData(elements);
  }

  async getAllSheetData(): Promise<SheetDataItem[]> {
    return this.dexieDbService.getAllSheetData();
  }

  async clearData() {
    await this.dexieDbService.clearSheetData();
  }

}
