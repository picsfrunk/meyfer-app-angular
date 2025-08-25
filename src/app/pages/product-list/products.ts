import {Component, OnInit, inject, signal, effect} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { ProductsService } from '../../core/services/products.service';
import { Product } from '../../core/models/product.model';
import {CartService} from '../../core/services/cart.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {Category} from '../../core/models/category.model';

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
  private message = inject(NzMessageService)

  listOfProducts: Product[] = [];
  filteredProducts: Product[] = [];
  displayProducts: Product[] = [];
  isLoading = this.productsService.isLoading;

  searchTerm: string = '';
  pageIndex = 1;
  pageSize = 12;

  total = 0;
  page = 1;
  limit = 12;

  constructor() {
    effect(() => {
      const selectedCat = this.productsService.selectedCategory()!;
      console.log('Categoría seleccionada desde sidebar:', {
        category_id: selectedCat.category_id,
        category_name: selectedCat.category_name,
        product_count: selectedCat.product_count
      });
      this.loadProducts();
    });
  }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts(page: number = this.page) {
    this.productsService.getPaginatedProducts(page, this.limit).subscribe({
      next: (res) => {
        this.listOfProducts = res.products;
        this.filteredProducts = [...this.listOfProducts];
        this.total = res.total;
        this.page = res.page;
        this.updateDisplayProducts();
      },
      error: (err) => {
        console.error('Error loading products', err);
      }
    });
  }

  filterProducts() {
    this.pageIndex = 1;
    if (!this.searchTerm.trim()) {
      this.filteredProducts = [...this.listOfProducts];
    } else {
      const term = this.searchTerm.toLowerCase();
      this.filteredProducts = this.listOfProducts.filter(product =>
        product.display_name.toLowerCase().includes(term)
      );
    }
    this.updateDisplayProducts();
  }

  updateDisplayProducts(): void {
    const start = (this.pageIndex - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.displayProducts = this.filteredProducts.slice(start, end);
  }

  onPageIndexChange(index: number): void {
    this.pageIndex = index;
    this.updateDisplayProducts();
  }

  addToCart(product: Product): void {
    this.cartService.add(product);
    this.message.success(`"${product.display_name}" agregado al carrito`);
  }
}
