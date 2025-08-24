import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { Categories } from './categories';
import { Category } from '../core/models/category.model';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, NzIconModule, NzMenuModule, Categories],
  template: `
    <ul nz-menu nzMode="inline">
      <!-- Ítem principal -->
      <li nz-menu-item>
        <span nz-icon [nzType]="catalogMenu.icon"></span>
        <span>{{ catalogMenu.title }}</span>
      </li>

      <!-- Lista de categorías fija -->
      <categories
        [selectedCategory]="selectedCategory()"
        [onCategorySelect]="onCategorySelected">
      </categories>
    </ul>
  `,
  styles: [`
    :host {
      display: block;
    }
    ul[nz-menu] {
      border-right: none;
    }
    li[nz-menu-item] {
      padding-left: 24px; /* sangría para diferenciar categorías del título */
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
