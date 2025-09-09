import { Component } from '@angular/core';
import {CartBadge} from '../shared/cart-badge';
import {NzContentComponent, NzHeaderComponent, NzLayoutComponent, NzSiderComponent} from 'ng-zorro-antd/layout';
import {RouterOutlet} from '@angular/router';
import {Menu} from '../core/components/sidebar/menu.component';
import {NzDrawerModule} from 'ng-zorro-antd/drawer';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzButtonComponent} from 'ng-zorro-antd/button';

@Component({
  selector: 'app-layout',
  imports: [
    CartBadge,
    NzContentComponent,
    NzHeaderComponent,
    NzLayoutComponent,
    NzSiderComponent,
    RouterOutlet,
    Menu,
    NzDrawerModule,
    NzIconDirective,
    NzButtonComponent
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.scss'
})
export class Layout {
  isMobileMenuOpen = false;

  close(): void {
    this.isMobileMenuOpen = false;
  }

}
