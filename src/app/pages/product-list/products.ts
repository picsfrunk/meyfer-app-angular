import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { ProductsService } from '../../core/services/products.service';
import {Product} from '../../core/models/product.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzTableModule,
    NzPaginationModule,
    NzInputModule,
    NzIconModule,
    NzButtonModule,
    NzCardModule,
  ],
  templateUrl: './products.html',
  styleUrl: './products.scss'
})
export class Products implements OnInit {
  private productsService = inject(ProductsService);

  listOfProducts: Product[] = [];
  filteredProducts: Product[] = [];
  displayProducts: Product[] = [];

  searchTerm: string = '';
  pageSize = 20;
  pageIndex = 1;

  total = 0;
  page = 1;
  limit = 20;

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts(page: number = this.page) {
    this.productsService.getPaginatedProducts(page, this.limit).subscribe({
      next: (res) => {
        console.log(res);
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
      this.filteredProducts = this.listOfProducts.filter(product =>
        product.display_name.toLowerCase().includes(this.searchTerm.toLowerCase())
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
    alert(`¡"${product.display_name}" agregado al carrito!`);
  }
}
