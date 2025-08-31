import { Component, Input, signal, inject } from '@angular/core';
import {CommonModule, CurrencyPipe, NgOptimizedImage} from '@angular/common';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { Product } from '../../models/product.model';
import { NzImageModule } from 'ng-zorro-antd/image';
import {NzColDirective, NzRowDirective} from 'ng-zorro-antd/grid';
import {NzTypographyComponent} from 'ng-zorro-antd/typography';
import {NzDescriptionsComponent, NzDescriptionsItemComponent} from 'ng-zorro-antd/descriptions';
import {NzDividerComponent} from 'ng-zorro-antd/divider';
import {NzCardComponent} from 'ng-zorro-antd/card';

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
                    <nz-descriptions-item nzTitle="💲 Precio">
                      <strong>{{ p.list_price | currency:'ARS':'symbol' }}</strong>
                    </nz-descriptions-item>
                    <nz-descriptions-item nzTitle="📂 Categoría">
                      {{ p.category_name }}
                    </nz-descriptions-item>
                    <nz-descriptions-item nzTitle="🏷️ Marca">
                      {{ p.brand }}
                    </nz-descriptions-item>
                  </nz-descriptions>
                </nz-col>
              </nz-row>
        }
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
    .product-card {
      border-radius: 16px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    }

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

    .product-info {
      margin-top: 1rem;
    }

  `]
})
export class ProductInfo {
  readonly isOpen = signal(false);
  readonly product = signal<Product | null>(null);

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
