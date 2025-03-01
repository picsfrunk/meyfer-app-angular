import {Component, OnInit} from '@angular/core';
import {NgForOf} from '@angular/common';
import {Product, Section} from '../../../models/interfaces.model';
import { MOCK_SECTIONS } from '../../../data/mock.data';
import { SectionComponent } from '../sections/section.component';
import {SheetItem} from '../../../data/sheetItem';
import {sectionsData} from '../../../data/sections.data';
import {ProductCatalogService} from '../../services/product-catalog.service';
import {RouterLink} from '@angular/router';


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
  // sections: Section[] = MOCK_SECTIONS;
  sections!: Section[];

  constructor(private productCatalogService: ProductCatalogService) {  };

  ngOnInit() {
    this.loadProducts().then( () => console.log('Catalago cargado', this.sections));

  }

  async loadProducts() {
    await this.productCatalogService.getAllFromDB()
      .then( result => {
        this.sections = result
        // console.log("Datos obtenidos en catalogComponent")
      })
      .catch( e => console.error(e))
  }
}
