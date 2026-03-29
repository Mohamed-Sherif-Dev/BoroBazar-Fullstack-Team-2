import mongoose from "mongoose";
import { DashboardStats, Order, Product, User, ChartItem, PaginatedOrders, PaginatedProducts, PaginatedUsers } from "./admin.types";
import UserModel from "../../models/user.model";
import OrderModel from "../../models/Order.model";
import ProductModel from "../../models/Product.model";
import CategoryModel from "../../models/Category.models";

let products: Product[] = [
  {
    id: 1,
    image: "/images/product-1.png",
    name: "Surf Excel Matic Front Load Liquid Detergent 2 L",
    brand: "Surf Excel",
    category: "Groceries",
    subCategory: "Detergents",
    price: 199,
    oldPrice: 220,
    sales: 5,
    stock: 7480,
    rating: 4,
  },
  {
    id: 2,
    image: "/images/product-2.png",
    name: "Saffola Gold Pro Healthy Lifestyle Rice Bran Based",
    brand: "Saffola",
    category: "Groceries",
    subCategory: "Oil",
    price: 245,
    oldPrice: 220,
    sales: 2,
    stock: 14583,
    rating: 5,
  },
  {
    id: 3,
    image: "/images/product-3.png",
    name: "Good Life Refined Rice Bran Oil 1 L",
    brand: "Good Life",
    category: "Groceries",
    subCategory: "Oil",
    price: 520,
    oldPrice: 300,
    sales: 2,
    stock: 47852,
    rating: 2,
  },
  {
    id: 4,
    image: "/images/product-4.png",
    name: "Lay's American Style Cream & Onion Potato Chips 82g",
    brand: "Lay's",
    category: "Snacks",
    subCategory: "Chips",
    price: 55,
    oldPrice: 45,
    sales: 15,
    stock: 74852,
    rating: 5,
  },
  {
    id: 5,
    image: "/images/product-5.png",
    name: "Gemini Refined Sunflower Oil 1 L",
    brand: "Gemini",
    category: "Groceries",
    subCategory: "Oil",
    price: 199,
    oldPrice: 180,
    sales: 27,
    stock: 4775,
    rating: 5,
  },
];

let salesData: ChartItem[] = [
  { month: "Jan", totalSales: 0, totalUsers: 0 },
  { month: "Feb", totalSales: 60, totalUsers: 0 },
  { month: "Mar", totalSales: 95, totalUsers: 0 },
  { month: "Apr", totalSales: 90, totalUsers: 0 },
  { month: "May", totalSales: 75, totalUsers: 0 },
  { month: "Jun", totalSales: 72, totalUsers: 0 },
  { month: "Jul", totalSales: 58, totalUsers: 0 },
  { month: "Aug", totalSales: 44, totalUsers: 0 },
];

let users: User[] = [
  {
    id: 1,
    image: "/images/user-1.png",
    name: "Digieender DEV 2",
    email: "j*******",
    phone: "********",
    role: "user",
    createdAt: "2025-09-24",
  },
  {
    id: 2,
    image: "/images/user-2.png",
    name: "Sufyan Malik",
    email: "a*******",
    phone: "********",
    role: "admin",
    createdAt: "2025-09-24",
  },
  {
    id: 3,
    image: "/images/user-3.png",
    name: "asdasd",
    email: "s*******",
    phone: "********",
    role: "user",
    createdAt: "2025-09-24",
  },
  {
    id: 4,
    image: "/images/user-4.png",
    name: "Areeba",
    email: "a*******",
    phone: "********",
    role: "user",
    createdAt: "2025-09-24",
  },
  {
    id: 5,
    image: "/images/user-5.png",
    name: "rahul",
    email: "r*******",
    phone: "********",
    role: "user",
    createdAt: "2025-09-24",
  },
  {
    id: 6,
    image: "/images/user-6.png",
    name: "David",
    email: "d*******",
    phone: "********",
    role: "user",
    createdAt: "2025-09-24",
  },
];

let orders: Order[] = [
  { id: 1, userId: 1, total: 1200, status: "paid" },
  { id: 2, userId: 2, total: 800, status: "pending" },
];

export const getDashboardData = async (): Promise<DashboardStats> => {
  const [totalUsers, totalOrders, totalProducts, totalCategories, orderAgg] = await Promise.all([
    UserModel.countDocuments(),
    OrderModel.countDocuments(),
    ProductModel.countDocuments(),
    CategoryModel.countDocuments(),
    OrderModel.aggregate([
      { $match: { status: { $ne: 'Cancelled' } } },
      { $group: { _id: null, totalSales: { $sum: "$totalPrice" } } }
    ])
  ]);

  const totalSales = orderAgg.length > 0 ? orderAgg[0].totalSales : 0;

  return {
    totalSales,
    totalUsers,
    totalOrders,
    totalProducts,
    totalCategories
  };
};

export const createProduct = (data: Omit<Product, "id">): Product => {
  const newProduct: Product = {
    id: products.length ? products[products.length - 1].id + 1 : 1,
    ...data,
  };

  products.push(newProduct);
  return newProduct;
};

export const updateProduct = (
  id: number,
  data: Partial<Omit<Product, "id">>,
): Product | null => {
  const index = products.findIndex((product) => product.id === id);

  if (index === -1) return null;

  products[index] = {
    ...products[index],
    ...data,
  };

  return products[index];
};

export const deleteProduct = (id: number): Product | null => {
  const index = products.findIndex((product) => product.id === id);

  if (index === -1) return null;

  const deleted = products[index];
  products.splice(index, 1);

  return deleted;
};

export const getUsers = async (page: number = 1, limit: number = 10): Promise<PaginatedUsers> => {
  const skip = (page - 1) * limit;

  const [usersDoc, totalDocuments] = await Promise.all([
    UserModel.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    UserModel.countDocuments()
  ]);

  const totalPages = Math.ceil(totalDocuments / limit);

  return {
    users: usersDoc,
    pagination: {
      totalDocuments,
      totalPages,
      currentPage: page,
      limit
    }
  };
};

export const deleteUser = async (id: string): Promise<any | null> => {
  const deleted = await UserModel.findByIdAndDelete(id);
  return deleted;
};

export const getProducts = async (page: number = 1, limit: number = 10, search?: string, category?: string): Promise<PaginatedProducts> => {
  const skip = (page - 1) * limit;
  const filter: any = {};
  
  if (search) {
    filter.name = { $regex: search, $options: 'i' };
  }
  
  if (category) {
    if (mongoose.Types.ObjectId.isValid(category)) {
        filter.category = category;
    } else {
        filter.category = category;
    }
  }

  const [productsDoc, totalDocuments] = await Promise.all([
    ProductModel.find(filter)
      .populate('category', 'name')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    ProductModel.countDocuments(filter)
  ]);

  const totalPages = Math.ceil(totalDocuments / limit);

  return {
    products: productsDoc,
    pagination: {
      totalDocuments,
      totalPages,
      currentPage: page,
      limit
    }
  };
};

export const getSalesData = (): ChartItem[] => {
  return salesData;
};

export const getOrders = async (page: number = 1, limit: number = 10): Promise<PaginatedOrders> => {
  const skip = (page - 1) * limit;

  const [ordersDoc, totalDocuments] = await Promise.all([
    OrderModel.find()
      .populate('userId', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    OrderModel.countDocuments()
  ]);

  const totalPages = Math.ceil(totalDocuments / limit);

  return {
    orders: ordersDoc,
    pagination: {
      totalDocuments,
      totalPages,
      currentPage: page,
      limit
    }
  };
};
