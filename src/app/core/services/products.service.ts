import {inject, Injectable} from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { PaginatedProducts, Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private apiUrl = environment.apiUrl;
  private http = inject(HttpClient);

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products/scraped`);
  }

  getPaginatedProducts(page: number = 1, limit: number = 20) {
    return this.http.get<PaginatedProducts>(
      `${this.apiUrl}/products/scraped?page=${page}&limit=${limit}`);
  }

}
