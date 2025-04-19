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
    this.loadLastUpdateDate();

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
  }


  loadLastUpdateDate() {
    //TODO: Issue #43

  }

  private mapSectionsNames() {
    if (!this.sections) return;
    this.sectionsNames = this.sections.map(s => ({ title: s.title }));  }
}
