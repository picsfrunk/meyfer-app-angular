import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.model';

export interface CartItem {
  product: Product;
  qty: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly _items$ = new BehaviorSubject<CartItem[]>([]);
  readonly items$ = this._items$.asObservable();

  add(product: Product, qty = 1): void {
    const items = [...this._items$.value];
    const i = items.findIndex(ci => ci.product.id === product.id);
    if (i >= 0) items[i] = { ...items[i], qty: items[i].qty + qty };
    else items.push({ product, qty });
    this._items$.next(items);
  }

  remove(productId: string): void {
    this._items$.next(this._items$.value.filter(ci => ci.product.id !== productId));
  }

  clear(): void {
    this._items$.next([]);
  }

  count(): number {
    return this._items$.value.reduce((acc, it) => acc + it.qty, 0);
  }
}
