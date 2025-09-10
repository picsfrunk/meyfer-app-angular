import {Component, OnInit, inject, signal, effect, ViewChild, OnDestroy} from '@angular/core';
import {CommonModule, NgOptimizedImage, ViewportScroller} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSpinComponent } from 'ng-zorro-antd/spin';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ProductsService } from '../../core/services/products.service';
import { CartService } from '../../core/services/cart.service';
import { Product } from '../../core/models/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import {ProductInfo} from '../../core/components/product/product-info';
import {NzImageDirective} from 'ng-zorro-antd/image';
import {debounceTime, distinctUntilChanged, Subject, takeUntil} from 'rxjs';

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

  private readonly DEBOUNCE_SEARCH_TIME = 777 ;
  searchTerm = signal('');
  private searchTerms = new Subject<string>();
  private readonly destroy$ = new Subject<void>();
  page = signal(1);
  limit = signal(12);

  total = 0;
  private quantities = new Map<number, number>();


  ngOnInit(): void {
    this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe(params => {
      this.page.set(params['page'] ? +params['page'] : 1);
      this.searchTerm.set(params['search'] || '');

      this.loadProducts(this.page(), this.searchTerm());
    });

    this.searchTerms.pipe(
      debounceTime(this.DEBOUNCE_SEARCH_TIME),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(term => {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { search: term || null, page: 1 },
        queryParamsHandling: 'merge'
      });
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSearchInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchTerms.next(value);
  }

  loadProducts(page?: number, search?: string) {

    this.productsService.getPaginatedProducts(page, this.limit(), search).subscribe({
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
      window.scrollTo({ top: 0, behavior: 'smooth' });
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

  searchProducts(): void {
    // desarrollar delay y manejo de busquedas a la api

    this.loadProducts()

  }
}
