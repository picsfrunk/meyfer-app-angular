import { Component, inject, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { CategoryService } from '../core/services/category.service';
import { Category } from '../core/models/category.model';

@Component({
  selector: 'categories',
  standalone: true,
  imports: [CommonModule, NzMenuModule, NzSpinModule],
  template: `
    <div class="category-menu-container">
      <nz-spin [nzSpinning]="isLoading()">
        <ul nz-menu [nzMode]="'inline'">
          @for (cat of categories(); track cat.category_name) {
            <li nz-menu-item
                [nzSelected]="selectedCategory?.category_name === cat.category_name"
                (click)="onCategorySelect(cat)">
              <span class="category-name">{{ cat.category_name }}</span>
              <span class="product-count">({{ cat.product_count }})</span>
            </li>
          }
        </ul>
      </nz-spin>
    </div>
  `,
  styles: [`
    .category-menu-container {
      padding: 16px 0;
    }
    .category-name {
      margin-right: auto;
    }
    .product-count {
      margin-left: 10px;
      font-weight: bold;
      color: rgba(0,0,0,.45);
    }
    .ant-menu-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  `]
})
export class Categories implements OnInit {
  @Input() selectedCategory: Category | null = null;
  @Input({ required: true }) onCategorySelect!: (category: Category) => void;

  private categoryService = inject(CategoryService);

  categories = this.categoryService.categories;
  isLoading = this.categoryService.isLoading;

  ngOnInit(): void {
    this.categoryService.fetchCategories();
  }
}
