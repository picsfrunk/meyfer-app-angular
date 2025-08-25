import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from "rxjs/operators";
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { PaginatedProducts, Product } from '../models/product.model';
import {Category} from '../models/category.model';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private apiUrl = environment.apiUrl;
  private http = inject(HttpClient);

  readonly isLoading: WritableSignal<boolean> = signal(false);
  readonly selectedCategory: WritableSignal<Category | null> = signal(null);

  getPaginatedProducts(page: number = 1, limit: number = 20, category_id?: number, search: string = ''): Observable<PaginatedProducts> {
    this.isLoading.set(true);

    let params = new HttpParams()
      .set('page', page.toString() )
      .set('limit', limit.toString() )
      .set('search', search );

    if ( this.selectedCategory() ) {
      params = params.set('category_id', this.selectedCategory()!.category_id);
    }

    return this.http.get<PaginatedProducts>(`${this.apiUrl}/products/scraped`, { params: params }).pipe(
      finalize(() => this.isLoading.set(false))
    );
  }
}
