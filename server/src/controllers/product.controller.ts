import { Request, Response } from "express";
import {
  getLatestProductsService,
  getFeaturedProductsService,
  getPopularProductsService,
  getProductsByCategoryService,
  getProductByIdService,
  getRelatedProductsService,
  searchProductsService
} from "../services/product.service";
import Product from "../models/Product.model";



export const createProduct = async (req: Request, res: Response) => {
  try {


    const image = req.file?.path;

    const product = await Product.create({
      name: req.body.name,
      image: image,
      price: req.body.price,
      oldPrice: req.body.oldPrice,
      rating: req.body.rating,
      category: req.body.category,
      isFeatured: req.body.isFeatured,
      isPopular: req.body.isPopular
    });
    res.status(201).json({
      success: true,
      data: product
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error creating product"
    });

  }
};

export const getLatestProducts = async (req: Request, res: Response) => {

  try {
    const products = await getLatestProductsService();
    res.status(200).json({
      success: true,
      data: products
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Error fetching latest products"
    });

  }

};

export const getFeaturedProducts = async (req: Request, res: Response) => {

  try {

    const products = await getFeaturedProductsService();

    res.status(200).json({
      success: true,
      data: products
    });

  } catch (error) {

    res.status(500).json({
      message: "Error fetching featured products"
    });

  }

};

export const getPopularProducts = async (req: Request, res: Response) => {

  try {

    const products = await getPopularProductsService();

    res.status(200).json({
      success: true,
      data: products
    });

  } catch (error) {

    res.status(500).json({
      message: "Error fetching popular products"
    });

  }

};

export const getProductsByCategory = async (req: Request, res: Response) => {

  try {

    const { categoryId } = req.params as { categoryId: string };

    const products = await getProductsByCategoryService(categoryId);

    res.status(200).json({
      success: true,
      data: products
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Error fetching category products"
    });

  }

};

export const getProductById = async (req: Request, res: Response) => {

  try {

    const { id } = req.params as { id: string };

    const product = await getProductByIdService(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    res.status(200).json({
      success: true,
      data: product
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Error fetching product"
    });

  }

};


export const getRelatedProducts = async (req: Request, res: Response) => {

  try {

    const { id } = req.params as { id: string };

    const products = await getRelatedProductsService(id);

    res.status(200).json({
      success: true,
      data: products
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Error fetching related products"
    });

  }

};


export const searchProducts = async (req: Request, res: Response) => {

  try {

    const {
      q,
      category,
      subCategory,
      minPrice,
      maxPrice,
      minRating,
      sort,
      page,
      limit
    } = req.query;

    const options = {
      q: q as string,
      category: category as string,
      subCategory: subCategory as string,
      minPrice: minPrice ? parseFloat(minPrice as string) : undefined,
      maxPrice: maxPrice ? parseFloat(maxPrice as string) : undefined,
      minRating: minRating ? parseFloat(minRating as string) : undefined,
      sort: sort as string,
      page: page ? parseInt(page as string) : undefined,
      limit: limit ? parseInt(limit as string) : undefined
    };

    const result = await searchProductsService(options);

    res.status(200).json({
      success: true,
      ...result
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Error searching products"
    });

  }

};