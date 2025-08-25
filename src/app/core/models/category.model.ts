export interface CategoryResponse {
  totalProducts: number;
  categories: Category[];
}

export interface Category {
  category_id: number;
  category_name: string;
  product_count: number;
}
