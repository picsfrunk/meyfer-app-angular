import { Injectable } from '@angular/core';
import {DexieDbService} from './dexie-db.service';
import { getProductPrefix, SheetItem } from 'data/sheetItem';
import {Item, Product, Section} from 'models/interfaces.model';
import {sectionsData} from 'data/sections.data';
import {BarcodeService} from 'app/services/barcode.service';

@Injectable({
  providedIn: 'root'
})
export class ProductCatalogService {

  constructor(private dexieDbService: DexieDbService,
              private barcodeService: BarcodeService
  ) {}

  async getAllSections() {
    return this.dexieDbService.getAllSections()
      .then(catalog => {
        // console.log("Datos procesados en getAllFromDB:\n", r)
        return catalog
      });
  }

  async addSheetData(products: SheetItem[]) {
    // En el futuro aquí se decidirìa si guardar en IndexedDB o llamar a una API REST
    await this.dexieDbService.bulkAddSheetData(products);
  }

  async getAllSheetData(): Promise<SheetItem[]> {
    return this.dexieDbService.getAllSheetData();
  }



  async processSheetData() {
    await this.clearCatalog()
    console.log("In processSheetData()");
    // pido a la db los datos crudos
    const productsSheet = await this.getAllSheetData();

    if (!productsSheet.length) return;

    const sectionMap = new Map<string, Section>(
      sectionsData.map(section => [section.title[0], { ...section, products: [] }])
    );

    const productMap = new Map<string, Product>();

    for (const sheetItem of productsSheet) {
      // console.log("Procesando producto en DexieDB.service: ", sheetItem);
      const { CODIGO, DESCRIPCIÓN, RUBRO, PRECIO } = sheetItem;

      // 🟢 Buscar la sección correspondiente
      const section = sectionMap.get(RUBRO);
      if (!section) continue; // Si el rubro no está en sectionsData, lo ignoramos

      // 🟢 Obtener nombre base del producto
      const productName = getProductPrefix(DESCRIPCIÓN);
      // console.log("Separacion de nombre: ", productName);

      // 🟢 Buscar o crear producto
      if (!productMap.has(productName)) {
        const newProduct: Product = {
          name: productName,
          image: '', // TODO: Se puede asignar una imagen específica después
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
        price: PRECIO,
        barcode: this.barcodeService.generateEAN13(CODIGO.toString())
      };
      // console.log(JSON.stringify(newItem));

      await this.dexieDbService.addOrUpdateItem(newItem)

      product.items.push(newItem);
    }

    await this.dexieDbService.bulkPutSections(Array.from(sectionMap.values()));
    await this.clearSheetData()

  }

  async clearCatalog() {
    await this.dexieDbService.clearSectionsData()
      .then( () => console.log("Catalogo Borrado"));
    await this.dexieDbService.clearItems()
      .then( () => console.log("Items Eliminados"));
  }

  async clearSheetData() {
    await this.dexieDbService.clearSheetData()
      .then( () => console.log("SheetData Borrada"));
  }

  async catalogSize() {
    return this.dexieDbService.catalogSize()
  }
}
