import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-data-upload',
  imports: [CommonModule],
  templateUrl: './data-upload.component.html',
  standalone: true,
  styleUrl: './data-upload.component.scss'
})
export class DataUploadComponent {
  data: any[] = [];
  fileName: string | null = null;
  fileSize: number | null = null;

  onFileChange(event: any) {
    const target: DataTransfer = <DataTransfer>event.target;
    if (target.files.length !== 1) return;

    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const binaryString: string = e.target.result;
      const workbook = XLSX.read(binaryString, { type: 'binary' });

      const sheetName: string = workbook.SheetNames[0]; // Tomar la primera hoja
      const worksheet = workbook.Sheets[sheetName];

      this.data = XLSX.utils.sheet_to_json(worksheet); // Convierte a JSON
      console.log(this.data); // Aquí puedes ver los datos en consola

      localStorage.setItem('products', JSON.stringify(this.data)); // Guardar en localStorage
    };

    reader.readAsArrayBuffer(target.files[0]);
  }


  clearFile() {
    this.fileName = null;
    this.fileSize = null;
  }

  confirmUpload() {
    if (this.fileName) {
      alert(`Archivo ${this.fileName} confirmado para carga.`);
    }
  }

}
