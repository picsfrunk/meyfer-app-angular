import {Component, Input, signal} from '@angular/core';
import {RouterLink} from '@angular/router';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {Categories} from './categories';
import {Category} from '../core/models/category.model';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, NzIconModule, NzMenuModule, Categories],
  template: `
    <ul nz-menu nzMode="inline" >
      <li nz-submenu [nzTitle]="catalogMenu.title" [nzIcon]="catalogMenu.icon">
        <ul>
          <li>
            <categories
              [selectedCategory]="selectedCategory()"
              [onCategorySelect]="onCategorySelected"
            ></categories>
          </li>
        </ul>
      </li>
    </ul>
  `,
  styles: [`
    :host {
      display: block;
    }

    ul[nz-menu] {
      border-right: none;
    }
  `]
})
export class Sidebar {
  selectedCategory = signal<Category | null>(null);

  onCategorySelected = (category: Category) => {
    this.selectedCategory.set(category);
    console.log('Categoría seleccionada desde sidebar:', category.category_name);
  };

  catalogMenu = {
    title: 'Catálogo',
    icon: 'shop',
    link: '/products'
  };
}
