import {CommonModule} from '@angular/common';
import {Component, signal, OnInit, inject, computed, Input, WritableSignal, OnDestroy} from '@angular/core';
import {Router, RouterLink, ActivatedRoute} from '@angular/router';
import {toObservable} from '@angular/core/rxjs-interop';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {MENU_ITEMS} from './menu-items';
import {MenuItem} from '../../models/menu-item.model';
import {Category} from '../../models/category.model';
import {ProductsService} from '../../services/products.service';
import {Subject} from 'rxjs';
import {takeUntil, filter, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterLink, NzIconModule, NzMenuModule, NzSpinComponent],
  templateUrl: './menu.html',
  styleUrls: ['./menu.scss'],
})
export class Menu implements OnInit, OnDestroy {
  private productService = inject(ProductsService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private destroy$ = new Subject<void>();

  categories = this.productService.categories;
  isLoadingCategories = this.productService.isLoading;
  selectedCategory = this.productService.selectedCategory;
  @Input() isMobileMenuOpen!: WritableSignal<boolean>;

  readonly menuItems: MenuItem[] = MENU_ITEMS;

  private categories$ = toObservable(this.categories);

  showCategories = signal<boolean>(true);

  toggleCategories() {
    this.showCategories.update(v => !v);
  }

  ngOnInit(): void {
    this.productService.fetchCategories();

    this.categories$
      .pipe(
        filter(cats => cats.length > 0),
        switchMap(() => this.route.queryParams),
        takeUntil(this.destroy$)
      )
      .subscribe(params => {
        this.syncCategoryFromParams(params);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private syncCategoryFromParams(params: any): void {
    const categoryId = params['category_id'];
    console.log(`[menu]: category_id=${categoryId}`);
    let targetCategoryId: number;

    if (categoryId === undefined || categoryId === null || categoryId === '') {
      targetCategoryId = 0; // "Todos"
    } else {
      targetCategoryId = Number(categoryId);
    }

    const category = this.fullCategories().find(
      cat => cat.category_id === targetCategoryId
    );

    if (category && this.selectedCategory()?.category_id !== category.category_id) {
      this.productService.selectedCategory.set(category);
    }
  }

  onCategorySelected = (category: Category) => {
    this.productService.selectedCategory.set(category);

    const queryParams: any = {
      category_id: category.category_id === 0 ? null : category.category_id,
      page: 1,
      search: null
    };

    this.router.navigate(['/products'], {
      queryParams,
      queryParamsHandling: 'merge'
    });

    this.isMobileMenuOpen?.set(false);
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
