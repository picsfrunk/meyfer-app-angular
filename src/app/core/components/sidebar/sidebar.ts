import { CommonModule } from '@angular/common';
import {Component, signal, OnInit, inject, computed} from '@angular/core';
import { RouterLink } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzSpinComponent } from 'ng-zorro-antd/spin';
import {CategoryService} from '../../services/category.service';
import {MENU_ITEMS} from './menu-items';
import {MenuItem} from '../../models/menu-item.model';
import {Category} from '../../models/category.model';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, NzIconModule, NzMenuModule, NzSpinComponent],
  template: `
    <ul nz-menu nzMode="inline" [nzInlineCollapsed]="false">
      @for (item of menuItems; track item.title) {
        @if (item.subMenuType) {
          <li nz-submenu [nzTitle]="item.title" [nzIcon]="item.icon" [nzOpen]="true">
              <ul>
                @if (item.subMenuType === 'categories') {
                  <nz-spin [nzSpinning]="isLoadingCategories()">
                      @for (cat of fullCategories(); track cat.category_name) {
                        <li nz-menu-item
                            [nzSelected]="selectedCategory()?.category_name === cat.category_name"
                            (click)="onCategorySelected(cat)">
                          <span class="category-name">{{ cat.category_name }}</span>
                          <span class="product-count">({{ cat.product_count }})</span>
                        </li>
                      }
                    </nz-spin>
                } @else if (item.subMenuType === 'default' && item.children) {
                  @for (child of item.children; track child.title) {
                    <li nz-menu-item [routerLink]="child.link" [nzDisabled]="child.disabled">
                      <span nz-icon [nzType]="child.icon"></span>
                      <span>{{ child.title }}</span>
                    </li>
                  }
                }
              </ul>
          </li>
        } @else {
          <li nz-menu-item [routerLink]="item.link" [nzDisabled]="item.disabled">
            <span nz-icon [nzType]="item.icon"></span>
            <span>{{ item.title }}</span>
          </li>
        }
      }
    </ul>
  `,
  styles: [`
    :host {
      display: block;
    }
    .ant-menu-inline {
      border-right: none;
    }
    li.ant-menu-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .category-name {
      margin-right: auto;
      padding-left: 1em;
    }
    .product-count {
      margin-left: 10px;
      font-weight: bold;
      color: rgba(0,0,0,.45);
    }
  `]
})
export class Sidebar implements OnInit {
  private categoryService = inject(CategoryService);

  categories = this.categoryService.categories;
  isLoadingCategories = this.categoryService.isLoading;
  selectedCategory = signal<Category | null>(null);

  readonly menuItems: MenuItem[] = MENU_ITEMS;

  ngOnInit(): void {
    this.categoryService.fetchCategories();
  }

  onCategorySelected = (category: Category) => {
    this.selectedCategory.set(category);
    console.log('Categoría seleccionada desde sidebar:', category.category_name);
  };

  fullCategories = computed(() => {
    const allCategory: Category = {
      category_name: 'Todos',
      product_count: this.categories().reduce((sum, cat) => sum + cat.product_count, 0)
    };
    return [allCategory, ...this.categories()];
  });

}
