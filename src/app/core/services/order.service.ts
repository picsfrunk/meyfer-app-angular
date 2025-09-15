import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartService } from './cart.service';
import { Observable } from 'rxjs';
import {environment} from '../../../environments/environment';

export interface OrderPayload {
  customerInfo: any;   // Podés tiparlo mejor según tu form
  cartItems: any[];
  total: number;
  totalItems: number;
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

  /**
   * Construye el payload completo del pedido desde el formulario
   */
  buildOrderPayload(customerInfo: any): OrderPayload {
    return {
      customerInfo,
      cartItems: this.cartService.items(),
      total: this.cartService.total(),
      totalItems: this.cartService.count()
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
