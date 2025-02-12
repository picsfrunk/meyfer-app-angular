import { Component } from '@angular/core';
import {NgForOf, NgOptimizedImage} from '@angular/common';


@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  standalone: true,
  imports: [
    NgForOf,
    NgOptimizedImage
  ],
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent {
  productos: Producto[] = [
    { codigo: 592, descripcion: 'ABRAZADERA T/U 1/2"', precio: 317.6 },
    { codigo: 556, descripcion: 'ABRAZADERA T/U 3/4"', precio: 317.6 },
    { codigo: 593, descripcion: 'ABRAZADERA T/U 1 1/4"', precio: 363.8 },
    { codigo: 594, descripcion: 'ABRAZADERA T/U 1 1/2"', precio: 366.3 },
    { codigo: 595, descripcion: 'ABRAZADERA T/U 2"', precio: 442.5 },
    { codigo: 596, descripcion: 'ABRAZADERA T/U 2 1/2"', precio: 475.0 },
    { codigo: 597, descripcion: 'ABRAZADERA T/U 3"', precio: 533.3 },
    { codigo: 598, descripcion: 'ABRAZADERA T/U 4"', precio: 614.8 },
    { codigo: 983, descripcion: 'ABRAZADERA T/U 6"', precio: 876.0 }
  ];
}


interface Producto {
  codigo: number;
  descripcion: string;
  precio: number;
}
