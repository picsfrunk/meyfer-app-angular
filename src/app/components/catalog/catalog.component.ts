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
    this.getCatalogSize();
    this.getProfitData();
  };

  ngOnInit() {
    this.loadProducts()

    //pruebas
    // Esto es para poder bajar el json TODO: hacer boton y funcion para bajarlo en xls
    this.productCatalogService.getAllItems()
      .then((items) => console.log("Items:\n", items) )

  }

  loadProducts() {
    this.productCatalogService.getAllSections()
      .then( result => {
        this.sections = result  })
      .catch( e => console.error(e));
  }


  async fetchAndProcessExcel() {
    await this.productCatalogService.fetchExcel()
      .then( async () => await this.reprocessSpreadsheetData() )
  }

  async reprocessSpreadsheetData() {
    await this.productCatalogService.processSheetData()
      .then( async () => await this.loadProducts() )
  }

  async clearCatalog() {
    await this.productCatalogService.clearCatalog()
      .then( async () => await this.loadProducts() )
  }

  async clearSpreadSheetData() {
    await this.productCatalogService.clearSheetData();
  }

  async getCatalogSize() {
    this.catalogSize = await this.productCatalogService.catalogSize();
  }

  private async getProfitData() {
    await this.productCatalogService.getLastProfitData()
      .then( result => {
        result ? this.profitData = result : console.log("No profito")
      })
  }
}
