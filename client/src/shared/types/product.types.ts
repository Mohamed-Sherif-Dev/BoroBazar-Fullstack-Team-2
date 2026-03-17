export interface Product {
  id: string;
  title: string;
  description?: string;
  price: number;
  image: string;
  rating?: number;
  discount?: number;
  isFeatured?: boolean;
  isPopular?: boolean;
}