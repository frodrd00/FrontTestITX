export interface Product {
  id?: string;
  brand?: string;
  model?: string;
  price?: string;
  imgUrl?: string;
}

export interface CacheProduct {
  data: Product[];
  timestamp: number;
}
