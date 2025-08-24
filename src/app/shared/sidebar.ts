import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { Categories } from './categories';
import { Category } from '../core/models/category.model';
import { MenuItem, MENU_ITEMS } from '../core/menu/menu-items';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, NzIconModule, NzMenuModule, Categories],
  template: `
    <ul nz-menu nzMode="inline">

      @for (item of menuItems; track item.link) {
        <li nz-menu-item [routerLink]="item.link" [nzDisabled]="item.disabled">
          <nz-icon class="large-icon" [nzType]="item.icon" nzTheme="outline" style="cursor:pointer;" />
          <span> {{ item.title }} </span>
        </li>


      }

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
  readonly menuItems: MenuItem[] = MENU_ITEMS;

  selectedCategory = signal<Category | null>(null);
  onCategorySelected = (category: Category) => {
    this.selectedCategory.set(category);
    console.log('Categoría seleccionada desde sidebar:', category.category_name);
  };

}
