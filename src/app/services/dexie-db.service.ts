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

    this.bulkAddSections(sectionsData)
      .catch( (err: Error) => console.log("Error guardando secciones precargadas: ", err))
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

  async clearSheetData() {
    await this.sheetItems.clear()
  }

  async bulkAddSections(sections: Section[]) {
    await this.sections.bulkAdd(sections)
  }

  bulkAddItems(items: Item[]) {
    this.items.bulkAdd(items)
  }

  saveSheetItemAsItem(sheetItem: SheetItem) {

  }

  async processSheetData() {
    const productsSheet = await this.getAllSheetData().then();

    if (!productsSheet.length) return;

    // 🔴 Borrar datos previos para evitar duplicados
    // await this.clearSheetData();

    // 🔴 Mapeo de título → Sección
    const sectionMap = new Map<string, Section>(
      sectionsData.map(section => [section.title[0], { ...section, products: [] }])
    );

    // 🔴 Mapa para evitar duplicados de productos
    const productMap = new Map<string, Product>();

    // 🔴 Procesamiento de SheetItem
    for (const sheetItem of productsSheet) {
      console.log("Procesando producto en DexieDB.service: ", sheetItem);
      const { CODIGO, DESCRIPCIÓN, RUBRO, PRECIO } = sheetItem;

      // 🟢 Buscar la sección correspondiente
      const section = sectionMap.get(RUBRO);
      if (!section) continue; // Si el rubro no está en sectionsData, lo ignoramos

      // 🟢 Obtener nombre base del producto
      const productName = getProductPrefix(DESCRIPCIÓN);
      console.log("Separacion de nombre: ", productName);

      // 🟢 Buscar o crear producto
      if (!productMap.has(productName)) {
        const newProduct: Product = {
          name: productName,
          image: '', // Se puede asignar una imagen específica después
          items: []
        };
        productMap.set(productName, newProduct);
        section.products.push(newProduct);
      }

      const product = productMap.get(productName)!;

      // 🟢 Crear Item
      const newItem: Item = {
        code: CODIGO.toString(),
        description: DESCRIPCIÓN,
        price: PRECIO
      };

      product.items.push(newItem);
    }

    // 🔴 Guardar en IndexedDB
    return this.sections.bulkPut(Array.from(sectionMap.values()));
  }


  async getAllSections() {
    return this.sections.toArray();
  }

}
