import {Component, inject, OnInit} from '@angular/core';
import { DatePipe, NgForOf, NgIf } from '@angular/common';
import {Section, SectionsNames} from 'models/interfaces.model';
import { SectionComponent } from '../sections/section.component';
import { RouterLink } from '@angular/router';
import { ProductCatalogService } from '../../services/product-catalog.service';
import { ToastrModule, ToastrService} from 'ngx-toastr';


@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  standalone: true,
  imports: [
    NgForOf,
    SectionComponent,
    RouterLink,
    DatePipe,
    NgIf,
    ToastrModule
  ],
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  protected readonly window = window;
  sections!: Section[];
  sectionsNames: SectionsNames[] = [];
  lastUpdate!: string | number | Date;
  isLoading = true;
  hasError = false;

  constructor(
    private productCatalogService: ProductCatalogService,
    private toastr: ToastrService,
  ) { };

  ngOnInit() {
    this.loadProducts()
    this.loadLastUpdateDate();

  }

  loadProducts() {
    this.productCatalogService.getParsedProducts().subscribe({
      next: (data) => {
        this.sections = data
        this.isLoading = false;
        this.hasError = false;
        this.showSuccessToast();
        this.mapSectionsNames();

        console.log(this.sections)
      },
      error: (err) => {
        this.isLoading = false;
        this.hasError = true
        this.toastr.error(
          'No se pudo conectar con el servidor. Intente más tarde.',
          'Error de conexión:\n',
          err
        );
        console.error('Error al cargar productos', err)
      }
    });
  }


  loadLastUpdateDate() {
    this.productCatalogService.getLastUpdate().subscribe({
      next: (data) => { this.lastUpdate = new Date(data.lastUpdate);
      }
    })

  }

  private mapSectionsNames() {
    if (!this.sections) return;
    this.sectionsNames = this.sections.map(s => ({ title: s.title }));
  }

  showSuccessToast() {
    this.toastr.success(
      'El catálogo fue cargado correctamente.',
      'Carga exitosa',
      {
        timeOut: 3000,
        positionClass: 'toast-bottom-center',
        closeButton: true,
        progressBar: true
      }
    );
  }

}
