import {Component, OnInit} from '@angular/core';
import {NgForOf} from '@angular/common';
import {Product, Section} from '../../../models/interfaces.model';
import { MOCK_SECTIONS } from '../../../data/mock.data';
import { CATALOG_DB } from '../../../data/constants'
import { SectionComponent } from '../sections/section.component';
import {SheetData} from '../../../data/sheet.data';
import {sectionsData} from '../../../data/sections.data';


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
  // sections: Section[] = MOCK_SECTIONS

  sections: Section[] = JSON.parse(JSON.stringify(sectionsData));

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    const storedData = localStorage.getItem(CATALOG_DB);
    if (storedData) {
      const sheetData: SheetData[] = JSON.parse(storedData);
      console.log(sheetData)

      this.organizeBySections(sheetData);
      console.log("sections: " + JSON.stringify(this.sections));
    }
  }

  organizeBySections(productsSheet: SheetData[]) {
    //TODO: como convertir el objeto a tablas
    // basicamente tiene que convertir y rellenar SheetData a Sections
  }
}
