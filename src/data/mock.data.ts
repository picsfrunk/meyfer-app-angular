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
          { id: 2, code: 'AB002', description: 'Abrazadera 3/4"', price: 600 },
          { id: 3, code: 'AB003', description: 'Abrazadera 1"', price: 750 },
          { id: 4, code: 'AB004', description: 'Abrazadera 1 1/4"', price: 850 },
          { id: 5, code: 'AB005', description: 'Abrazadera 1 1/2"', price: 950 }
        ]
      },
      {
        id: 102,
        name: 'Abrazaderas Plásticas',
        image: 'assets/abrazaderas-plasticas.jpg',
        items: [
          { id: 6, code: 'AB006', description: 'Abrazadera Plástica 1/2"', price: 300 },
          { id: 7, code: 'AB007', description: 'Abrazadera Plástica 3/4"', price: 350 },
          { id: 8, code: 'AB008', description: 'Abrazadera Plástica 1"', price: 400 },
          { id: 9, code: 'AB009', description: 'Abrazadera Plástica 1 1/4"', price: 450 },
          { id: 10, code: 'AB010', description: 'Abrazadera Plástica 1 1/2"', price: 500 }
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
          { id: 11, code: 'FX001', description: 'Flexible 1/2" x 100cm', price: 1500 },
          { id: 12, code: 'FX002', description: 'Flexible 1/2" x 150cm', price: 1800 },
          { id: 13, code: 'FX003', description: 'Flexible 3/8" x 100cm', price: 1400 },
          { id: 14, code: 'FX004', description: 'Flexible 3/8" x 150cm', price: 1700 },
          { id: 15, code: 'FX005', description: 'Flexible 1/2" x 200cm', price: 2100 }
        ]
      },
      {
        id: 202,
        name: 'Grifería',
        image: 'assets/griferia.jpg',
        items: [
          { id: 16, code: 'GR001', description: 'Grifo monocomando cocina', price: 12000 },
          { id: 17, code: 'GR002', description: 'Grifo lavamanos clásico', price: 8000 },
          { id: 18, code: 'GR003', description: 'Grifo ducha termostático', price: 15500 },
          { id: 19, code: 'GR004', description: 'Grifo bidet cromado', price: 9500 },
          { id: 20, code: 'GR005', description: 'Grifo lavamanos alto', price: 10500 }
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
          { id: 21, code: 'ZN001', description: 'Canaleta de 2m', price: 2200 },
          { id: 22, code: 'ZN002', description: 'Canaleta de 3m', price: 3300 },
          { id: 23, code: 'ZN003', description: 'Canaleta de 4m', price: 4400 },
          { id: 24, code: 'ZN004', description: 'Canaleta de 5m', price: 5500 },
          { id: 25, code: 'ZN005', description: 'Canaleta con bajada', price: 6500 }
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
          { id: 26, code: 'HM001', description: 'Martillo carpintero', price: 3500 },
          { id: 27, code: 'HM002', description: 'Llave francesa 12"', price: 4200 },
          { id: 28, code: 'HM003', description: 'Destornillador plano', price: 1200 },
          { id: 29, code: 'HM004', description: 'Destornillador Phillips', price: 1300 },
          { id: 30, code: 'HM005', description: 'Alicate de corte', price: 2500 }
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
          { id: 31, code: 'EL001', description: 'Cable 2.5mm x 10m', price: 2500 },
          { id: 32, code: 'EL002', description: 'Cable 4mm x 10m', price: 3200 },
          { id: 33, code: 'EL003', description: 'Cable 6mm x 10m', price: 4000 },
          { id: 34, code: 'EL004', description: 'Cable 10mm x 10m', price: 6000 },
          { id: 35, code: 'EL005', description: 'Cable 16mm x 10m', price: 9000 }
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
          { id: 36, code: 'RU001', description: 'Alambre galvanizado 50m', price: 5500 },
          { id: 37, code: 'RU002', description: 'Alambre de púas 100m', price: 8900 },
          { id: 38, code: 'RU003', description: 'Alambre de acero 30m', price: 7500 },
          { id: 39, code: 'RU004', description: 'Alambre de cobre 25m', price: 10500 },
          { id: 40, code: 'RU005', description: 'Alambre plastificado 50m', price: 6000 }
        ]
      }
    ]
  }
];
