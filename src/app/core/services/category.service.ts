import {Injectable, inject, signal} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'; // Importa el operador 'map'
import { environment } from '../../../environments/environment';
import { Category, CategoryResponse } from '../models/category.model';


@Injectable({ providedIn: 'root' })
export class CategoryService {
  private apiUrl = environment.apiUrl;
  private http = inject(HttpClient);

  /** Signal que contiene solo la lista de categorías */
  readonly categories = signal<Category[]>([]);
  /** Signal que contiene el total de productos de todas las categorías */
  readonly totalProducts = signal<number>(0);

  /** Carga las categorías y el total de productos desde el backend */
  fetchCategories(): void {
    // 🟢 La respuesta se tipa correctamente como CategoryResponse
    this.http.get<CategoryResponse>(`${this.apiUrl}/categories`)
      // 🟢 Usa 'pipe' y 'map' para transformar la respuesta
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
