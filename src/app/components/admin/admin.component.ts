import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductCatalogService } from '../../services/product-catalog.service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  imports: [NgIf, FormsModule, RouterLink]
})
export class AdminComponent implements OnInit {
  profitMargin: number = 0;
  message: string | null = null;

  constructor(private productCatalogService: ProductCatalogService) {}

  ngOnInit() {
    this.fetchCurrentProfit();
  }

  fetchCurrentProfit() {
    this.productCatalogService.getProfitMargin().subscribe({
      next: (data) => {
        this.profitMargin = data.margin;
        this.message = 'Valor actualizado desde backend.';
      },
      error: (err) => {
        console.error('Error al obtener la ganancia', err);
        this.message = 'Error al obtener el valor.';
      }
    });
  }

  updateProfitMargin() {
    this.productCatalogService.setProfitMargin(this.profitMargin).subscribe({
      next: () => {
        this.message = 'Ganancia actualizada con éxito.';
      },
      error: (err) => {
        console.error('Error al actualizar ganancia', err);
        this.message = 'Error al actualizar la ganancia.';
      }
    });
  }

  fetchAndUpdateCatalog() {
    this.productCatalogService.updateCatalog().subscribe({
      next: () => {
        console.log('Catálogo actualizado en backend');
      },
      error: (err) => console.error('Error al actualizar catálogo', err)
    });
  }

}
