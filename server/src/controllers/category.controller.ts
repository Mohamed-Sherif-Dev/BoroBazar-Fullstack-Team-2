import { Request, Response } from "express";
import {
  createCategoryService,
  getAllCategoriesService,
  deleteCategoryById,
  removeSubCategoryByName,
  addSubCategoriesService,
} from "../services/category.service";
import Category from "../models/Category.models";

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name, subCategories } = req.body;
    const image = req.file?.path || "https://picsum.photos/200";

    let parsedSubCats = [];
    if (subCategories) {
      try {
        parsedSubCats =
          typeof subCategories === "string"
            ? JSON.parse(subCategories)
            : subCategories;
      } catch (e) {
        parsedSubCats = subCategories.split(",").map((s: string) => s.trim());
      }
    }

    const category = await createCategoryService({
      name,
      image,
      subCategories: parsedSubCats,
    });

    res.status(201).json({
      success: true,
      data: category,
    });
  } catch (error) {
    console.error("Backend Error Creating Category:", error);
    res.status(500).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Error creating category",
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

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    const category = await Category.findById(id);

    if (!category) {
      res.status(404).json({
        success: false,
        message: "Category not found",
      });
      return;
    }

    if (category.subCategories && category.subCategories.length > 0) {
      res.status(400).json({
        success: false,
        message: "Cannot delete category with subcategories. Delete subcategories first.",
      });
      return;
    }

    await deleteCategoryById(id);

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting category",
      error,
    });
  }
};

export const deleteSubCategory = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const subName = req.params.subName as string;

    const updatedCategory = await removeSubCategoryByName(id, subName);

    if (!updatedCategory) {
      res.status(404).json({
        success: false,
        message: "Category not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Subcategory removed successfully",
      data: updatedCategory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error removing subcategory",
      error,
    });
  }
};

export const addSubCategories = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const { subCategories } = req.body;

    if (!Array.isArray(subCategories)) {
      res.status(400).json({
        success: false,
        message: "subCategories must be an array",
      });
      return;
    }

    const updatedCategory = await addSubCategoriesService(id, subCategories);

    if (!updatedCategory) {
      res.status(404).json({
        success: false,
        message: "Category not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Subcategories added successfully",
      data: updatedCategory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding subcategories",
      error,
    });
  }
};