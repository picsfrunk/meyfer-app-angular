import { Injectable, signal, computed, effect } from '@angular/core';
import { Product } from '../models/product.model';
import { CartItem } from '../models/cart-item.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly _items = signal<CartItem[]>([]);

  readonly items = this._items.asReadonly();
  readonly count = computed(() =>
    this._items().filter(it => it.productCartItem).reduce((acc, it) => acc + it.qty, 0)
  );
  readonly total = computed(() =>
    this._items().filter(it => it.productCartItem).reduce(
      (acc, it) => acc + (it.productCartItem.list_price ?? 0) * it.qty, 0
    )
  );

  constructor() {
    const stored = localStorage.getItem('cart');
    if (stored) {
      try {
        const parsed: CartItem[] = JSON.parse(stored);
        const validItems = parsed
          .filter(it => it?.productCartItem)
          .map(it => ({
            productCartItem: it.productCartItem as Product,
            qty: it.qty ?? 1
          }));
        this._items.set(validItems);
      } catch {
        this._items.set([]);
      }
    }

    effect(() => {
      localStorage.setItem('cart', JSON.stringify(this._items()));
    });
  }

  add(product: Product, qty = 1): void {
    const items = [...this._items()];
    const i = items.findIndex(ci => ci.productCartItem.product_id === product.product_id);
    if (i >= 0) items[i] = { ...items[i], qty: items[i].qty + qty };
    else items.push({ productCartItem: product, qty });
    this._items.set(items);
  }

  decrement(productId: number, qty = 1): void {
    const items = [...this._items()];
    const i = items.findIndex(ci => ci.productCartItem.product_id === productId);
    if (i >= 0) {
      if (items[i].qty > qty) items[i] = { ...items[i], qty: items[i].qty - qty };
      else items.splice(i, 1);
      this._items.set(items);
    }
  }

  remove(productId: number): void {
    this._items.set(this._items().filter(ci => ci.productCartItem.product_id !== productId));
  }

  clear(): void {
    this._items.set([]);
  }
}
