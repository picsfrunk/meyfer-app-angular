import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Product } from '../core/models/product.model';

import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [
    CommonModule,
    CurrencyPipe,
    NzCardModule,
    NzIconModule,
    NzButtonModule,
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
        <!-- Click en imagen abre el producto, no el preview de ng-zorro -->
        <div class="product-image-container" (click)="onOpenInfo()">
          <img
            [src]="product.image_url || 'assets/no-image.png'"
            [alt]="product.display_name"
            class="product-image"
            loading="lazy"
          />
        </div>
      </ng-template>
    </nz-card>
  `,
  styles: [`
    .product-card {
      border-radius: 12px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 0.5rem;

      .product-title {
        font-size: 1em;
        font-weight: 500;
        text-align: center;
        cursor: pointer;

        span {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      }

      .product-image-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 200px;
        margin-bottom: 0.5rem;
        cursor: pointer;  /* indica que es clickeable */
      }

      .product-image {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
        transition: transform 0.3s ease;
      }

      .product-image-container:hover .product-image {
        transform: scale(1.05);
      }

      .price-container {
        text-align: center;
        margin: 0.5rem 0;

        .price {
          font-size: 1.2rem;
          font-weight: bold;
          color: rgba(138, 15, 15, 0.82);
        }
      }

      .quantity-container {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        margin: 0.75rem 0;

        .quantity {
          font-size: 1.2rem;
          font-weight: 500;
          min-width: 32px;
          text-align: center;
        }
      }

      .add-to-cart-container {
        margin-top: 0.5rem;

        button {
          font-size: 0.95rem;
          font-weight: 500;
        }
      }
    }
  `]
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;
  @Input({ required: true }) quantity: number = 0;

  @Output() openInfo    = new EventEmitter<Product>();
  @Output() increaseQty = new EventEmitter<Product>();
  @Output() decreaseQty = new EventEmitter<Product>();
  @Output() addToCart   = new EventEmitter<Product>();

  onOpenInfo()         { this.openInfo.emit(this.product); }
  onIncreaseQuantity() { this.increaseQty.emit(this.product); }
  onDecreaseQuantity() { this.decreaseQty.emit(this.product); }
  onAddToCart()        { this.addToCart.emit(this.product); }
}
