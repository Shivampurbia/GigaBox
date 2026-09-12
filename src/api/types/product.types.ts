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
  availabilityStatus?: string;
  tags?: string[];
  reviews?: ProductReview[];
}

export interface ProductReview {
  comment: string;
  date: string;
  rating: number;
  reviewerEmail: string;
  reviewerName: string;
}

export interface CatalogPage {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}
