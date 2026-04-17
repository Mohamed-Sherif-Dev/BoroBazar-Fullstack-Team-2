import express from "express";

import {
    getLatestProducts,
    getFeaturedProducts,
    getPopularProducts,
    getProductsByCategory,
    getProductById,
    createProduct,
    getRelatedProducts,
    searchProducts
} from "../controllers/product.controller";
import upload from "../middlewares/upload";

const router = express.Router();


/**
 * @route   POST http://localhost:5001/api/products
 * @desc    Create a new product with image and details
 * @access  Private (Admin)
 * @file    {Image} image - Product image file
 * @body    {String} name - Product name
 * @body    {Number} price - Product current price
 * @body    {Number} [oldPrice] - Product previous price (for discounts)
 * @body    {Number} [rating] - Product rating (0-5)
 * @body    {String} category - ID of the category
 * @body    {Boolean} [isFeatured] - Whether the product is featured
 * @body    {Boolean} [isPopular] - Whether the product is popular
 * @returns {Object} 211 - Success message and the created product object
 * @returns {Error}  500 - Server error
 */
router.post("/", upload.single("image"), createProduct);


/**
 * @route   GET http://localhost:5001/api/products
 * @desc    Get the latest products (usually sorted by creation date)
 * @access  Public
 * @returns {Object} 200 - Success boolean and an array of products
 * @returns {Error}  500 - Server error
 */
router.get("/", getLatestProducts);


/**
 * @route   GET http://localhost:5001/api/products/featured
 * @desc    Get featured products
 * @access  Public
 * @returns {Object} 200 - Success boolean and an array of featured products
 * @returns {Error}  500 - Server error
 */
router.get("/featured", getFeaturedProducts);


/**
 * @route   GET http://localhost:5001/api/products/popular
 * @desc    Get popular products based on rating or sales
 * @access  Public
 * @returns {Object} 200 - Success boolean and an array of popular products
 * @returns {Error}  500 - Server error
 */
router.get("/popular", getPopularProducts);


/**
 * @route   GET http://localhost:5001/api/products/category/:categoryId
 * @desc    Get all products belonging to a specific category
 * @access  Public
 * @params  {String} categoryId - The ID of the category
 * @returns {Object} 200 - Success boolean and an array of products
 * @returns {Error}  500 - Server error
 */
router.get("/category/:categoryId", getProductsByCategory);


/**
 * @route   GET http://localhost:5001/api/products/search
 * @desc    Advanced search and filtering for products
 * @access  Public
 * @query   {String} [q] - Search keyword for product name
 * @query   {String} [category] - Filter by category ID
 * @query   {String} [subCategory] - Filter by subcategory name
 * @query   {Number} [minPrice] - Minimum price filter
 * @query   {Number} [maxPrice] - Maximum price filter
 * @query   {Number} [minRating] - Minimum rating filter
 * @query   {String} [sort] - Sort order (e.g., "newest", "price_asc", "price_desc", "rating")
 * @query   {Number} [page] - Page number for pagination
 * @query   {Number} [limit] - Number of items per page
 * @returns {Object} 200 - Success boolean, array of products, and pagination info
 * @returns {Error}  500 - Server error
 */
router.get("/search", searchProducts);


/**
 * @route   GET http://localhost:5001/api/products/related/:id
 * @desc    Get products related to a specific product (same category)
 * @access  Public
 * @params  {String} id - The ID of the reference product
 * @returns {Object} 200 - Success boolean and an array of related products
 * @returns {Error}  500 - Server error
 */
router.get("/related/:id", getRelatedProducts);


/**
 * @route   GET http://localhost:5001/api/products/:id
 * @desc    Get details of a single product by ID
 * @access  Public
 * @params  {String} id - The ID of the product
 * @returns {Object} 200 - Success boolean and the product object
 * @returns {Error}  404 - Product not found
 * @returns {Error}  500 - Server error
 */
router.get("/:id", getProductById);




export default router;