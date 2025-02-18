import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import { Router } from '@angular/router';
import {Item, Product, Section} from '../../../models/interfaces.model';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-data-upload',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './data-upload.component.html',
  styleUrls: ['./data-upload.component.scss']
})
export class DataUploadComponent {
  sections: Section[] = [];
  isFileLoaded = false;
  uploadMessage = '';

  constructor(private router: Router) {}

  onFileChange(event: any): void {
    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();
    reader.readAsBinaryString(file);

    reader.onload = (e: any) => {
      const binaryData = e.target.result;
      const workbook = XLSX.read(binaryData, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      const data: any[] = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      if (data.length < 2) {
        this.uploadMessage = 'El archivo no tiene datos válidos.';
        return;
      }

      this.processData(data);
      this.isFileLoaded = true;
    };
  }

  processData(data: any[]): void {
    const headers = data[0].map((h: any) => h.toString().trim().toUpperCase());
    const items: Item[] = [];

    localStorage.clear()

    for (let i = 1; i < data.length; i++) {
      const row = data[i];

      const item: Item = {
        id: Number(row[headers.indexOf('CODIGO')]) || 0,
        code: String(row[headers.indexOf('CODIGO')] || '').trim(), // Asegura que sea string
        description: String(row[headers.indexOf('DESCRIPCIÓN')] || '').trim(), // Asegura que sea string
        price: this.parsePrice(row[headers.indexOf('PRECIO')]) // Convierte precio correctamente
      };

      if (item.id) {
        items.push(item);
      }
    }

    this.sections = this.groupBySection(items);
    localStorage.setItem('catalogData', JSON.stringify(this.sections));
  }

  parsePrice(priceStr: any): number {
    if (typeof priceStr === 'number') {
      return priceStr; // Si ya es un número, no hay que convertir nada.
    }
    if (typeof priceStr !== 'string') {
      return 0; // Manejo de error si no es ni string ni número.
    }

    return Number(priceStr.replace(/[$,]/g, '').trim()) || 0;
  }

  mapSection(rubro: string): string {
    const rubroMap: { [key: string]: string } = {
      'S': 'Sanitarios'
      // Se pueden agregar más rubros aquí si es necesario
    };
    return rubroMap[rubro.toUpperCase()] || 'Otros';
  }

  groupBySection(items: Item[]): Section[] {
    const groupedSections: { [key: string]: Product[] } = {};

    items.forEach(item => {
      const sectionTitle = this.mapSection(item.code[0]); // Suponiendo que el código comienza con la letra del rubro
      if (!groupedSections[sectionTitle]) {
        groupedSections[sectionTitle] = [];
      }

      const existingProduct = groupedSections[sectionTitle].find(p => p.name === item.description);
      if (existingProduct) {
        existingProduct.items.push(item);
      } else {
        groupedSections[sectionTitle].push({
          id: item.id,
          name: item.description,
          image: '', // Puedes asignar una imagen predeterminada aquí
          items: [item]
        });
      }
    });

    return Object.keys(groupedSections).map((sectionTitle, index) => ({
      id: index + 1,
      title: sectionTitle,
      image: '', // Imagen general de la sección (puedes cambiar esto según la lógica de negocio)
      products: groupedSections[sectionTitle]
    }));
  }

  confirmUpload(): void {
    this.uploadMessage = 'Archivo cargado exitosamente. Redirigiendo...';

    setTimeout(() => {
      this.router.navigate(['/catalog']);
    }, 3000);
  }
}
