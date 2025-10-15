import { Component, Input, signal } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { Product } from '../../models/product.model';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzColDirective, NzRowDirective } from 'ng-zorro-antd/grid';
import { NzDescriptionsComponent, NzDescriptionsItemComponent } from 'ng-zorro-antd/descriptions';
import { NzDividerComponent } from 'ng-zorro-antd/divider';

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
    NzRowDirective,
    NzColDirective,
    NzDescriptionsComponent,
    NzDescriptionsItemComponent,
    NzDividerComponent,
  ],
  template: `
      <nz-modal
              [(nzVisible)]="isOpen"
              [nzFooter]="footerTpl"
              [nzWidth]="720"
              (nzOnCancel)="close()"
              nzDraggable="true"
      >
          <ng-container *nzModalContent>
              @if (product(); as p) {
                  <nz-row [nzGutter]="[24, 24]" class="items-center">

                      <nz-col [nzSpan]="24" [nzMd]="10">
                          <img
                                  nz-image
                                  [nzSrc]="p.image_url"
                                  [alt]="p.display_name"
                                  class="product-image"
                          />
                      </nz-col>

                      <nz-col [nzSpan]="24" [nzMd]="14">
                          <h2 class="product-title">{{ p.display_name }}</h2>

                          <nz-divider/>

                          <nz-descriptions nzBordered [nzColumn]="1" class="product-info">
                              <nz-descriptions-item nzTitle="Precio">
                                  <strong class="product-price">
                                      {{ p.final_price | currency:'ARS':'symbol' }}
                                  </strong>
                              </nz-descriptions-item>
                              <nz-descriptions-item nzTitle="Categoría">
                                  {{ p.category_name }}
                              </nz-descriptions-item>
                              <nz-descriptions-item nzTitle="Marca">
                                  {{ p.brand }}
                              </nz-descriptions-item>
                            <nz-descriptions-item nzTitle="Código">
                              {{ p.product_id }}
                            </nz-descriptions-item>
                          </nz-descriptions>
                      </nz-col>
                  </nz-row>
              }
          </ng-container>

          <ng-template #footerTpl>
              <div class="footer-actions">

                  <button nz-button (click)="close()">Cerrar</button>
                  <div class="quantity-control">
                      <button nz-button nzShape="circle" (click)="decrementQuantity()" [disabled]="quantity() <= 1">
                          <span nz-icon nzType="minus"></span>
                      </button>
                      <span class="quantity">{{ quantity() }}</span>
                      <button nz-button nzShape="circle" (click)="incrementQuantity()">
                          <span nz-icon nzType="plus"></span>
                      </button>
                  </div>
                  <button nz-button nzType="primary" (click)="addToCart()">
                      <span nz-icon nzType="shopping-cart"></span>
                      Agregar al carrito
                  </button>
              </div>
          </ng-template>
      </nz-modal>
  `,
  styles: [`
    .product-image {
      max-width: 100%;
      max-height: 280px;
      border-radius: 12px;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
      object-fit: contain;
    }

    .product-title {
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }

    .product-price {
      font-size: 1.25rem;
      color: #1890ff;
    }

    .product-info {
      margin-top: 1rem;
    }

    .footer-actions {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      width: 100%;
    }

    .quantity-control {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .quantity {
      min-width: 32px;
      text-align: center;
      font-size: 1rem;
      font-weight: 600;
    }

    .footer-buttons {
      display: flex;
      gap: 0.5rem;
    }
  `]
})
export class ProductInfo {
  readonly isOpen = signal(false);
  readonly product = signal<Product | null>(null);
  readonly quantity = signal(1);

  @Input() onAddToCart: (product: Product, qty: number) => void = () => {};

  open(p: Product): void {
    this.product.set(p);
    this.quantity.set(1);
    this.isOpen.set(true);
  }

  close(): void {
    this.isOpen.set(false);
    this.product.set(null);
  }

  incrementQuantity(): void {
    this.quantity.update(q => q + 1);
  }

  decrementQuantity(): void {
    this.quantity.update(q => Math.max(1, q - 1));
  }

  addToCart(): void {
    const p = this.product();
    if (!p) return;
    this.onAddToCart(p, this.quantity());
  }
}
