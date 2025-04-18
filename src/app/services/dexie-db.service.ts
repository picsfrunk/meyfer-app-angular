import { Injectable } from '@angular/core';
import Dexie, { Table } from 'dexie';
import { CatalogMetadata, Item, Product, ProfitData, Section } from 'models/interfaces.model';
import { SheetItem } from 'models/sheetItem';
import { CATALOG_COLLECTION_NAME } from 'data/constants';

@Injectable({
  providedIn: 'root'
})
export class DexieDbService extends Dexie {
  sections!: Table<Section, number>;
  products!: Table<Product, number>;
  items!: Table<Item, number>;
  sheetItems!: Table<SheetItem, number>;
  profitValue!: Table<ProfitData, number>;
  metadata!: Table<CatalogMetadata, string>;

  constructor() {
    super(CATALOG_COLLECTION_NAME);
    this.version(1).stores({
      sheetItems: '++id',
      sections: '++id',
      products: '++id',
      items: '++id',
      profitValue: '++id',
      metadata: 'key'
    })

    this.open()
      .then(() => console.log("DB Opened"))
      .catch(err => console.log(err.message))

    // this.bulkPutSections(sectionsData)
    //   .then( () => console.log("Secciones precargadas"))
    //   .catch( (err: Error) => console.log("Error guardando secciones precargadas: ", err))
  }

  async saveLastUpdateDate(date: Date): Promise<void> {
    await this.metadata.put({ key: 'lastUpdate', value: date.toISOString() });
  }

  async getLastUpdateDate(): Promise<string | null> {
    const record = await this.metadata.get('lastUpdate');
    return record ? record.value : null;
  }

  async bulkAddSheetItems(elements: SheetItem[]) {
    await this.sheetItems.bulkAdd(elements)
  }

  async bulkPutSheetItems(elements: SheetItem[]) {
    await this.sheetItems.bulkPut(elements)
  }

  async addOrUpdateSection(section: Section) {
    await this.sections.put(section)
  }

  async addOrUpdateProduct(product: Product) {
    await this.products.put(product)
  }

  async addOrUpdateItem(item: Item) {
    this.items.put(item);
  }

  async getAllSheetData() {
    return this.sheetItems.toArray();
  }

  async getAllItems() {
    return this.items.toArray()
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

  async clearItems() {
    await this.items.clear()
  }

  async catalogSize() {
    return this.items.count()
  }

  async getLastProfitData() {
    return this.profitValue.orderBy('id').last();
  }

  async putProfitData(data: ProfitData) {
    await this.profitValue.put(data)
  }
}
