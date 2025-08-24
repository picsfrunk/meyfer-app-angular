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
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss'],

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
