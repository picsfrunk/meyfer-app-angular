import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import {finalize, map} from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { PaginatedProducts } from '../models/product.model';
import {Category, CategoryResponse} from '../models/category.model';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private apiUrl = environment.apiUrl;
  private http = inject(HttpClient);

  readonly isLoadingMany: WritableSignal<boolean> = signal(false);
  readonly selectedCategory: WritableSignal<Category | null> = signal(null);
  readonly isLoading = signal<boolean>(false);

  readonly categories = signal<Category[]>([]);
  readonly totalProducts = signal<number>(0);

  /**
   * Obtiene productos paginados.
   * Si se pasa categoryId, se usará ese valor; si no, se usará selectedCategory() si existe.
   */
  getPaginatedProducts(
    page: number = 1,
    limit: number = 20,
    search: string = '',
    categoryId?: number | null
  ): Observable<PaginatedProducts> {
    this.isLoadingMany.set(true);

    const catIdToUse =
      typeof categoryId !== 'undefined'
        ? categoryId
        : this.selectedCategory() ? this.selectedCategory()!.category_id : null;

    let params = new HttpParams()
      .set('page', String(page))
      .set('limit', String(limit));

    if (search && search.trim() !== '') {
      params = params.set('search', search.trim());
    }

    if (catIdToUse !== null && typeof catIdToUse !== 'undefined') {
      params = params.set('category_id', String(catIdToUse));
    }

    return this.http
      .get<PaginatedProducts>(`${this.apiUrl}/products/scraped`, { params })
      .pipe(finalize(() => this.isLoadingMany.set(false)));
  }

  fetchCategories(): void {
    this.isLoading.set(true);

    this.http.get<CategoryResponse>(`${this.apiUrl}/categories`)
      .pipe(
        map(res => {
          this.totalProducts.set(res.totalProducts);
          return res.categories;
        }),
        finalize(() => this.isLoading.set(false))
      )
      .subscribe({
        next: (categories) => this.categories.set(categories),
        error: (err) => console.error('Error loading categories', err)
      });
  }


}
