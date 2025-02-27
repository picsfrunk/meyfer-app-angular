import { Injectable } from '@angular/core';
import {DexieDbService} from './dexie-db.service';
import {SheetItem} from '../../data/sheetItem';
import {Section} from '../../models/interfaces.model';

@Injectable({
  providedIn: 'root'
})
export class ProductCatalogService {
  private sections!: Section[];

  constructor(private dexieDbService: DexieDbService) { }

  async addSheetData(products: SheetItem[]) {
    // En el futuro aquí se decidirìa si guardar en IndexedDB o llamar a una API REST
    await this.dexieDbService.bulkAddSheetData(products);
  }

  async getAllSheetData(): Promise<SheetItem[]> {
    return this.dexieDbService.getAllSheetData();
  }

  async clearSheetData() {
    await this.dexieDbService.clearSheetData();
  }


  async getAllSections() {
    await this.dexieDbService.processSheetData()
      .then( r => console.log("Datos Procesados en product-catalogue.service: \n", r));
    return this.dexieDbService.getAllSections();
  }

}
