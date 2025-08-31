import { Component, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartService } from '../../core/services/cart.service';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subscription } from 'rxjs';
import { NzDividerComponent } from 'ng-zorro-antd/divider';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { NzTagComponent } from 'ng-zorro-antd/tag';
import { NzTypographyComponent } from 'ng-zorro-antd/typography';
import {OrderService} from '../../core/services/order.service';

@Component({
  selector: 'app-order-confirm',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzModalModule,
    NzButtonModule,
    NzFormModule,
    NzInputModule,
    NzDividerComponent,
    NzCardComponent,
    NzTagComponent,
    NzTypographyComponent
  ],
  templateUrl: './order-confirm.html',
  styleUrl: './order-confirm.scss'
})
export class OrderConfirm {
  private fb = inject(FormBuilder);
  private cartService = inject(CartService);
  private orderService = inject(OrderService);
  private messageService = inject(NzMessageService);
  private modalService = inject(NzModalService);


  orderForm!: FormGroup;
  isFormLoading = false;

  cartTotal = this.cartService.total;
  cartCount = this.cartService.count;

  constructor() {
    this.initializeForm();
    this.checkCartStatus();
  }


  private initializeForm(): void {
    this.orderForm = this.fb.group({
      cliente: ['', [Validators.required]],
      razonSocial: ['', [Validators.required]],
      cuit: ['', [Validators.required, Validators.pattern(/^\d{2}-\d{8}-\d{1}$/)]],
      telefono1: ['', [Validators.required, Validators.pattern(/^\+?\d{10,}$/)]],
      email: ['', [Validators.required, Validators.email]],
      direccion: this.fb.group({
        calle: ['', [Validators.required]],
        numero: ['', [Validators.required]],
        piso: [''],
        timbre: [''],
        entreCalles: [''],
        localidad: ['', [Validators.required]],
        partido: ['', [Validators.required]]
      }),
      contacto: ['', [Validators.required]],
      horarios: ['', [Validators.required]],
      notas: ['']
    });
  }


  private checkCartStatus(): void {
    if (this.cartCount() === 0) {
      this.messageService.warning('El carrito de compras está vacío. Por favor, agregue productos para continuar.');
    }
  }

  submitForm(): void {
    if (this.orderForm.valid) {
      this.isFormLoading = true;

      const orderData = {
        customerInfo: this.orderForm.value,
        cartItems: this.cartService.items(),
        total: this.cartTotal(),
        totalItems: this.cartCount()
      };

      console.log('Datos del pedido a enviar:', orderData);

      const payload = this.orderService.buildOrderPayload(this.orderForm.value);

      this.isFormLoading = true;

      this.orderService.submitOrder(payload).subscribe({
        next: (res) => {
          this.messageService.success(`Pedido ${res.orderId} recibido.`, { nzDuration: 5000 });
          this.orderService.clearCart();
          this.isFormLoading = false;
          this.modalService.closeAll();
          console.log(res);
        },
        error: (err) => {
          console.error('Error enviando pedido:', err);
          this.messageService.error('Ocurrió un error al enviar el pedido.', err);
          this.isFormLoading = false;
        }
      });
    } else {
      Object.values(this.orderForm.controls).forEach(control => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach(nestedControl => {
            nestedControl.markAsDirty();
            nestedControl.updateValueAndValidity({ onlySelf: true });
          });
        } else {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
      this.messageService.error('Por favor, complete los campos requeridos y corrija los errores.');
    }
  }
}
