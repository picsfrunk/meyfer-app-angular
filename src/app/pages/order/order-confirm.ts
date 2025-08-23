// src/app/shared/components/order-confirm/order-confirm.component.ts
import { Component, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartService } from '../../core/services/cart.service';
import {NzModalModule, NzModalService} from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subscription } from 'rxjs';
import {NzDividerComponent} from 'ng-zorro-antd/divider';
import {NzCardComponent} from 'ng-zorro-antd/card';
import {NzTagComponent} from 'ng-zorro-antd/tag';
import {NzTypographyComponent} from 'ng-zorro-antd/typography';

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
export class OrderConfirm  {
  // Inyección de dependencias con `inject()`
  private fb = inject(FormBuilder);
  private cartService = inject(CartService);
  private messageService = inject(NzMessageService);
  private modalService = inject(NzModalService);

  orderForm!: FormGroup;
  isFormLoading = false;

  // Usar señales para el estado del carrito
  cartTotal = this.cartService.total;
  cartCount = this.cartService.count;

  private cartTotalSubscription!: Subscription;

  constructor() {
    this.initializeForm();
    // Validar el carrito antes de mostrar el formulario
    this.checkCartStatus();
  }


  private initializeForm(): void {
    this.orderForm = this.fb.group({
      cliente: ['John Doe', [Validators.required]],
      razonSocial: ['ACME Corp.', [Validators.required]],
      cuit: ['20-12345678-9', [Validators.required, Validators.pattern(/^\d{2}-\d{8}-\d{1}$/)]],
      telefono1: ['+1155551234', [Validators.required, Validators.pattern(/^\+?\d{10,}$/)]],
      email: ['john.doe@example.com', [Validators.required, Validators.email]],
      direccion: this.fb.group({
        calle: ['Main Street', [Validators.required]],
        numero: ['123', [Validators.required]],
        piso: ['Floor 4'],
        timbre: ['Apto. 4B'],
        entreCalles: ['Pine & Oak'],
        localidad: ['Springfield', [Validators.required]],
        partido: ['Simpsonsville', [Validators.required]]
      }),
      contacto: ['Jane Smith', [Validators.required]],
      horarios: ['9 AM - 5 PM', [Validators.required]],
      notas: ['Please leave the package at the front door.']
    });
  }


  // private initializeForm(): void {
  //   this.orderForm = this.fb.group({
  //     cliente: [null, [Validators.required]],
  //     razonSocial: [null, [Validators.required]],
  //     cuit: [null, [Validators.required, Validators.pattern(/^\d{2}-\d{8}-\d{1}$/)]],
  //     telefono1: [null, [Validators.required, Validators.pattern(/^\+?\d{10,}$/)]],
  //     email: [null, [Validators.required, Validators.email]],
  //     direccion: this.fb.group({
  //       calle: [null, [Validators.required]],
  //       numero: [null, [Validators.required]],
  //       piso: [null],
  //       timbre: [null],
  //       entreCalles: [null],
  //       localidad: [null, [Validators.required]],
  //       partido: [null, [Validators.required]]
  //     }),
  //     contacto: [null, [Validators.required]],
  //     horarios: [null, [Validators.required]],
  //     notas: [null]
  //   });
  // }

  private checkCartStatus(): void {
    if (this.cartCount() === 0) {
      this.messageService.warning('El carrito de compras está vacío. Por favor, agregue productos para continuar.');
    }
  }

  submitForm(): void {
    if (this.orderForm.valid) {
      this.isFormLoading = true;
      // Lógica para enviar el pedido al backend (simulada)
      setTimeout(() => {
        this.messageService.success('Pedido enviado con éxito!');
        this.cartService.clear();
        this.isFormLoading = false;
        this.modalService.closeAll();
        // Podrías navegar a una página de confirmación
      }, 2000);
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
