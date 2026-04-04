export type StatCardItem = {
  id: number;
  title: string;
  value: string | number;
};

export type ProductItem = {
  id: number;
  image: string;
  name: string;
  brand?: string;
  category: string;
  subCategory: string;
  price: number;
  oldPrice?: number;
  sales: number;
  stock: number;
  rating: number; 
};

export type UserItem = {
  id: number;
  image: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
};

export type ChartItem = {
  month: string;
  totalSales: number;
  totalUsers: number;
};