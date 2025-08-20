import {Component, inject} from '@angular/core';
import { CartService } from '../core/services/cart.service';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzIconModule } from 'ng-zorro-antd/icon';
import {NzModalModule, NzModalService} from 'ng-zorro-antd/modal';
import {Cart} from './cart/cart';


@Component({
  selector: 'app-cart-badge',
  standalone: true,
  imports: [NzBadgeModule, NzIconModule, NzModalModule],
  template: `
    <nz-badge [nzCount]="cartService.count()" nzShowZero (click)="openCart()">
      <nz-icon class="large-icon" nzType="shopping-cart" nzTheme="outline" style="cursor:pointer;" />
    </nz-badge>
  `
})
export class CartBadge {
  cartService = inject(CartService);
  modal = inject(NzModalService);

  openCart() {
    this.modal.create({
      nzTitle: 'Carrito de compras',
      nzContent: Cart,
      nzFooter: null,
      nzWidth: 800
    });
  }
}

