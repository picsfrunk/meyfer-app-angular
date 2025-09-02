import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {CartBadge} from './shared/cart-badge';
import {Sidebar} from './core/components/sidebar/sidebar';
import {Layout} from './layout/layout';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NzLayoutModule, CartBadge, Sidebar, Layout],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

}
