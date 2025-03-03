import { Component } from '@angular/core';
import { RouterLink} from '@angular/router';
import { ProductCatalogService } from 'app/services/product-catalog.service';

@Component({
  selector: 'app-home',
  imports: [
    RouterLink
  ],
  templateUrl: './home.component.html',
  standalone: true,
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private productCatalogService: ProductCatalogService,) {};

  clearCatalog() {
    this.productCatalogService.clearCatalog();
  }
}
