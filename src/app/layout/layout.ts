import { Component } from '@angular/core';
import {CartBadge} from '../shared/cart-badge';
import {NzContentComponent, NzHeaderComponent, NzLayoutComponent, NzSiderComponent} from 'ng-zorro-antd/layout';
import {RouterOutlet} from '@angular/router';
import {Sidebar} from '../core/components/sidebar/sidebar';

@Component({
  selector: 'app-layout',
  imports: [
    CartBadge,
    NzContentComponent,
    NzHeaderComponent,
    NzLayoutComponent,
    NzSiderComponent,
    RouterOutlet,
    Sidebar
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.scss'
})
export class Layout {

}
