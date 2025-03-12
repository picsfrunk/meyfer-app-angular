import {AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
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
export class CatalogComponent implements OnInit, AfterViewInit {
  sections!: Section[];
  catalogSize: number = 0;

  constructor(private productCatalogService: ProductCatalogService) {  };

  ngOnInit() {
    this.loadProducts()
      .then( () => console.log(`Catalago cargado con ${this.sections.length} secciones:`,this.sections));

    //pruebas
    // Esto es para poder bajar el json TODO: hacer boton y funcion para bajarlo en xls
    this.productCatalogService.getAllItems()
      .then((items) => console.log("Items:\n", items) )

    //esto es para probar de reprocesar data de excel ya guardada
    this.productCatalogService.getSpreadSheetData()

    this.getCatalogSize()
  }

  async loadProducts() {
    console.log("Cargando productos...")
    await this.productCatalogService.getAllSections()
      .then( result => {
        this.sections = result
        console.log("Productos obtenidos en CatalogComponent")
      })
      .catch( e => console.error(e));
  }

  async reprocessSpreadsheetData() {
    await this.productCatalogService.processSheetData();
    await this.loadProducts();
  }

  async clearCatalog() {
    await this.productCatalogService.clearCatalog();
    await this.loadProducts();
  }

  async clearSpreadSheetData() {
    await this.productCatalogService.clearSheetData();
  }

  async getCatalogSize() {
    this.catalogSize = await this.productCatalogService.catalogSize();
  }

  @ViewChildren('sectionRefs') sectionElements!: QueryList<ElementRef>;
  private sectionMap: Map<number, HTMLElement> = new Map();

  ngAfterViewInit() {
    console.log("sectionElements: ",this.sectionElements)
    // Llenar el mapa con referencias a las secciones
    this.sectionElements.forEach((el) => {
      console.log("En forEach Elemento: ", el)
      const id = Number(el.nativeElement.id.replace('section-', ''));
      this.sectionMap.set(id, el.nativeElement);
    });
    console.log("sectionMap: ",this.sectionMap)

  }

  scrollToSection(id: string) {
    console.log(`📌 Intentando hacer scroll a la sección ID: ${id}`);

    setTimeout(() => {  // Espera un ciclo de renderización
      const section = document.getElementById(id);

      if (section) {
        const topOffset = section.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: topOffset - 20, // Ajusta según necesites margen
          behavior: 'smooth'
        });
      } else {
        console.warn(`⚠️ No se encontró la sección con ID: ${id}`);
      }
    }, 100);
  }

  protected readonly window = window;
  protected readonly Number = Number;
}
