import {Injectable} from "@angular/core";
import {Item, Product, ProfitData, Section} from "../../models/interfaces.model";
import {DexieDbService} from "./dexie-db.service";
import {BarcodeService} from "./barcode.service";
import {HttpClient} from "@angular/common/http";
import {catchError, from, map, mergeMap, Observable, of, switchMap} from "rxjs";
import {environment} from "../../environments/environment";
import {SheetItem} from "../../models/sheetItem";
import {sectionsData} from "../../data/sections.data";
import {
  DEFAULT_PROFIT,
  PRODUCT_SECTIONS_CORRECT_MAP,
  PRODUCT_SECTIONS_CORRECT_REGEX,
  SPECIAL_NAME_CASES
} from "../../data/constants";
import {getProductPrefix, getProductPrefix1word} from "../../helpers/helpers";

@Injectable({
  providedIn: 'root'
})
export class ProductCatalogService {
  profitData!: ProfitData;

  constructor(private dexieDbService: DexieDbService,
              private barcodeService: BarcodeService,
              private http: HttpClient,
  ) {
  }

  getAllParsedProducts(): Observable<Section[]> {
    return this.http.get<Section[]>(`${environment.apiUrl}/api/products/parsed`)
  }

  getAndSaveParsedProducts(): Observable<void> {
    return this.getAllParsedProducts().pipe(
      mergeMap((data) =>
        from(this.dexieDbService.bulkPutSections(data)).pipe(
          switchMap(() => from(this.dexieDbService.saveLastUpdateDate(new Date())))
        )
      ),
      catchError((err) => {
        console.error('Error al cargar secciones', err);
        return of(void 0);
      }),
      map(() => void 0)
    );
  }

  getAllSectionsFromBrowser() {
    return this.dexieDbService.getAllSections();
  }

  async addSheetItems(products: SheetItem[]) {
    // En el futuro aquí se decidirìa si guardar en IndexedDB o llamar a una API REST
    await this.dexieDbService.bulkAddSheetItems(products);
  }

  async putSheetItems(products: SheetItem[]) {
    // En el futuro aquí se decidirìa si guardar en IndexedDB o llamar a una API REST
    await this.dexieDbService.bulkPutSheetItems(products);
  }

  async getAllSheetData(): Promise<SheetItem[]> {
    return this.dexieDbService.getAllSheetData();
  }


  async processSheetData() {
    await this.getLastProfitData();
    await this.clearCatalog();
    console.log("In processSheetData()");
    // pido a la db los datos crudos
    const productsSheet = await this.getAllSheetData();
    if (!productsSheet.length) return; //TODO: mejorar esta logica

    const sectionMap = new Map<string, Section>(
      // Aca se toma la primer inicial ya que en el catalogo de rh la columna rubro figura asi
      sectionsData.map(section => [section.title[0], {...section, products: []}])
    );

    const productMap = new Map<string, Product>();

    for (const sheetItem of productsSheet) {
      // console.log("Procesando producto en DexieDB.service: ", sheetItem);
      const {CODIGO, DESCRIPCIÓN, RUBRO, PRECIO} = sheetItem;

      // Obtener la sección original del Excel
      let section = sectionMap.get(RUBRO);

      // Si no existe la sección, ignoramos el producto
      if (!section) continue;
      // START: CORRECCIONES SOBRE PRODUCTOS MAL CARGADOS EN EXCEL DE RH
      //  Verificar si hay una corrección de sección en el mapa
      const matches = [...DESCRIPCIÓN.matchAll(PRODUCT_SECTIONS_CORRECT_REGEX)];

      if (matches.length > 0) {
        // 🟢 Tomar la última coincidencia detectada en el string
        const lastMatch = matches[matches.length - 1][0].toUpperCase();
        const correctedSection = PRODUCT_SECTIONS_CORRECT_MAP.get(lastMatch);

        if (correctedSection) {
          section = sectionMap.get(correctedSection[0]); // Asignamos la sección corregida
        }
      }

      if (!section) continue;
      // END: CORRECCIONES SOBRE PRODUCTOS MAL CARGADOS EN EXCEL DE RH

      //  Obtener nombre base del producto
      // const productName = getProductPrefix1word(DESCRIPCIÓN);
      let productName!: string
      const specialCase = SPECIAL_NAME_CASES.some(
        word => DESCRIPCIÓN.toUpperCase().includes(word.toUpperCase()))
      if (specialCase) {
        productName = getProductPrefix1word(DESCRIPCIÓN)
      } else {
        productName = getProductPrefix(DESCRIPCIÓN);
      }
      // console.log("Separacion de nombre: ", productName);

      //  Buscar o crear producto
      if (!productMap.has(productName)) {
        const newProduct: Product = {
          name: productName,
          // TODO: Ver como asignar una imagen para cada tipo de producto
          image: '',
          items: []
        };
        productMap.set(productName, newProduct);
        section.products.push(newProduct);
      }

      const product = productMap.get(productName)!;

      //  Crear Item
      const newItem: Item = {
        code: CODIGO,
        description: DESCRIPCIÓN,
        price: PRECIO * (1 + (this.profitData.value / 100)),
        barcode: this.barcodeService.generateEAN13(CODIGO.toString())
      };
      // console.log(JSON.stringify(newItem));

      // aca guardo aparte en la db como items para luego bajar en xls con los barcodes
      await this.dexieDbService.addOrUpdateItem(newItem)
      product.items.push(newItem);
      product.items.sort((a, b) => a.code - b.code);
    }

    await this.dexieDbService.bulkPutSections(Array.from(sectionMap.values()));
    await this.clearSheetData()
    console.log("End process spreadsheet data")

  }

  clearCatalog() {
    this.dexieDbService.clearSectionsData()
      .then(() => console.log("Catalogo Borrado"));
    this.dexieDbService.clearItems()
      .then(() => console.log("Items Eliminados"));
  }

  clearSheetData() {
    this.dexieDbService.clearSheetData()
      .then(() => console.log("SheetData Borrada"));
  }

  catalogSize() {
    return this.dexieDbService.catalogSize()
  }

  getLastUpdateDate() {
    return this.dexieDbService.getLastUpdateDate();
  }

  getSpreadSheetData(): Promise<SheetItem[]> {
    return this.dexieDbService.getAllSheetData();
  }

  getAllItems() {
    return this.dexieDbService.getAllItems();
  }

  getLastProfitData() {
    this.dexieDbService.getLastProfitData()
      .then(data => {
        data ? this.profitData = data : this.setDefaultProfit()
      })
      .catch(err => console.error(err, "when get last Profit Data"))
    return this.profitData;
  }

  setDefaultProfit() {
    this.profitData = {
      dateUpdated: Date(),
      value: DEFAULT_PROFIT
    }
  }

  async saveProfit(newValue: number) {
    await this.dexieDbService.putProfitData({
      value: newValue,
      dateUpdated: Date()
    })

  }

}
