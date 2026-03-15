import { Request, Response } from "express";
import * as adminService from "./admin.service";

export const getDashboard = (req: Request, res: Response): void => {
  const data = adminService.getDashboardData();

  res.status(200).json({
    success: true,
    message: "Dashboard data fetched successfully",
    data,
  });
};

export const addProduct = (req: Request, res: Response): void => {
  const {
    name,
    price,
    category,
    stock,
    image,
    brand,
    subCategory,
    oldPrice,
    sales,
    rating,
  } = req.body;

  if (!name || price === undefined || !category || stock === undefined) {
    res.status(400).json({
      success: false,
      message: "Required fields are missing",
    });
    return;
  }

  const product = adminService.createProduct({
    name,
    price: Number(price),
    category,
    stock: Number(stock),
    image: image || "/images/product-1.png",
    brand: brand || "",
    subCategory: subCategory || "",
    oldPrice: oldPrice ? Number(oldPrice) : undefined,
    sales: sales ? Number(sales) : 0,
    rating: rating ? Number(rating) : 5,
  });

  res.status(201).json({
    success: true,
    message: "Product created successfully",
    data: product,
  });
};

export const editProduct = (req: Request, res: Response): void => {
  const id = Number(req.params.id);

  const updated = adminService.updateProduct(id, req.body);

  if (!updated) {
    res.status(404).json({
      success: false,
      message: "Product not found",
    });
    return;
  }

  res.status(200).json({
    success: true,
    message: "Product updated successfully",
    data: updated,
  });
};

export const removeProduct = (req: Request, res: Response): void => {
  const id = Number(req.params.id);

  const deleted = adminService.deleteProduct(id);

  if (!deleted) {
    res.status(404).json({
      success: false,
      message: "Product not found",
    });
    return;
  }

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
    data: deleted,
  });
};

export const getAllUsers = (req: Request, res: Response): void => {
  const users = adminService.getUsers();

  res.status(200).json({
    success: true,
    message: "Users fetched successfully",
    data: users,
  });
};

export const getAllOrders = (req: Request, res: Response): void => {
  const orders = adminService.getOrders();

  res.status(200).json({
    success: true,
    message: "Orders fetched successfully",
    data: orders,
  });
};

export const getAllProducts = (req: Request, res: Response): void => {
  const products = adminService.getProducts();

  res.status(200).json({
    success: true,
    message: "Products fetched successfully",
    data: products,
  });
};

export const getSalesData = (req: Request, res: Response): void => {
  const salesData = adminService.getSalesData();

  res.status(200).json({
    success: true,
    message: "Sales data fetched successfully",
    data: salesData,
  });
};
