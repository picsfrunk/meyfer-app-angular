// src/app/data/mock.data.ts
import { Section } from '../models/interfaces.model';

export const MOCK_SECTIONS: Section[] = [
  {
    id: 1,
    title: 'Abrazaderas',
    image: 'assets/abrazaderas.jpg',
    products: [
      {
        id: 101,
        name: 'Abrazaderas Metálicas',
        image: 'assets/abrazaderas-metalicas.jpg',
        items: [
          { id: 1, code: 'AB001', description: 'Abrazadera 1/2"', price: 500 },
          { id: 2, code: 'AB002', description: 'Abrazadera 3/4"', price: 600 }
        ]
      },
      {
        id: 102,
        name: 'Abrazaderas Plásticas',
        image: 'assets/abrazaderas-plasticas.jpg',
        items: [
          { id: 3, code: 'AB003', description: 'Abrazadera Plástica 1/2"', price: 300 },
          { id: 4, code: 'AB004', description: 'Abrazadera Plástica 3/4"', price: 350 }
        ]
      }
    ]
  },
  {
    id: 2,
    title: 'Sanitarios',
    image: 'assets/sanitarios.jpg',
    products: [
      {
        id: 201,
        name: 'Flexibles',
        image: 'assets/flexibles.jpg',
        items: [
          { id: 5, code: 'FX001', description: 'Flexible 1/2" x 100cm', price: 1500 },
          { id: 6, code: 'FX002', description: 'Flexible 1/2" x 150cm', price: 1800 }
        ]
      },
      {
        id: 202,
        name: 'Grifería',
        image: 'assets/griferia.jpg',
        items: [
          { id: 7, code: 'GR001', description: 'Grifo monocomando cocina', price: 12000 },
          { id: 8, code: 'GR002', description: 'Grifo lavamanos clásico', price: 8000 }
        ]
      }
    ]
  },
  {
    id: 3,
    title: 'Zinguería',
    image: 'assets/zingueria.jpg',
    products: [
      {
        id: 301,
        name: 'Canaletas',
        image: 'assets/canaletas.jpg',
        items: [
          { id: 9, code: 'ZN001', description: 'Canaleta de 2m', price: 2200 },
          { id: 10, code: 'ZN002', description: 'Canaleta de 3m', price: 3300 }
        ]
      }
    ]
  },
  {
    id: 4,
    title: 'Ferretería',
    image: 'assets/ferreteria.jpg',
    products: [
      {
        id: 401,
        name: 'Herramientas Manuales',
        image: 'assets/herramientas.jpg',
        items: [
          { id: 11, code: 'HM001', description: 'Martillo carpintero', price: 3500 },
          { id: 12, code: 'HM002', description: 'Llave francesa 12"', price: 4200 }
        ]
      }
    ]
  },
  {
    id: 5,
    title: 'Electricidad',
    image: 'assets/electricidad.jpg',
    products: [
      {
        id: 501,
        name: 'Cables',
        image: 'assets/cables.jpg',
        items: [
          { id: 13, code: 'EL001', description: 'Cable 2.5mm x 10m', price: 2500 },
          { id: 14, code: 'EL002', description: 'Cable 4mm x 10m', price: 3200 }
        ]
      }
    ]
  },
  {
    id: 6,
    title: 'Rural',
    image: 'assets/rural.jpg',
    products: [
      {
        id: 601,
        name: 'Alambres',
        image: 'assets/alambres.jpg',
        items: [
          { id: 15, code: 'RU001', description: 'Alambre galvanizado 50m', price: 5500 },
          { id: 16, code: 'RU002', description: 'Alambre de púas 100m', price: 8900 }
        ]
      }
    ]
  }
];
