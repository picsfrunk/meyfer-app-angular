export interface Section {
  id?: number;
  title: string;
  image: string;
  products: Product[];
}

export interface Product {
  id?: number;
  name: string;
  image: string;
  items: Item[];
}

export interface Item {
  id?: number;
  parentId?: number;
  code: string;
  description: string;
  price: number;
}
