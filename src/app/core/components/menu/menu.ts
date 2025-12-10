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
import {Subject, combineLatest} from 'rxjs';
import {takeUntil, filter, startWith} from 'rxjs/operators';
import {Brand} from '../../models/brand.model';

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

  // Señales de Categoría
  categories = this.productService.categories;
  isLoadingCategories = this.productService.isLoading;
  selectedCategory = this.productService.selectedCategory;

  // Señales de Marca
  brands = this.productService.brandsObjects;
  isLoadingBrands = this.productService.isLoadingBrands;
  readonly selectedBrand: WritableSignal<string | null> = signal(null);

  @Input() isMobileMenuOpen!: WritableSignal<boolean>;

  readonly menuItems: MenuItem[] = MENU_ITEMS;

  private categories$ = toObservable(this.categories);
  private brands$ = toObservable(this.brands);

  showCategories = signal<boolean>(true);

  toggleCategories() {
    this.showCategories.update(v => !v);
  }

  ngOnInit(): void {
    this.productService.fetchCategories();
    this.productService.fetchBrands();
    console.log(this.brands());

    combineLatest([
      this.categories$.pipe(filter(cats => cats.length > 0)),
      // Solo sincronizamos una vez que las marcas tengan datos
      this.brands$.pipe(filter(brands => brands.length > 0)),
      this.route.queryParams.pipe(startWith(this.route.snapshot.queryParams))
    ])
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(([categories, brands, params]) => {
        this.syncCategoryFromParams(params);
        this.syncBrandFromParams(params);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // --- Lógica de Sincronización de Parámetros ---

  private syncCategoryFromParams(params: any): void {
    const categoryId = params['category_id'];
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

  private syncBrandFromParams(params: any): void {
    const brandName = params['brand'] || null;

    if (brandName !== this.selectedBrand()) {

      if (brandName) {
        const foundBrand = this.brands().find(b => b.name === brandName);
        this.selectedBrand.set(foundBrand ? brandName : null);
      } else {
        this.selectedBrand.set(null);
      }
    }
  }


  // --- Manejadores de Eventos ---

  onCategorySelected = (category: Category) => {
    this.productService.selectedCategory.set(category);

    const queryParams: any = {
      category_id: category.category_id === 0 ? null : category.category_id,
      page: 1,
      search: null,
      brand: null
    };

    this.router.navigate(['/products'], {
      queryParams,
      queryParamsHandling: 'merge'
    });

    this.isMobileMenuOpen?.set(false);
  };

  onBrandSelected = (brandName: string | null) => {
    const newBrand = this.selectedBrand() === brandName ? null : brandName;

    this.selectedBrand.set(newBrand);

    const queryParams: any = {
      brand: newBrand,
      page: 1,
    };

    this.router.navigate(['/products'], {
      queryParams,
      queryParamsHandling: 'merge'
    });

    this.isMobileMenuOpen?.set(false);
  };

  // --- Computed Properties ---

  fullCategories = computed(() => {
    const allCategory: Category = {
      category_id: 0,
      category_name: 'Todos',
      product_count: this.categories().reduce(
        (sum, cat) => sum + cat.product_count, 0)
    };
    return [allCategory, ...this.categories()];
  });

  fullBrands = computed(() => {
    // ✨ CORRECCIÓN CLAVE:
    // 1. Usar this.brands() para obtener el valor del signal.
    // 2. Usar Array.isArray() para verificar si es un array válido.
    // 3. Si no es un array, se usa [] (array vacío) para evitar el error de `reduce is not a function`.
    const currentBrands = this.brands();

    const brandsArray: Brand[] = Array.isArray(currentBrands) ? currentBrands : [];

    const totalProducts = brandsArray.reduce(
      (sum, brand) => sum + (brand.products || 0),
      0
    );

    const allBrand: Brand = {
      id: 0,
      name: 'Todas las Marcas',
      slug: 'todas',
      products: totalProducts
    };

    return [allBrand, ...brandsArray];
  })
}
