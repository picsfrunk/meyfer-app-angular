import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartService } from './cart.service';
import { Observable } from 'rxjs';
import {environment} from '../../../environments/environment';

export interface OrderPayload {
  customerInfo: {
    customerCode: string;
  };
  customerNote: string;
  delivery: {
    address: {
      calle?:       string;
      numero?:      string;
      piso?:        string;
      timbre?:      string;
      entreCalles?: string;
      localidad?:   string;
      partido?:     string;
    };
    schedule?: string;
  };
  cartItems: OrderCartItem[];
  extraCharge?: number;
}

export interface OrderResponse {
  orderId: string;
  status: string;
  message: string;
}

interface OrderCartItem {
  productCartItem: { product_id: string };
  qty: number;
  priceAtPurchase: number;
}

interface OrderFormValue {
  customerCode?: string;
  direccion?: OrderPayload['delivery']['address'];
  horarios?: string;
  notas?: string;
}

@Injectable({ providedIn: 'root' })
export class OrderService {
  private http = inject(HttpClient);
  private cartService = inject(CartService);

  private apiUrl = environment.apiUrl;
  private readonly endpoint = '/orders/new';

  constructor() {}

  /** Construye el payload completo del pedido desde el formulario */
  buildOrderPayload(formValue: OrderFormValue): OrderPayload {
    const { direccion, customerCode, horarios, notas } = formValue;

    return {
      customerInfo: { customerCode: this.normalizeText(customerCode).toUpperCase() },
      customerNote: this.normalizeText(notas),

      delivery: {
        address: this.compactAddress(direccion),
        schedule: this.normalizeText(horarios)
      },

      cartItems: this.cartService.items().map(item => ({
        productCartItem: { product_id: item.productCartItem.product_id },
        qty: item.qty,
        priceAtPurchase: item.productCartItem.final_price ?? 0
      }))
    };
  }

  private compactAddress(address: OrderFormValue['direccion'] = {}): OrderPayload['delivery']['address'] {
    return Object.entries(address).reduce<OrderPayload['delivery']['address']>((acc, [key, value]) => {
      const normalizedValue = this.normalizeText(value);
      if (normalizedValue) {
        acc[key as keyof OrderPayload['delivery']['address']] = normalizedValue;
      }

      return acc;
    }, {});
  }

  private normalizeText(value: unknown): string {
    return typeof value === 'string' ? value.trim() : '';
  }

  /**
   * Envía el pedido al backend
   */
  submitOrder(payload: OrderPayload): Observable<OrderResponse> {
    return this.http.post<OrderResponse>(`${this.apiUrl}${this.endpoint}`, payload);
  }

  /**
   * Limpia el carrito después de un envío exitoso
   */
  clearCart(): void {
    this.cartService.clear();
  }
}
