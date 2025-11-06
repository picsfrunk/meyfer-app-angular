import { CommonModule } from '@angular/common';
import { Component, signal, OnInit, inject, computed, Input, WritableSignal, effect } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzSpinComponent } from 'ng-zorro-antd/spin';
import { CategoryService } from '../../services/category.service';
import { MENU_ITEMS } from './menu-items';
import { MenuItem } from '../../models/menu-item.model';
import { Category } from '../../models/category.model';
import { ProductsService } from '../../services/products.service';

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

  /**
   * Computed que genera la lista completa con la categoría "Todos" al inicio.
   * Esta señal se reutiliza tanto para mostrar las categorías como para seleccionar por defecto.
   */
  fullCategories = computed(() => {
    const cats = this.categories();
    const totalProducts = cats.reduce((sum, cat) => sum + cat.product_count, 0);

    const allCategory: Category = {
      category_id: 0,
      category_name: 'Todos',
      product_count: totalProducts,
    };

    return [allCategory, ...cats];
  });

  ngOnInit(): void {
    this.categoryService.fetchCategories().subscribe({
      next: (categories) => {
        this.categoryService.categories.set(categories);

        const allCats = this.fullCategories();
        if (allCats.length > 0 && !this.selectedCategory()) {
          this.productService.selectedCategory.set(allCats[0]);
        }
      },
      error: (err) => console.error('Error loading categories', err)
    });

    // Efecto: cuando se cargan categorías y no hay selección, selecciona "Todos"
    effect(() => {
      const cats = this.fullCategories();
      if (cats.length > 0 && !this.selectedCategory()) {
        this.productService.selectedCategory.set(cats[0]); // "Todos"
      }
    });
  }

  onCategorySelected(category: Category): void {
    this.productService.selectedCategory.set(category);

    this.router.navigate(['/products'], {
      queryParams: {
        category_id: category.category_id || null,
        page: 1,
        search: null,
      },
      queryParamsHandling: 'merge',
    });

    this.isMobileMenuOpen.set(false);
  }
}
