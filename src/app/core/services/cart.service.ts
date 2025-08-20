import { Injectable, signal, computed, effect } from '@angular/core';
import { Product } from '../models/product.model';

export interface CartItem {
  product: Product;
  qty: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly _items = signal<CartItem[]>([]);

  readonly items = this._items.asReadonly();
  readonly count = computed(() =>
    this._items().reduce((acc, it) => acc + it.qty, 0)
  );
  readonly total = computed(() =>
    this._items().reduce((acc, it) => acc + (it.product.list_price ?? 0) * it.qty, 0)
  );

  constructor() {
    const stored = localStorage.getItem('cart');
    if (stored) this._items.set(JSON.parse(stored));

    effect(() => {
      localStorage.setItem('cart', JSON.stringify(this._items()));
    });
  }

  add(product: Product, qty = 1): void {
    const items = [...this._items()];
    const i = items.findIndex(ci => ci.product.product_id === product.product_id);
    if (i >= 0) items[i] = { ...items[i], qty: items[i].qty + qty };
    else items.push({ product, qty });
    this._items.set(items);
  }

  decrement(productId: number, qty = 1): void {
    const items = [...this._items()];
    const i = items.findIndex(ci => ci.product.product_id === productId);
    if (i >= 0) {
      if (items[i].qty > qty) items[i] = { ...items[i], qty: items[i].qty - qty };
      else items.splice(i, 1);
      this._items.set(items);
    }
  }

  remove(productId: number): void {
    this._items.set(this._items().filter(ci => ci.product.product_id !== productId));
  }

  clear(): void {
    this._items.set([]);
  }
}
