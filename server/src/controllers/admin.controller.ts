import { Request, Response } from "express";
import mongoose from "mongoose";
import * as adminService from "../services/admin.service";
import ProductModel from "../models/Product.model";

export const getDashboard = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = await adminService.getDashboardData();

    res.status(200).json({
      success: true,
      message: "Dashboard data fetched successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching dashboard data",
    });
  }
};

export const addProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      name,
      price,
      category,
      stock,
      brand,
      subCategory,
      oldPrice,
      rating,
      isFeatured,
      isPopular,
    } = req.body;

    if (!name || price === undefined || !category || stock === undefined) {
      res.status(400).json({
        success: false,
        message: "Required fields are missing: name, price, category, stock",
      });
      return;
    }

    const imageUrl = (req.file as any)?.path || req.body.image || "/images/product-1.png";

    const product = await ProductModel.create({
      name,
      price: Number(price),
      category,
      stock: Number(stock),
      image: imageUrl,
      brand: brand || "",
      subCategory: subCategory || "",
      oldPrice: oldPrice ? Number(oldPrice) : undefined,
      rating: rating ? Number(rating) : 4,
      isFeatured: isFeatured === "true" || isFeatured === true,
      isPopular: isPopular === "true" || isPopular === true,
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error: any) {
    if (error.code === 11000) {
      res.status(409).json({
        success: false,
        message: "A product with this name already exists",
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Error creating product",
        error: error.message,
      });
    }
  }
};

export const editProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id as string;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ success: false, message: "Invalid product ID format" });
      return;
    }

    const updateData: any = { ...req.body };

    if (updateData.name !== undefined && typeof updateData.name === 'string' && !updateData.name.trim()) {
      delete updateData.name; 
    }

    if (req.file) {
      updateData.image = (req.file as any).path;
    }

    if (updateData.price !== undefined && updateData.price !== "") updateData.price = Number(updateData.price);
    if (updateData.oldPrice !== undefined && updateData.oldPrice !== "") updateData.oldPrice = Number(updateData.oldPrice);
    if (updateData.stock !== undefined && updateData.stock !== "") updateData.stock = Number(updateData.stock);
    if (updateData.rating !== undefined && updateData.rating !== "") updateData.rating = Number(updateData.rating);
    
    if (updateData.isFeatured !== undefined) {
      updateData.isFeatured = updateData.isFeatured === "true" || updateData.isFeatured === true;
    }
    if (updateData.isPopular !== undefined) {
      updateData.isPopular = updateData.isPopular === "true" || updateData.isPopular === true;
    }

    const updatePayload: any = { $set: updateData };

    if (updateData.oldPrice === "") {
        updatePayload.$unset = { oldPrice: 1 };
        delete updateData.oldPrice; 
    }

    const updated = await ProductModel.findByIdAndUpdate(
      id,
      updatePayload,
      { new: true, runValidators: true }
    );

    if (!updated) {
      res.status(404).json({ success: false, message: "Product not found" });
      return;
    }

    res.status(200).json({ success: true, message: "Product updated successfully", data: updated });
  } catch (error: any) {
    res.status(500).json({ success: false, message: "Error updating product", error: error.message });
  }
};

export const removeProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;

    const deleted = await ProductModel.findByIdAndDelete(id);

    if (!deleted) {
      res.status(404).json({ success: false, message: "Product not found" });
      return;
    }

    res.status(200).json({ success: true, message: "Product deleted successfully", data: deleted });
  } catch (error: any) {
    res.status(500).json({ success: false, message: "Error deleting product", error: error.message });
  }
};

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    
    const data = await adminService.getUsers(page, limit);

    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching users",
    });
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id as string;
    const deleted = await adminService.deleteUser(id);
    
    if (!deleted) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: deleted,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting user",
    });
  }
};

export const getAllOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    
    const data = await adminService.getOrders(page, limit);

    res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching orders",
    });
  }
};

export const getAllProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = req.query.search as string;
    const category = req.query.category as string;
    
    const data = await adminService.getProducts(page, limit, search, category);

    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching products",
    });
  }
};

export const getSalesData = (req: Request, res: Response): void => {
  const salesData = adminService.getSalesData();

  res.status(200).json({
    success: true,
    message: "Sales data fetched successfully",
    data: salesData,
  });
};
