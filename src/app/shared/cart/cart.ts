import {Component, inject} from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { CurrencyPipe } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe, NzButtonModule, NzListModule, NzTypographyModule],
  template: `
    <nz-list [nzDataSource]="cartService.items()" nzBordered [nzRenderItem]="item">
      <ng-template #item let-element>
        <nz-list-item>
          <div class="flex justify-between items-center w-full">
            <span>{{ element.item.display_name }} x{{ element.qty }}</span>
            <div class="space-x-1">
              <button nz-button nzSize="small" nzType="default" (click)="add(element.item)">+</button>
              <button nz-button nzSize="small" nzType="default" (click)="decrement(element.item.product_id)">-</button>
              <button nz-button nzSize="small" nzDanger (click)="remove(element.item.product_id)">x</button>
            </div>
          </div>
        </nz-list-item>
      </ng-template>
    </nz-list>

    <div class="mt-4">
      <p nz-typography>Total items: {{ cartService.count() }}</p>
      <p nz-typography>Total: {{ cartService.total() | currency }}</p>
      <button nz-button nzType="primary" nzDanger (click)="clear()">Vaciar</button>
    </div>
  `
})
export class Cart {
  cartService = inject(CartService);

  add(product: any) {
    this.cartService.add(product);
  }

  decrement(productId: number) {
    this.cartService.decrement(productId);
  }

  remove(productId: number) {
    this.cartService.remove(productId);
  }

  clear() {
    this.cartService.clear();
  }
}
