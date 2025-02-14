import { Component, Input } from '@angular/core';
import { Product } from '../../../../../models/interfaces.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  imports: [CommonModule],
  standalone: true
})
export class ProductComponent {
  @Input() product!: Product;
}
