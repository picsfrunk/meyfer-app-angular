import {Component, OnInit} from '@angular/core';
import {NgForOf} from '@angular/common';
import {Product, Section} from '../../../models/interfaces.model';
import { MOCK_SECTIONS } from '../../../data/mock.data';
import { SectionComponent } from '../sections/section.component';
import {SheetDataItem} from '../../../data/sheetDataItem';
import {sectionsData} from '../../../data/sections.data';
import {ProductCatalogService} from '../../services/product-catalog.service';


@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  standalone: true,
  imports: [
    NgForOf,
    SectionComponent
  ],
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  // sections: Section[] = MOCK_SECTIONS;
  sections!: Section[];
  sheetData!: SheetDataItem[];

  constructor(private productCatalogService: ProductCatalogService,) {};

  ngOnInit() {
    this.sections = sectionsData;
    this.loadData();

  }

  loadData() {
    this.productCatalogService.getAllSheetData()
      .then((sheetData) => {
        this.sheetData = sheetData})
      .catch( e => {
        console.error("Error al cargar datos: ", e);
      })
      .finally( () => {
        console.log("Datos obtenidos desde service: \n", JSON.stringify(this.sheetData))
    });

  }

  organizeBySections(productsSheet: SheetDataItem[]) {
    //TODO: como convertir el objeto a tablas
    // basicamente tiene que convertir y rellenar SheetData a Sections
  }
}
