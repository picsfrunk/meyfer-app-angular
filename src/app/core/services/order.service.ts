import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartService } from './cart.service';
import { Observable } from 'rxjs';
import {environment} from '../../../environments/environment';

export interface OrderPayload {
  customerInfo: {
    customerCode: string;
  };
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
    contactName?: string;
    contactPhone?: string;
    schedule?: string;
  };
  cartItems:    any[];
  extraCharge?: number;
}

export interface OrderResponse {
  orderId: string;
  status: string;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class OrderService {
  private http = inject(HttpClient);
  private cartService = inject(CartService);

  private apiUrl = environment.apiUrl;
  private readonly endpoint = '/orders/new';

  constructor() {}

  /** Construye el payload completo del pedido desde el formulario */
  buildOrderPayload(formValue: any): OrderPayload {
    const { direccion, customerCode, horarios } = formValue;

    return {
      customerInfo: { customerCode },

      // ✅ NUEVO FORMATO
      delivery: {
        address: direccion ?? {},
        contactName: '',        // por ahora vacío (backend usa fallback del cliente)
        contactPhone: '',       // idem
        schedule: horarios || ''
      },

      cartItems: this.cartService.items().map(item => ({
        productCartItem: { product_id: item.productCartItem?.product_id },
        qty: item.qty,
        priceAtPurchase: item.productCartItem?.final_price ?? 0
      }))
    };
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
