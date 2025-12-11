import {Component, OnInit, inject, signal, ViewChild, OnDestroy} from '@angular/core';
import {CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {debounceTime, distinctUntilChanged, Subject, takeUntil} from 'rxjs';

// Importaciones de Ng Zorro
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSpinComponent } from 'ng-zorro-antd/spin';
import { NzMessageService } from 'ng-zorro-antd/message';

// Modelos y Servicios
import { ProductsService } from '../../core/services/products.service';
import { CartService } from '../../core/services/cart.service';
import { Product } from '../../core/models/product.model';
import {ProductInfo} from '../../core/components/product/product-info';
import {NzImageDirective} from 'ng-zorro-antd/image';


@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzPaginationModule,
    NzInputModule,
    NzIconModule,
    NzButtonModule,
    NzCardModule,
    NzSpinComponent,
    ProductInfo,
    NzImageDirective,
  ],
  templateUrl: './products.html',
  styleUrls: ['./products.scss']
})
export class Products implements OnInit, OnDestroy {
  private productsService = inject(ProductsService);
  private cartService = inject(CartService);
  private message = inject(NzMessageService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  @ViewChild('productInfoModal') productInfoModal!: ProductInfo;

  listOfProducts: Product[] = [];
  displayProducts: Product[] = [];
  isLoading = this.productsService.isLoadingMany;

  private readonly DEBOUNCE_SEARCH_TIME = 1000 ;

  // Estado UI
  searchTerm = signal(''); // Signal que mantiene el valor del input y se sincroniza con la URL
  brandFilter = signal<string | null>(null);
  page = signal(1);
  limit = signal(12);

  // Mecanismo Reactivo
  private searchTerms = new Subject<string>(); // Subject para aplicar debounce

  // Destructor
  private readonly destroy$ = new Subject<void>();

  total = 0;
  private quantities = new Map<number, number>();


  constructor() {
    // 1. CONEXIÓN DE BÚSQUEDA (Manejo de Debounce y Navegación)
    this.searchTerms
      .pipe(
        // Espera de 1 segundo
        debounceTime(this.DEBOUNCE_SEARCH_TIME),
        // No dispara si el término no cambió
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe(term => {
        // Al final del debounce, actualiza los queryParams (y resetea la página)
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: { search: term || null, page: 1 },
          queryParamsHandling: 'merge'
        });
      });
  }


  ngOnInit(): void {
    // 2. CONEXIÓN DE URL (Manejo de Query Params y Carga de Datos)
    this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe(params => {
      const pageParam = params['page'] ? +params['page'] : 1;
      const searchParam = params['search'] || '';
      const categoryIdParam = params['category_id'] !== undefined && params['category_id'] !== null
        ? Number(params['category_id'])
        : null;
      const brandParam = params['brand'] || null;

      // Sincronizar Signals desde la URL (Source of Truth)
      this.page.set(pageParam);
      this.searchTerm.set(searchParam);
      this.brandFilter.set(brandParam);

      // Sincronizar Categoría
      const category = {
        category_id: categoryIdParam !== null ? categoryIdParam : 0,
        category_name: categoryIdParam === 0 ? 'Todos' : '',
        product_count: 0
      };
      this.productsService.selectedCategory.set(category);

      // Cargar productos con los parámetros de la URL
      this.loadProducts(this.page(), this.searchTerm(), category.category_id, this.brandFilter());
    });
  }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // 3. HANDLER DEL INPUT
  // Usaremos el enlace bidireccional [(ngModel)] en el HTML
  // Este método ahora solo se encarga de empujar el valor al Subject.
  onSearchInput(value: string): void {
    this.searchTerms.next(value);
  }

  clearSearch(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { search: null, page: 1 },
      queryParamsHandling: 'merge'
    });
  }

  loadProducts(page?: number, search?: string, categoryId?: number | null, brand?: string | null) {
    this.productsService.getPaginatedProducts(page, this.limit(), search || '', categoryId, brand).subscribe({
      next: (res) => {
        this.listOfProducts = res.products;
        this.total = res.total;
        this.page.set(res.page);
        this.displayProducts = this.listOfProducts;
      },
      error: (err) => {
        console.error('Error loading products', err);
      }
    });
  }

  onPageIndexChange(index: number): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: index },
      queryParamsHandling: 'merge'
    }).then(() => {
      window.scrollTo({ top: 0, behavior: 'instant' });
    });
  }

  openProductInfo(product: Product): void {
    this.productInfoModal.open(product);
  }


  getQuantity(product: any): number {
    return this.quantities.get(product.product_id) || 1;
  }

  increaseQuantity(product: any): void {
    const current = this.getQuantity(product);
    this.quantities.set(product.product_id, current + 1);
  }

  decreaseQuantity(product: any): void {
    const current = this.getQuantity(product);
    if (current > 0) {
      this.quantities.set(product.product_id, current - 1);
    }
  }

  addToCart(product: any): void {
    const qty = this.getQuantity(product);
    if (qty > 0) {
      this.cartService.add(product, qty);

      this.quantities.set(product.product_id, 0);
      this.message.success(`"${product.display_name}" agregado al carrito`);

    }

  }

}
