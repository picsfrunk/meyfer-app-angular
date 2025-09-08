import { CommonModule } from '@angular/common';
import {Component, signal, OnInit, inject, computed} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import {MenuService, NzMenuModule} from 'ng-zorro-antd/menu';
import { NzSpinComponent } from 'ng-zorro-antd/spin';
import {CategoryService} from '../../services/category.service';
import {MENU_ITEMS} from './menu-items';
import {MenuItem} from '../../models/menu-item.model';
import {Category} from '../../models/category.model';
import {ProductsService} from '../../services/products.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterLink, NzIconModule, NzMenuModule, NzSpinComponent],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],

})
export class Menu implements OnInit {
  private categoryService = inject(CategoryService);
  private productService = inject(ProductsService);
  private router = inject(Router);

  categories = this.categoryService.categories;
  isLoadingCategories = this.categoryService.isLoading;
  selectedCategory = signal<Category | null>(null);

  readonly menuItems: MenuItem[] = MENU_ITEMS;

  ngOnInit(): void {
    this.categoryService.fetchCategories();

  }

  onCategorySelected = (category: Category) => {
    this.productService.selectedCategory.set(category);
    let queryParams: any;

    if (!category.category_id) {
      queryParams = { category_id: null };
    } else {
      queryParams = { category_id: category.category_id, page: 1 };
    }

    this.router.navigate(['/products'], {
      queryParams,
      queryParamsHandling: 'merge'
    });
  };

  fullCategories = computed( () => {
    const allCategory: Category = {
      category_id: 0,
      category_name: 'Todos',
      product_count: this.categories().reduce((sum, cat) => sum + cat.product_count, 0)
    };
    return [allCategory, ...this.categories()];
  });

}
