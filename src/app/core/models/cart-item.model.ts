import { Product } from './product.model';

export interface CartItem {
  productCartItem: Product;
  qty: number;
}
