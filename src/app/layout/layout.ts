import {Component, signal} from '@angular/core';
import {CartBadge} from '../shared/cart-badge';
import {NzContentComponent, NzHeaderComponent, NzLayoutComponent, NzSiderComponent} from 'ng-zorro-antd/layout';
import {RouterOutlet} from '@angular/router';
import {Menu} from '../core/components/sidebar/menu';
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
  isMobileMenuOpen = signal<boolean>(false);

  close(): void {
    this.isMobileMenuOpen.set(false);
  }

}
