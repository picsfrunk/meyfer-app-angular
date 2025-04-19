import { Component, OnInit } from '@angular/core';
import { DatePipe, NgForOf, NgIf } from '@angular/common';
import {Section, SectionsNames} from 'models/interfaces.model';
import { SectionComponent } from '../sections/section.component';
import { RouterLink } from '@angular/router';
import { ProductCatalogService } from '../../services/product-catalog.service';


@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  standalone: true,
  imports: [
    NgForOf,
    SectionComponent,
    RouterLink,
    DatePipe,
    NgIf
  ],
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  protected readonly window = window;
  sections!: Section[];
  catalogSize: number = 0;
  lastUpdate: string | null = null;
  sectionsNames: SectionsNames[] = [];

  constructor(private productCatalogService: ProductCatalogService) {

  };

  ngOnInit() {
    this.loadProducts()
    this.getCatalogSize();
    this.loadLastUpdateDate();


    //pruebas
    // Esto es para poder bajar el json TODO: hacer boton y funcion para bajarlo en xls
    this.productCatalogService.getAllItems()
      .then((items) => console.log("Items:\n", items))

  }

  loadProducts() {
    this.productCatalogService.getParsedProducts().subscribe({
      next: (data) => {
        this.sections = data
        this.mapSectionsNames();

        console.log(this.sections)
      },
      error: (err) => console.error('Error al cargar productos', err)
    });
    // this.productCatalogService.getAllSectionsFromBrowser()
    //   .then( (data) => { this.sections = data })
    //   .catch( (err) => { console.log("Error al recargar productos: ", err); } )
  }

  fetchAndUpdateCatalog() {
    this.productCatalogService.updateCatalog().subscribe({
      next: () => {
        console.log('Catálogo actualizado en backend');
        this.loadProducts(); // vuelve a cargar desde Mongo
      },
      error: (err) => console.error('Error al actualizar catálogo', err)
    });
  }

  fetchAndProcessExcel() {
    this.productCatalogService.fetchParsedProducts().subscribe(() => {
      this.loadProducts();
    });
  }

  clearCatalog() {
    this.productCatalogService.clearCatalog()
    this.loadProducts()
  }

  getCatalogSize() {
    this.productCatalogService.catalogSize()
      .then(catSizeResponse => this.catalogSize = catSizeResponse)
  }

  loadLastUpdateDate() {
    this.productCatalogService.getLastUpdateDate().then(date => {
      this.lastUpdate = date;
    });
  }

  private mapSectionsNames() {
    if (!this.sections) return;
    this.sectionsNames = this.sections.map(s => ({ title: s.title }));  }
}
