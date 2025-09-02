import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart-item.model';

@Injectable({ providedIn: 'root' })
export class CartStorageService {
  private storageKey = 'cart';

  loadCart(): CartItem[] {
    const stored = localStorage.getItem(this.storageKey);
    if (!stored) return [];
    try {
      const parsed: CartItem[] = JSON.parse(stored);
      return parsed.filter(it => it?.productCartItem);
    } catch {
      return [];
    }
  }

  saveCart(items: CartItem[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(items));
  }

  clearCart(): void {
    localStorage.removeItem(this.storageKey);
  }
}
