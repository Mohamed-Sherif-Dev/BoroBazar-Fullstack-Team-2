export interface ICategory {
  _id: string;
  name: string;
  image: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IProduct {
  _id: string;
  name: string;
  image: string;
  price: number;
  oldPrice?: number;
  rating: number;
  category: ICategory;
  isFeatured: boolean;
  isPopular: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  // if needed
  brand?: string;
  description?: string;
  images?: string[];
  reviewsCount?: number;
  stock?: number;
}
