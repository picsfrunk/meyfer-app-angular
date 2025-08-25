import { Component, OnInit, inject, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSpinComponent } from 'ng-zorro-antd/spin';
import { NzMessageService } from 'ng-zorro-antd/message';

import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { toObservable } from '@angular/core/rxjs-interop';

import { ProductsService } from '../../core/services/products.service';
import { CartService } from '../../core/services/cart.service';
import { Product } from '../../core/models/product.model';

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
  ],
  templateUrl: './products.html',
  styleUrls: ['./products.scss']
})
export class Products implements OnInit {
  private productsService = inject(ProductsService);
  private cartService = inject(CartService);
  private message = inject(NzMessageService);

  listOfProducts: Product[] = [];
  displayProducts: Product[] = [];
  isLoading = this.productsService.isLoading;

  searchTerm = signal<string>('');

  page = 1;
  limit = 12;
  total = 0;

  constructor() {
    effect(() => {
      const selectedCat = this.productsService.selectedCategory();
      if (selectedCat) {
        console.log('Categoría seleccionada desde sidebar:', selectedCat);
        this.page = 1;
        this.loadProducts();
      }
    });

  }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts(page: number = this.page) {
    const categoryId = this.productsService.selectedCategory()?.category_id;
    this.productsService.getPaginatedProducts(page, this.limit, categoryId, this.searchTerm()).subscribe({
      next: (res) => {
        this.listOfProducts = res.products;
        this.total = res.total;
        this.page = res.page;
        this.displayProducts = this.listOfProducts;
      },
      error: (err) => {
        console.error('Error loading products', err);
      }
    });
    console.log('Search term', this.searchTerm());
    console.log('Total Products:', this.total);
  }

  onPageIndexChange(index: number): void {
    this.page = index;
    this.loadProducts(this.page);
  }

  addToCart(product: Product): void {
    this.cartService.add(product);
    this.message.success(`"${product.display_name}" agregado al carrito`);
  }
}
