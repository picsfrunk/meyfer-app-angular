import { Component, Input, signal, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { Product } from '../../models/product.model';
import { NzImageModule } from 'ng-zorro-antd/image';

@Component({
  selector: 'app-product-info',
  standalone: true,
  imports: [
    CommonModule,
    NzModalModule,
    NzButtonModule,
    NzIconModule,
    CurrencyPipe,
    NzImageModule,
  ],
  template: `
    <nz-modal
      [(nzVisible)]="isOpen"
      [nzTitle]="product()?.display_name"
      [nzFooter]="footerTpl"
      [nzWidth]="480"
      (nzOnCancel)="close()"
      nzDraggable="true"
    >
      <ng-container *nzModalContent>
        <img
          nz-image
          [nzSrc]="product()!.image_url"
          alt="product()!.display_name"
          class="product-image"
        />
        <div class="product-info-body">
          <p class="product-price">
            {{ product()?.list_price | currency: 'ARS' : 'symbol' }}
          </p>
        </div>
      </ng-container>


      <ng-template #footerTpl>
        <button nz-button (click)="close()">Cerrar</button>
        <button nz-button nzType="primary" (click)="addToCart()">
          <span nz-icon nzType="shopping-cart"></span>
          Agregar al carrito
        </button>
      </ng-template>
    </nz-modal>


  `,
  styles: [`
    .modal-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
      text-align: center;
    }
    .product-image {
      max-width: 100%;
      height: auto;
      border-radius: 8px;
      border: 1px solid #e8e8e8;
      padding: 10px;
      object-fit: contain;
    }
    .product-info-body {
      width: 100%;
    }
    .product-price {
      font-size: 24px;
      font-weight: bold;
      margin: 0;
    }
  `]
})
export class ProductInfo {
  // Estado del modal y del producto
  readonly isOpen = signal(false);
  readonly product = signal<Product | null>(null);

  // Inputs para la comunicación
  @Input() onAddToCart: (product: Product) => void = () => {};

  open(p: Product): void {
    console.log("En PI Child Prod:\n", p);
    this.product.set(p);
    this.isOpen.set(true);
  }

  close(): void {
    this.isOpen.set(false);
    this.product.set(null);
  }

  addToCart(): void {
    const p = this.product();
    if (!p) return;
    this.onAddToCart(p);
  }
}
