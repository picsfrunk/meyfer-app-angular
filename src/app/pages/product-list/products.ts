import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { Observable } from 'rxjs';
import {ProductService} from '../../core/services/product.service';

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
    NzCardModule
  ],
  templateUrl: './products.html',
  styleUrl: './products.scss'
})
export class Products implements OnInit {
  private productService = inject(ProductService);
  listOfProducts!: Product[];

  // Variables para la paginación y el filtro
  searchTerm: string = '';
  filteredProducts: Product[] = [];
  displayProducts: Product[] = [];
  pageSize = 5;
  pageIndex = 1;
  totalItems = 0;

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(products => {
      this.listOfProducts = products;
      this.filterProducts(); // aplicás tu lógica inicial
    });
    // this.filterProducts();
  }

  // Lógica de filtrado de productos
  filterProducts(): void {
    if (!this.searchTerm) {
      this.filteredProducts = [...this.listOfProducts];
    } else {
      this.filteredProducts = this.listOfProducts.filter((product: { display_name: string; }) =>
        product.display_name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    this.totalItems = this.filteredProducts.length;
    this.updateDisplayProducts();
  }

  // Lógica de paginación
  updateDisplayProducts(): void {
    const start = (this.pageIndex - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.displayProducts = this.filteredProducts.slice(start, end);
  }

  onPageIndexChange(index: number): void {
    this.pageIndex = index;
    this.updateDisplayProducts();
  }

  // Acción al hacer clic en "Agregar al carrito"
  addToCart(product: Product): void {
    console.log(`Producto agregado al carrito: ${product.display_name}`);
    // Aquí se implementaría la lógica para agregar el producto al carrito de compras
    alert(`¡"${product.display_name}" agregado al carrito!`);
  }
}
