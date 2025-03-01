import { Injectable } from '@angular/core';
import { BARCODE_PAD, BARCODE_PREFIX } from '../../data/constants';

@Injectable({
  providedIn: 'root',
})
export class BarcodeService {

  generateEAN13(code: string): string {
    let baseCode = BARCODE_PREFIX + code.padEnd(9, BARCODE_PAD); // Prefijo + Código expandido
    let checksum = this.calculateEANChecksum(baseCode);
    return baseCode + checksum;
  }


  private calculateEANChecksum(code: string): number {
    let sum = code.split('').reduce((acc, num, idx) =>
      acc + parseInt(num) * (idx % 2 === 0 ? 1 : 3), 0);
    return (10 - (sum % 10)) % 10;
  }
}
