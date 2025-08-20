import {Component, inject} from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-cart-badge',
  standalone: true,
  imports: [NzBadgeModule, NzIconModule],
  template: `
    <nz-badge [nzCount]="cartService.count()" nzShowZero>
      <nz-icon nzType="shopping-cart" nzTheme="outline" />
    </nz-badge>
  `
})
export class CartBadge {
  cartService = inject(CartService);
}
