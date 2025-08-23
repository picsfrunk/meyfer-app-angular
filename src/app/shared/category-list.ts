// src/app/shared/components/category-list/category-list.ts
import { Component, inject, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { Category } from '../core/models/category.model';
import { CategoryService } from '../core/services/category.service';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule, NzListModule, NzButtonModule],
  template: `
    <nz-list [nzSplit]="false"
             [nzLoading]="isLoading()"
    >
      @for (cat of categories(); track cat.category_name) {
        <nz-list-item>
          <button
            nz-button
            [nzType]="selectedCategory?.category_name === cat.category_name ? 'primary' : 'default'"
            nzBlock
            (click)="onCategorySelect(cat)"
          >
            {{ cat.category_name }}
            <span style="margin-left:auto; font-weight:500; color: rgba(0,0,0,.65)">
              {{ cat.product_count }}
            </span>
          </button>
        </nz-list-item>
      }
    </nz-list>
  `,
  styles: [`
    nz-list {
      padding: 0;
    }
    button[nz-button] {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  `]
})
export class CategoryList implements OnInit {
  @Input() selectedCategory: Category | null = null;
  @Input({ required: true }) onCategorySelect!: (category: Category) => void;

  private categoryService = inject(CategoryService);
  categories = this.categoryService.categories;
  isLoading = this.categoryService.isLoading;

  ngOnInit(): void {
    this.categoryService.fetchCategories();
  }
}
