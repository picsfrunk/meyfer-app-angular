import {Component, OnInit} from '@angular/core';
import {NgForOf} from '@angular/common';
import { Section } from '../../../models/interfaces.model';
import { MOCK_SECTIONS } from '../../../data/mock.data';
import { SectionComponent } from '../sections/section.component';


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

  sections: any[] = [];

  ngOnInit() {
    const storedData = localStorage.getItem('catalogData');
    if (storedData) {
      const products = JSON.parse(storedData);
      this.organizeBySections(products);
    }
    console.log(storedData)
  }

  organizeBySections(products: any[]) {
    const sectionsMap = new Map();

    products.forEach(product => {
      const sectionName = product['Sección']; // Suponiendo que la columna del Excel se llama "Sección"
      if (!sectionsMap.has(sectionName)) {
        sectionsMap.set(sectionName, []);
      }
      sectionsMap.get(sectionName).push(product);
    });

    this.sections = Array.from(sectionsMap, ([name, products]) => ({ name, products }));
  }
}
