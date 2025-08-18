import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ProductService {
  // Mock Data
  listOfProducts: Product[] = [
    {
      "_id": { "$oid": "6897d2bb1e07665743f84942" },
      "product_id": 1723,
      "base_unit_name": "x25mt",
      "brand": "generico",
      "category_id": 4,
      "category_name": "Electricidad",
      "display_name": "CAÑO CORRUGADO FLEX. IGNIFUGO APROB BCO 1\"",
      "image_url": "https://rhcomercial.com.ar/web/image/product.product/1723/image_1024/%5B1423%5D%20CA%C3%91O%20CORRUGADO%20FLEX.%20IGNIFUGO%20APROB%20BCO%201%22?unique=7ed1c27",
      "list_price": 8474.62,
      "product_type": "consu"
    },
    {
      "_id": { "$oid": "6897d2bb1e07665743f84943" },
      "product_id": 1724,
      "base_unit_name": "und",
      "brand": "sica",
      "category_id": 4,
      "category_name": "Electricidad",
      "display_name": "TAPA SICA C/ TORNILLO MOD. LLAVE LUZ",
      "image_url": "https://rhcomercial.com.ar/web/image/product.product/1724/image_1024/%5B2345%5D%20TAPA%20SICA%20C/%20TORNILLO%20MOD.%20LLAVE%20LUZ?unique=d3f1c22",
      "list_price": 450.50,
      "product_type": "consu"
    },
    // Añade más productos aquí...
  ];
  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('/api/products');
  }

}
