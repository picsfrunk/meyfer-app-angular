import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import { Router } from '@angular/router';
import {CommonModule} from '@angular/common';
import { CATALOG_DB } from '../../../data/constants';
import { SheetData } from '../../../data/sheet.data';
import { DexieDbService } from '../../services/dexie-db.service';
import js from '@eslint/js';

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

  constructor(private router: Router, private db: DexieDbService) {}

  onFileChange(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      const workbook = XLSX.read(e.target.result, { type: 'binary' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];

      this.sheetData = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      this.savoOnDB(this.sheetData)
      console.log('Excel data:', this.sheetData);

      // const jsonSheetData = JSON.stringify(this.sheetData);
      // console.log('JSON data:', jsonSheetData);
      // this.saveData(jsonSheetData);

    };

    reader.readAsArrayBuffer(file);
    this.isFileLoaded = true;

  }

  private saveData(jsonSheetData: string) {
    localStorage.removeItem(CATALOG_DB)
    localStorage.setItem(CATALOG_DB, jsonSheetData);


  }

  private savoOnDB(data: SheetData[]) {
    data.forEach((item) => {this.db.addSheetData(item)})
  }

  confirmUpload() {
    this.uploadMessage = 'Datos cargados correctamente. Redirigiendo...';
    setTimeout(() => {
      this.router.navigate(['/catalog']);
    }, 3000);
  }
}
