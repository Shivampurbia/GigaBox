// src/api/types/product.types.ts
export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  thumbnail: string;
  images: string[];
  category: string;
  stock: number;
}

export interface CatalogPage {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}
