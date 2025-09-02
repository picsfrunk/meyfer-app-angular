import {Component, OnInit, inject, signal, effect, ViewChild} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
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
export class Products implements OnInit {
  private productsService = inject(ProductsService);
  private cartService = inject(CartService);
  private message = inject(NzMessageService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  @ViewChild('productInfoModal') productInfoModal!: ProductInfo;

  listOfProducts: Product[] = [];
  displayProducts: Product[] = [];
  isLoading = this.productsService.isLoadingMany;

  searchTerm = signal('');
  page = signal(1);
  limit = signal(16);

  total = 0;

  constructor() {
    this.route.queryParams.subscribe(params => {
      const page = params['page'] ? +params['page'] : 1;
      const categoryId = params['category_id'] ? +params['category_id'] : undefined;
      const search = params['search'] || '';

      this.page.set(page);
      this.searchTerm.set(search);

      this.loadProducts(page, search);
    });

    effect(() => {
      const currentSearchTerm = this.searchTerm();
      if (this.route.snapshot.queryParams['search'] !== currentSearchTerm) {
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: { search: currentSearchTerm || null },
          queryParamsHandling: 'merge'
        });
      }
    });

  }

  ngOnInit() {
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
    });
  }

  addToCart(product: Product): void {
    this.cartService.add(product);
    this.message.success(`"${product.display_name}" agregado al carrito`);
  }

  openProductInfo(product: Product): void {
    this.productInfoModal.open(product);
  }
}
