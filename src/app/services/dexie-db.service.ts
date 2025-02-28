import { Injectable } from '@angular/core';
import Dexie, { Table } from 'dexie';
import {Item, Product, Section} from '../../models/interfaces.model';
import {getProductPrefix, SheetItem} from '../../data/sheetItem';
import {CATALOG_DB} from '../../data/constants';
import {sectionsData} from '../../data/sections.data';

@Injectable({
  providedIn: 'root'
})
export class DexieDbService extends Dexie {
  sections!: Table<Section, number>;
  products!: Table<Product, number>;
  items!: Table<Item, number>;
  sheetItems!: Table<SheetItem, number>;

  constructor() {
    super(CATALOG_DB);
    this.version(1).stores({
      sheetItems: '++id',
      sections: '++id',
      products: '++id',
      items: '++id'
    })

    this.open()
      .then(() => console.log("DB Opened"))
      .catch(err => console.log(err.message))

    // this.bulkPutSections(sectionsData)
    //   .then( () => console.log("Secciones precargadas"))
    //   .catch( (err: Error) => console.log("Error guardando secciones precargadas: ", err))
  }

  async bulkAddSheetData(elements: SheetItem[]) {
    await this.sheetItems.bulkAdd(elements)
  }
  async addSection(section: Section) {}

  async addProduct(product: Product) {}

  async addItem(item: Item) {}

  async getAllSheetData() {
    return this.sheetItems.toArray();
  }

  async bulkAddSections(sections: Section[]) {
    await this.sections.bulkAdd(sections)
  }

  async bulkPutSections(sections: Section[]) {
    await this.sections.bulkPut(sections)
  }

  async getAllSections() {
    return this.sections.toArray();
  }
  async clearSheetData() {
    await this.sheetItems.clear()
  }

  async clearSectionsData() {
    await this.sections.clear()
  }
}
