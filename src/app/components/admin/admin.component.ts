import { Component, OnInit } from '@angular/core';
import {NgClass, NgIf} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductCatalogService } from '../../services/product-catalog.service';
import {Router, RouterLink} from '@angular/router';
import {ToastrModule, ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-admin',
  standalone: true,
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  imports: [NgIf, FormsModule, RouterLink, NgClass, ToastrModule]
})
export class AdminComponent implements OnInit {
  profitMargin: number = 0;
  serverConnected = false

  constructor(
    private productCatalogService: ProductCatalogService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.fetchCurrentProfit();
  }

  fetchCurrentProfit() {
    this.productCatalogService.getProfitMargin().subscribe({
      next: (data) => {
        this.profitMargin = data.margin;
        this.serverConnected = true;
      },
      error: (err) => {
        console.error('Error al obtener la ganancia', err);
        this.showToast('Error al obtener el valor.', true);
        this.serverConnected = false
      }
    });
  }

  updateProfitMargin() {
    this.productCatalogService.setProfitMargin(this.profitMargin).subscribe({
      next: () => {
        this.showToast('Valor actualizado en servidor.');
      },
      error: (err) => {
        console.error('Error al actualizar ganancia', err);
        this.showToast('Error al actualizar la ganancia.', true);
      }
    });
  }

  fetchAndUpdateCatalog() {
    this.productCatalogService.updateCatalog().subscribe({
      next: () => {
        this.showToast('Catálogo actualizado correctamente');
        this.serverConnected = true;
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 3000);
      },
      error: (err) => {
        this.serverConnected = false;
        this.showToast('Error al actualizar catálogo.', true);
        console.error('Error al actualizar catálogo', err)
      }

    });
  }

  showToast(message: string, isError: boolean = false, title: string = '') {
    if (isError) {
      this.toastr.error(message, title || 'Error');
    } else {
      this.toastr.success(message, title || 'Éxito');
    }
  }

}
