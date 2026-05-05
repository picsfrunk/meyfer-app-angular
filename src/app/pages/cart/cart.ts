import { Component, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
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

  decrement(productId: string): void {
    const currentItem = this.cartService.items().find(item => item.productCartItem.product_id === productId);

    if (!currentItem) {
      return;
    }

    if (currentItem.qty === 1) {
      this.confirmRemove(productId, currentItem.productCartItem.display_name);
    } else {
      this.cartService.decrement(productId);
    }
  }

  confirmRemove(productId: string, productName?: string): void {
    this.modalService.confirm({
      nzTitle: '¿Está seguro de eliminar este artículo?',
      nzContent: `"${productName || 'El artículo'}" será eliminado completamente del carrito.`,
      nzOkText: 'Sí, Eliminar',
      nzOkType: 'primary',
      nzCancelText: 'No, Cancelar',
      nzOnOk: () => {
        this.cartService.remove(productId);
      }
    });
  }

  remove(productId: string): void {
    const currentItem = this.cartService.items().find(item => item.productCartItem.product_id === productId);
    if (currentItem) {
      this.confirmRemove(productId, currentItem.productCartItem.display_name);
    } else {
      this.cartService.remove(productId);
    }
  }

  confirmClear(): void {
    this.modalService.confirm({
      nzTitle: '¿Está seguro de vaciar el carrito?',
      nzContent: 'Todos los artículos serán eliminados permanentemente.',
      nzOkText: 'Sí, Vaciar',
      nzOkType: 'primary',
      nzCancelText: 'No, Cancelar',
      nzOnOk: () => {
        this.cartService.clear();
      }
    });
  }

  clear(): void {
    if (this.cartService.count() > 0) {
      this.confirmClear();
    }
  }

  goToCheckout(): void {
    this.modalService.create({
      nzContent: OrderConfirm,
      nzWidth: 800,
      nzFooter: null
    });
  }
}
