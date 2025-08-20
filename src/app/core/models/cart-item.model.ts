import { Product } from './product.model';

export interface CartItem {
  item: Product;
  qty: number;
}
