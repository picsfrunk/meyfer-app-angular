import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';

interface Product {
  _id: {
    $oid: string;
  };
  product_id: number;
  base_unit_name: string;
  brand: string;
  category_id: number;
  category_name: string;
  display_name: string;
  image_url: string; // <-- Nuevo campo para la imagen
  list_price: number;
  product_type: string;
}

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
  // Datos de ejemplo para el catálogo de productos
  listOfProducts: Product[] = [
    {
      "_id": { "$oid": "6897d2bb1e07665743f84942" },
      "product_id": 1723,
      "base_unit_name": "x25mt",
      "brand": "generico",
      "category_id": 4,
      "category_name": "Electricidad",
      "display_name": "CAÑO CORRUGADO FLEX. IGNIFUGO APROB BCO 1\"",
      "image_url": "https://rhcomercial.com.ar/web/image/product.product/1723/image_1024/%5B1423%5D%20CA%C3%91O%20CORRUGADO%20FLEX.%20IGNIFUGO%20APROB%20BCO%201%22?unique=7ed1c27",
      "list_price": 8474.62,
      "product_type": "consu"
    },
    {
      "_id": { "$oid": "6897d2bb1e07665743f84943" },
      "product_id": 1724,
      "base_unit_name": "und",
      "brand": "sica",
      "category_id": 4,
      "category_name": "Electricidad",
      "display_name": "TAPA SICA C/ TORNILLO MOD. LLAVE LUZ",
      "image_url": "https://rhcomercial.com.ar/web/image/product.product/1724/image_1024/%5B2345%5D%20TAPA%20SICA%20C/%20TORNILLO%20MOD.%20LLAVE%20LUZ?unique=d3f1c22",
      "list_price": 450.50,
      "product_type": "consu"
    },
    // Añade más productos aquí...
  ];

  // Variables para la paginación y el filtro
  searchTerm: string = '';
  filteredProducts: Product[] = [];
  displayProducts: Product[] = [];
  pageSize = 5;
  pageIndex = 1;
  totalItems = 0;

  constructor() {}

  ngOnInit(): void {
    // Inicializa la lista de productos y aplica el filtro inicial
    this.filterProducts();
  }

  // Lógica de filtrado de productos
  filterProducts(): void {
    if (!this.searchTerm) {
      this.filteredProducts = [...this.listOfProducts];
    } else {
      this.filteredProducts = this.listOfProducts.filter(product =>
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
