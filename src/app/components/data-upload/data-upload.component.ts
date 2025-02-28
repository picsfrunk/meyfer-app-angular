import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import { Router } from '@angular/router';
import {CommonModule} from '@angular/common';
import { SheetItem } from '../../../data/sheetItem';
import {ProductCatalogService} from '../../services/product-catalog.service';

@Component({
  selector: 'app-data-upload',
  imports: [CommonModule  ],
  standalone: true,
  templateUrl: './data-upload.component.html',
  styleUrls: ['./data-upload.component.scss']
})
export class DataUploadComponent {
  sheetData!: SheetItem[];
  isFileLoaded = false;
  uploadMessage = '';

  constructor(private productCatalogService: ProductCatalogService,
              private router: Router,
  ) {
    this.loadSheetData();
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.saveWithXLSX(e);
    };

    reader.readAsArrayBuffer(file);
    this.isFileLoaded = true;

  }

  private saveWithXLSX(e: any) {
    //TODO: buscar alternativa a XLSX issue: #33
    const workbook = XLSX.read(e.target.result, {type: 'file'});
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];

    this.sheetData = XLSX.utils.sheet_to_json(worksheet, {raw: true});
    console.log('Excel data:', this.sheetData);
  }

  async uploadData() {
    try {
      await this.productCatalogService.addSheetData(this.sheetData);
      console.log('Datos guardados exitosamente');
    } catch (error) {
      console.error('Error al guardar los datos:', error);
    }

    await this.productCatalogService.processSheetData();
  }

  confirmUpload() {

    this.uploadData().finally(
      () => {
        this.uploadMessage = 'Datos cargados correctamente. Redirigiendo...';
        setTimeout(() => {
          this.router.navigate(['/catalog']);
        }, 3000);
      }
    )
  }

  private loadSheetData() {
    this.productCatalogService.getAllSheetData().then(
      data => {
        this.sheetData = data
      }
    )
  }
}
