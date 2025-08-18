interface Product {
  _id: {
    $oid: string;
  };
  product_id: number;
  base_unit_name: string;
  brand: string;
  category_id: number;
  category_name: string;
  display_name: string;
  image_url: string; // <-- Nuevo campo para la imagen
  list_price: number;
  product_type: string;
}
