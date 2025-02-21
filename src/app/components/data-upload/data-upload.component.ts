import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import { Router } from '@angular/router';
import {CommonModule} from '@angular/common';
import { STORE_CATALOG_KEY } from '../../../data/constants';
import { SheetData } from '../../../data/sheet.data';

@Component({
  selector: 'app-data-upload',
  imports: [CommonModule  ],
  standalone: true,
  templateUrl: './data-upload.component.html',
  styleUrls: ['./data-upload.component.scss']
})
export class DataUploadComponent {
  sheetData!: SheetData[];
  isFileLoaded = false;
  uploadMessage = '';

  constructor(private router: Router) {}

  onFileChange(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      const workbook = XLSX.read(e.target.result, { type: 'binary' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];

      this.sheetData = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      const jsonSheetData = JSON.stringify(this.sheetData);

      console.log('Excel data:', this.sheetData);
      console.log('JSON data:', jsonSheetData);

      localStorage.removeItem(STORE_CATALOG_KEY)
      localStorage.setItem(STORE_CATALOG_KEY, jsonSheetData);

    };

    reader.readAsArrayBuffer(file);
    this.isFileLoaded = true;

  }

  confirmUpload() {
    this.uploadMessage = 'Datos cargados correctamente. Redirigiendo...';
    setTimeout(() => {
      this.router.navigate(['/catalog']);
    }, 3000);
  }
}
