import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import * as XLSX from 'xlsx';
import { SheetItem } from 'models/sheetItem';
import { ProductCatalogService } from 'app/services/product-catalog.service';

@Component({
  selector: 'app-data-upload',
  imports: [CommonModule],
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
    const workbook = XLSX.read(e.target.result, {type: 'file'});
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];

    this.sheetData = XLSX.utils.sheet_to_json(worksheet, {raw: true, range: 15});
    console.log('Excel data:', this.sheetData);
  }

  async uploadData() {
    await this.productCatalogService.clearSheetData();
    await this.productCatalogService.putSheetItems(this.sheetData)
      .then( () => console.log("Datos de excel guardados exitosamente"))
      .catch( (error) => console.error('Error al guardar los datos del excel:', error));

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
