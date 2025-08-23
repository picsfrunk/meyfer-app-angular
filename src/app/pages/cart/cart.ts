import { Component, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common'; // Agrega CommonModule
import { CartService } from '../../core/services/cart.service';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzModalService} from 'ng-zorro-antd/modal';
import { OrderConfirm } from '../order/order-confirm';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    CurrencyPipe,
    NzButtonModule,
    NzListModule,
    NzTypographyModule,
    NzIconDirective
  ],
  styleUrls: ['./cart.scss'],
  templateUrl: './cart.html'
})
export class Cart {
  cartService = inject(CartService);
  private modalService = inject(NzModalService);

  add(product: any) {
    this.cartService.add(product);
  }

  decrement(productId: number): void {
    this.cartService.decrement(productId);
  }

  remove(productId: number): void {
    this.cartService.remove(productId);
  }

  clear(): void {
    this.cartService.clear();
  }

  goToCheckout(): void {
    const modalRef = this.modalService.create({
      nzTitle: 'Confirmar Pedido',
      nzContent: OrderConfirm,
      nzWidth: 800,
      nzFooter: null // No necesitas footer si el componente tiene sus propios botones
    });
  }
}
