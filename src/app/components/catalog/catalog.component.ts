import { Component, OnInit } from '@angular/core';
import { DatePipe, NgForOf, NgIf } from '@angular/common';
import { ProfitData, Section } from 'models/interfaces.model';
import { SectionComponent } from '../sections/section.component';
import { ProductCatalogService } from 'app/services/product-catalog.service';
import { RouterLink } from '@angular/router';


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
  profitData!: ProfitData;

  constructor(private productCatalogService: ProductCatalogService) {

  };

  ngOnInit() {
    this.loadProducts()
    // this.loadProductsFromBackend();
    this.getCatalogSize();
    this.getProfitData();


    //pruebas
    // Esto es para poder bajar el json TODO: hacer boton y funcion para bajarlo en xls
    // this.productCatalogService.getAllItems()
    //   .then((items) => console.log("Items:\n", items) )

  }

  loadProducts() {
    this.productCatalogService.getAllSections()
      .then( sectionsFromDB => {
        this.sections = sectionsFromDB
      })
      .catch( e => console.error(e));
  }


  async fetchAndProcessExcel() {
    await this.productCatalogService.getAndSaveParsedProducts().then(
      () => this.loadProducts()
    )

  }

   clearCatalog() {
     this.productCatalogService.clearCatalog()
      .then( () => this.loadProducts() )
  }

   getCatalogSize() {
    this.productCatalogService.catalogSize()
      .then( catSizeResponse => this.catalogSize = catSizeResponse )
  }

  private getProfitData() {
     this.productCatalogService.getLastProfitData()
      .then( result => {
        result ? this.profitData = result : console.log("No profito")
      })
  }

  private loadProductsFromBackend() {
    this.productCatalogService.getAllParsedProducts().subscribe({
      next: (data) => {
        this.sections = data
        console.log('Secciones cargadas del backend', this.sections);
      },
      error: (err) => {
        console.error('Error al cargar secciones', err);
      }
    })
  }
}
