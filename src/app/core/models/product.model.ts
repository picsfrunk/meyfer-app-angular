export interface Product {
  _id: {
    $oid: string;
  };
  product_id: number;
  base_unit_name: string;
  brand: string;
  category_id: number;
  category_name: string;
  display_name: string;
  image_url: string;
  final_price: number;
  product_type: string;
}


export interface PaginatedProducts {
  products: Product[];
  total: number;
  page: number;
  limit: number;
}
