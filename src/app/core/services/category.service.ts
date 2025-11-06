import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Category, CategoryResponse } from '../models/category.model';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private apiUrl = environment.apiUrl;
  private http = inject(HttpClient);

  readonly isLoading = signal<boolean>(false);
  readonly categories = signal<Category[]>([]);
  readonly totalProducts = signal<number>(0);

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
