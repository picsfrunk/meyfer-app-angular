// src/app/shared/components/category-list/category-list.ts
import { Component, inject, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzButtonModule } from 'ng-zorro-antd/button';
import {Category } from '../core/models/category.model';
import { CategoryService } from '../core/services/category.service';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule, NzListModule, NzButtonModule],
  template: `
    <nz-list [nzBordered]="false" class="category-list">
      @for (cat of categories(); track cat.category_name) {
        <nz-list-item>
          <button
            nz-button
            nzType="default"
            class="category-btn"
            [class.selected]="selectedCategory && selectedCategory.category_name === cat.category_name"
            (click)="selectCategory(cat)"
          >
            {{ cat.category_name }}
            <span class="count">({{ cat.product_count }})</span>
          </button>
        </nz-list-item>
      }
    </nz-list>
  `,
  styles: [`
    .category-list {
      padding: 0;
    }
    .category-btn {
      display: flex;
      justify-content: space-between;
      width: 100%;
      text-align: left;
      padding: 8px 12px;
      margin-bottom: 4px;
      font-size: 14px;
      border: 1px solid #d9d9d9;
    }
    .category-btn.selected {
      background-color: #e6f7ff;
      border-color: #91d5ff;
      color: #1890ff;
      font-weight: bold;
    }
    .count {
      font-weight: bold;
      color: #1890ff;
    }
    .category-btn.selected .count {
      color: #1890ff;
    }
  `]
})
export class CategoryList implements OnInit {
  /** Recibe la categoría seleccionada del componente padre */
  @Input() selectedCategory: Category | null = null;
  /** Emite un evento cuando se selecciona una nueva categoría */
  @Output() categorySelected = new EventEmitter<Category>();

  private categoryService = inject(CategoryService);

  categories = this.categoryService.categories;

  ngOnInit(): void {
    this.categoryService.fetchCategories();
  }

  selectCategory(category: Category): void {
    this.categorySelected.emit(category);
  }
}
