import {CommonModule} from '@angular/common';
import {Component, signal, OnInit, inject, computed, Input, WritableSignal} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {CategoryService} from '../../services/category.service';
import {MENU_ITEMS} from './menu-items';
import {MenuItem} from '../../models/menu-item.model';
import {Category} from '../../models/category.model';
import {ProductsService} from '../../services/products.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterLink, NzIconModule, NzMenuModule, NzSpinComponent],
  templateUrl: './menu.html',
  styleUrls: ['./menu.scss'],

})
export class Menu implements OnInit {
  private categoryService = inject(CategoryService);
  private productService = inject(ProductsService);
  private router = inject(Router);

  categories = this.categoryService.categories;
  isLoadingCategories = this.categoryService.isLoading;
  selectedCategory = this.productService.selectedCategory;
  @Input() isMobileMenuOpen!: WritableSignal<boolean>;

  readonly menuItems: MenuItem[] = MENU_ITEMS;

  ngOnInit(): void {
    this.categoryService.fetchCategories();

  }

  onCategorySelected = (category: Category) => {
    this.productService.selectedCategory.set(category);

    let queryParams: any = {
      category_id: category.category_id || null,
      page: 1,
      search: null
    };

    this.router.navigate(['/products'], {
      queryParams,
      queryParamsHandling: 'merge'
    });

    this.isMobileMenuOpen.set(false);
  };

  fullCategories = computed(() => {
    const allCategory: Category = {
      category_id: 0,
      category_name: 'Todos',
      product_count: this.categories().reduce((sum, cat) => sum + cat.product_count, 0)
    };
    return [allCategory, ...this.categories()];
  });

}
