import { Injectable, inject, signal} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Category, CategoryResponse } from '../models/category.model';


@Injectable({ providedIn: 'root' })
export class CategoryService {
  private apiUrl = environment.apiUrl;
  private http = inject(HttpClient);

  readonly categories = signal<Category[]>([]);
  readonly totalProducts = signal<number>(0);

  fetchCategories(): void {
    this.http.get<CategoryResponse>(`${this.apiUrl}/categories`)
      .pipe(
        map(res => {
          this.totalProducts.set(res.totalProducts); // Guarda el total en otra signal
          return res.categories; // Retorna solo el array de categorías
        })
      )
      .subscribe({
        next: (categories) => {
          this.categories.set(categories); // Establece la signal con las categorías extraídas
        },
        error: (err) => console.error('Error loading categories', err)
      });
  }

}
