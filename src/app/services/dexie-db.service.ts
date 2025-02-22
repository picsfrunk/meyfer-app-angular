import { Injectable } from '@angular/core';
import Dexie, { Table } from 'dexie';
import { CATALOG_DB } from '../../data/constants';
import {Item, Product, Section} from '../../models/interfaces.model';
import {SheetData} from '../../data/sheet.data';

@Injectable({
  providedIn: 'root'
})
export class DexieDbService extends Dexie {
  sections!: Table<Section, number>;
  products!: Table<Product, number>;
  items!: Table<Item, number>;
  dataItem!: Table<SheetData, number>;

  constructor() {
    super('SheetData');
    this.version(1).stores({
      dataItem: '++id, CODIGO'
    })

    this.open()
      .then(data => console.log("DB Opened"))
      .catch(err => console.log(err.message))
  }

  async addSheetData(element: SheetData) {
    this.dataItem.add(element)
  }
  async addSection(section: Section) {}

  async addProduct(product: Product) {}

  async addItem(item: Item) {}
}
