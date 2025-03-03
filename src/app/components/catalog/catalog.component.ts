import { Component, OnInit } from '@angular/core';
import { NgForOf } from '@angular/common';
import { Section } from 'models/interfaces.model';
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
    RouterLink
  ],
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  sections!: Section[];
  catalogSize: number = 0;

  constructor(private productCatalogService: ProductCatalogService) {  };

  ngOnInit() {
    this.loadProducts().then( () => console.log('Catalago cargado', this.sections));
    this.getCatalogSize()
  }

  async loadProducts() {
    await this.productCatalogService.getAllSections()
      .then( result => {
        this.sections = result
        // console.log("Datos obtenidos en catalogComponent")
      })
      .catch( e => console.error(e))
  }

  async getCatalogSize() {
    this.catalogSize = await this.productCatalogService.catalogSize();
  }

  protected readonly window = window;
}
