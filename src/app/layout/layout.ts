import { Component } from '@angular/core';
import {CartBadge} from '../shared/cart-badge';
import {NzContentComponent, NzHeaderComponent, NzLayoutComponent, NzSiderComponent} from 'ng-zorro-antd/layout';
import {RouterOutlet} from '@angular/router';
import {Menu} from '../core/components/sidebar/menu.component';

@Component({
  selector: 'app-layout',
  imports: [
    CartBadge,
    NzContentComponent,
    NzHeaderComponent,
    NzLayoutComponent,
    NzSiderComponent,
    RouterOutlet,
    Menu
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.scss'
})
export class Layout {

}
