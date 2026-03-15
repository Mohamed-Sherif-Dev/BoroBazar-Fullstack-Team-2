export interface Product {
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
}

export interface ChartItem {
  month: string;
  totalSales: number;
  totalUsers: number;
}

export interface User {
  id: number;
  image: string;
  name: string;
  email: string;
  role: string;
  phone: string;
  createdAt: string;
}

export interface Order {
  id: number;
  userId: number;
  total: number;
  status: string;
}

export interface DashboardStats {
  totalSales: number;
  totalUsers: number;
  totalOrders: number;
  totalProducts: number;
}
