import { Injectable } from '@angular/core';
import Dexie, { Table } from 'dexie';
import { CATALOG_DB } from '../../data/constants';
import {Item, Product, Section} from '../../models/interfaces.model';

@Injectable({
  providedIn: 'root'
})
export class DexieDbService extends Dexie {
  private db: IDBDatabase;
  sections!: Table<Section, number>;
  products!: Table<Product, number>;
  items!: Table<Item, number>;

  constructor() {
    super(CATALOG_DB);
    this.version(1).stores({
      sections: '++id',
      product: '++id, sectionId',
      items: '++id, productId'
    })

    this.open()
      .then(data => console.log("DB Opened"))
      .catch(err => console.log(err.message))
  }

  async addSection(section: Section) {}

  async addProduct(product: Product) {}

  async addItem(item: Item) {}
}
