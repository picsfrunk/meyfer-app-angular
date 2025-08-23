export interface CategoryResponse {
  totalProducts: number;
  categories: Category[];
}

export interface Category {
  category_name: string;
  product_count: number;
}
