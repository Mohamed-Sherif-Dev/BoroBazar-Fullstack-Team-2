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
  id?: number;
  _id?: any;
  userId: any;
  total?: number;
  totalPrice?: number;
  status: string;
  items?: any[];
  shippingAddress?: string;
  paymentMethod?: string;
  createdAt?: string;
}

export interface PaginatedOrders {
  orders: any[]; // Using any[] to map from DB type easily without strict interface overlap, or any document type.
  pagination: {
    totalDocuments: number;
    totalPages: number;
    currentPage: number;
    limit: number;
  };
}

export interface DashboardStats {
  totalSales: number;
  totalUsers: number;
  totalOrders: number;
  totalProducts: number;
  totalCategories: number;
}

export interface PaginatedProducts {
  products: any[];
  pagination: {
    totalDocuments: number;
    totalPages: number;
    currentPage: number;
    limit: number;
  };
}

export interface PaginatedUsers {
  users: any[];
  pagination: {
    totalDocuments: number;
    totalPages: number;
    currentPage: number;
    limit: number;
  };
}
