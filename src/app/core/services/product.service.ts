import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  // Mock inicial; luego podés reemplazar por HttpClient
  private readonly data: Product[] = [
    { id: 'p-001', nombre: 'Bomba Centrífuga', precio: 120000, descripcion: 'Equipo de alta presión para agua potable' },
    { id: 'p-002', nombre: 'Motor Eléctrico 5HP', precio: 45000, descripcion: 'Motor trifásico 5HP para bombeo' },
    { id: 'p-003', nombre: 'Filtro de Arena', precio: 30000, descripcion: 'Filtro para tratamiento de agua' },
    { id: 'p-004', nombre: 'Presurizador Compacto', precio: 210000, descripcion: 'Equipo compacto para edificios bajos' },
    { id: 'p-005', nombre: 'Variador de Frecuencia', precio: 165000, descripcion: 'Control de velocidad para bombas' },
  ];

  list(): Observable<Product[]> {
    // simulamos latencia de red
    return of(this.data).pipe(delay(250));
    // -> con HTTP real: return this.http.get<Product[]>('/api/products');
  }
}
