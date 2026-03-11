import { Request, Response } from "express";
import {
  createCategoryService,
  getAllCategoriesService,
} from "../services/category.service";

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const image = req.file?.path || "";

    const category = await createCategoryService({ name, image });

    res.status(201).json({
      success: true,
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating category",
      error,
    });
  }
};

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await getAllCategoriesService();

    res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching categories",
      error,
    });
  }
};