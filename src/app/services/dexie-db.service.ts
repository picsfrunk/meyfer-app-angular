import { Injectable } from '@angular/core';
import Dexie, { Table } from 'dexie';
import {Item, Product, Section} from '../../models/interfaces.model';
import {SheetDataItem} from '../../data/sheetDataItem';

@Injectable({
  providedIn: 'root'
})
export class DexieDbService extends Dexie {
  sections!: Table<Section, number>;
  products!: Table<Product, number>;
  items!: Table<Item, number>;
  dataItem!: Table<SheetDataItem, number>;

  constructor() {
    super('SheetData');
    this.version(1).stores({
      dataItem: '++id'
    })

    this.open()
      .then(data => console.log("DB Opened"))
      .catch(err => console.log(err.message))
  }

  async addSheetData(elements: SheetDataItem[]) {
    await this.dataItem.bulkAdd(elements)
  }
  async addSection(section: Section) {}

  async addProduct(product: Product) {}

  async addItem(item: Item) {}

  getAllSheetData() {
    return this.dataItem.toArray();
  }

  async clearSheetData() {
    await this.dataItem.clear()
  }
}
