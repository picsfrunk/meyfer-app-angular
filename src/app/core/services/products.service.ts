import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from "rxjs/operators";
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { PaginatedProducts, Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private apiUrl = environment.apiUrl;
  private http = inject(HttpClient);

  readonly isLoading: WritableSignal<boolean> = signal(false);

  getAllProducts(): Observable<Product[]> {
    this.isLoading.set(true);
    return this.http.get<Product[]>(`${this.apiUrl}/products/scraped`).pipe(
      finalize(() => this.isLoading.set(false))
    );
  }

  getPaginatedProducts(page: number = 1, limit: number = 20): Observable<PaginatedProducts> {
    this.isLoading.set(true);
    return this.http.get<PaginatedProducts>(
      `${this.apiUrl}/products/scraped?page=${page}&limit=${limit}`).pipe(
      finalize(() => this.isLoading.set(false))
    );
  }
}
