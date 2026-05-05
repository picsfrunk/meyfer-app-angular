export interface BrandsApiResponse {
  success: boolean;
  count: number;
  data: Brand[];
}
export interface Brand {
  id: number;
  name: string;
  slug: string;
  products: number;
}
