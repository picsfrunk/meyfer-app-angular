import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import * as XLSX from 'xlsx';
import { SheetItem } from 'models/sheetItem';
import {FormsModule} from '@angular/forms';
import {DEFAULT_PROFIT} from '../../../data/constants';
import {ProductCatalogService} from '../../services/product-catalog.service';

@Component({
  selector: 'app-data-upload',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './data-upload.component.html',
  styleUrls: ['./data-upload.component.scss']
})
export class DataUploadComponent implements OnInit {
  sheetData!: SheetItem[];
  isFileLoaded = false;
  uploadMessage = '';
  profitInput: number = DEFAULT_PROFIT;

  constructor(private productCatalogService: ProductCatalogService,
              private router: Router){};

  ngOnInit() {
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
    await this.productCatalogService.putSheetItems(this.sheetData);
    await this.productCatalogService.processSheetData();
  }

  confirmUpload() {
    console.log('Confirmado. Excel data:', this.sheetData);
    this.uploadData()
      .finally(() => { setTimeout(() => {
          this.router.navigate(['/'])
            .then(r => { this.uploadMessage = 'Datos cargados correctamente. Redirigiendo...';
          })
            .catch( e  => console.error(e));
        }, 3000)
      })
      .catch( e => console.error(e));
  }

  private loadSheetData() {
    this.productCatalogService.getAllSheetData().then(
      data => {
        this.sheetData = data
      }
    )
  }

}
