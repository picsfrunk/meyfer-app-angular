import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import { Router } from '@angular/router';
import {Item, Product, Section} from '../../../models/interfaces.model';
import {CommonModule} from '@angular/common';
import {sectionsData} from '../../../data/sections.data';

@Component({
  selector: 'app-data-upload',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './data-upload.component.html',
  styleUrls: ['./data-upload.component.scss']
})
export class DataUploadComponent {
  isFileLoaded = false;
  uploadMessage = '';
  sections: Section[] = JSON.parse(JSON.stringify(sectionsData)); // Clonamos para evitar mutaciones accidentales

  constructor(private router: Router) {}

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        console.log("Headers detectados:", worksheet.headers);

        this.processData(jsonData);
      };
      reader.readAsArrayBuffer(file);
    }
  }

  processData(data: any[]) {
    if (data.length < 2) return;

    const headers = data[0];
    const rows = data.slice(1);
    const items: Item[] = [];

    rows.forEach((row, index) => {
      const code = row[headers.indexOf('CODIGO')];
      const description = row[headers.indexOf('DESCRIPCIÓN')];
      const rubro = row[headers.indexOf('RUBRO')];
      const priceStr = row[headers.indexOf('PRECIO')];

      const price = this.parsePrice(priceStr);

      if (code && description && rubro && !isNaN(price)) {
        items.push({ id: index + 1, code: String(code), description: String(description), price });
      }
    });

    this.sections = this.groupBySection(items, rows);
    this.isFileLoaded = true;
  }

  parsePrice(priceStr: any): number {
    if (typeof priceStr === 'string') {
      return parseFloat(priceStr.replace(/[^0-9,.-]/g, '').replace(',', '.'));
    }
    return typeof priceStr === 'number' ? priceStr : 0;
  }

  mapSection(rubro: string): string {
    const rubroMap: { [key: string]: string } = {
      'S': 'Sanitarios',
      'Z': 'Zingueria',
      'F': 'Ferreteria',
      'E': 'Electricidad',
      'R': 'Rural',
      'A': 'Abrazaderas'
    };
    return rubroMap[rubro.toUpperCase()] || 'Otros';
  }

  groupBySection(items: Item[], rows: any[]): Section[] {
    const groupedSections: { [key: string]: Product[] } = {};

    rows.forEach((row, index) => {
      const rubro = row[2]; // Índice de la columna "RUBRO"
      const sectionTitle = this.mapSection(rubro);
      const section = this.sections.find(s => s.title === sectionTitle);

      if (section) {
        if (!groupedSections[sectionTitle]) {
          groupedSections[sectionTitle] = [];
        }

        const code = row[0];
        const description = row[1];

        let product = groupedSections[sectionTitle].find(p => p.name === description);
        if (!product) {
          product = { id: index + 1, name: description, image: '', items: [] };
          groupedSections[sectionTitle].push(product);
        }

        product.items.push({ id: index + 1, code: String(code), description: description, price: this.parsePrice(row[3]) });
      }
    });

    return this.sections.map(section => ({
      ...section,
      products: groupedSections[section.title] || []
    }));
  }

  confirmUpload() {
    this.uploadMessage = 'Datos cargados correctamente. Redirigiendo...';
    setTimeout(() => {
      this.router.navigate(['/catalog']);
    }, 3000);
  }
}
