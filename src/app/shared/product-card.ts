import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Product } from '../core/models/product.model';

// Importaciones de Ng Zorro
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzImageDirective } from 'ng-zorro-antd/image';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [
    CommonModule,
    CurrencyPipe,
    NzCardModule,
    NzIconModule,
    NzButtonModule,
    NzImageDirective
  ],
  template: `
    <nz-card
      class="product-card"
      [nzHoverable]="true"
      [nzCover]="coverTemplate"
    >
      <div class="product-title" (click)="onOpenInfo()">
        <span>{{ product.display_name }}</span>
      </div>

      <div class="price-container">
        <span class="price">
          {{ product.final_price | currency: 'ARS':'symbol' }}
        </span>
      </div>

      <div class="quantity-container">
        <button
          nz-button
          nzShape="circle"
          nzType="default"
          (click)="onDecreaseQuantity()"
          [disabled]="quantity === 0"
        >
          <nz-icon nzType="minus" />
        </button>

        <span class="quantity">{{ quantity }}</span>

        <button
          nz-button
          nzShape="circle"
          nzType="default"
          (click)="onIncreaseQuantity()"
        >
          <nz-icon nzType="plus" />
        </button>
      </div>

      <div class="add-to-cart-container">
        <button
          nz-button
          nzType="primary"
          (click)="onAddToCart()"
          [disabled]="quantity === 0"
          nzBlock
        >
          <nz-icon nzType="shopping-cart" />
          Agregar al carrito
        </button>
      </div>

      <ng-template #coverTemplate>
        <div class="product-image-container">
          <img
            nz-image
            [nzSrc]="product.image_url || 'assets/no-image.png'"
            [alt]="product.display_name"
            class="product-image"
            loading="lazy"
          />
        </div>
      </ng-template>
    </nz-card>
  `,
  styles: [`
    /* Estilos copiados de la tarjeta original (asumiendo que estaban en products.scss o similar) */
    .product-card {
      width: 100%;
      margin-bottom: 20px;
      overflow: hidden; /* Importante para la imagen */
    }

    .product-image-container {
      width: 100%;
      height: 150px; /* Altura fija para la imagen */
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .product-image {
      width: 100%;
      height: 100%;
      object-fit: contain; /* Asegura que la imagen se ajuste sin recortarse */
    }

    /* Estilos del contenido de la tarjeta */
    .product-title {
      font-weight: bold;
      cursor: pointer;
      min-height: 40px;
      display: flex;
      align-items: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: normal;
      margin-bottom: 8px;
    }

    .price-container {
      margin-bottom: 10px;
    }

    .price {
      font-size: 1.2rem;
      color: #fa541c; /* Color de énfasis */
      font-weight: 600;
    }

    .quantity-container {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      margin-bottom: 15px;
    }

    .quantity {
      width: 30px;
      text-align: center;
      font-weight: bold;
    }

    .add-to-cart-container button {
      margin-top: 10px;
    }
  `]
})
export class ProductCardComponent {
  // Entradas (Datos)
  @Input({ required: true }) product!: Product;
  @Input({ required: true }) quantity: number = 0;

  // Salidas (Eventos)
  @Output() openInfo = new EventEmitter<Product>();
  @Output() increaseQty = new EventEmitter<Product>();
  @Output() decreaseQty = new EventEmitter<Product>();
  @Output() addToCart = new EventEmitter<Product>();

  onOpenInfo() {
    this.openInfo.emit(this.product);
  }

  onIncreaseQuantity() {
    this.increaseQty.emit(this.product);
  }

  onDecreaseQuantity() {
    this.decreaseQty.emit(this.product);
  }

  onAddToCart() {
    this.addToCart.emit(this.product);
  }
}
