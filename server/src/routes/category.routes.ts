import express from "express";
import {
  createCategory,
  getAllCategories,
  deleteCategory,
  deleteSubCategory,
  addSubCategories,
} from "../controllers/category.controller";
import upload from "../middlewares/upload";

const router = express.Router();

/**
 * @route   POST http://localhost:5001/api/categories
 * @desc    Create a new category with optional image and subcategories
 * @access  Private (Admin)
 * @body    {String} name - Name of the category
 * @body    {Array|String} [subCategories] - List of subcategory names (as array or JSON string)
 * @file    {Image} [image] - Category thumbnail image
 * @returns {Object} 211 - Success message and the created category object
 * @returns {Error}  500 - Server error
 */
router.post("/", upload.single("image"), createCategory);

/**
 * @route   GET http://localhost:5001/api/categories
 * @desc    Get all categories with their subcategories
 * @access  Public
 * @returns {Object} 200 - An object containing success boolean and an array of categories
 * @returns {Error}  500 - Server error
 */
router.get("/", getAllCategories);

/**
 * @route   DELETE http://localhost:5001/api/categories/:id
 * @desc    Delete a category by ID (only if it has no subcategories)
 * @access  Private (Admin)
 * @params  {String} id - The ID of the category to delete
 * @returns {Object} 200 - Success message
 * @returns {Error}  400 - Cannot delete category with subcategories
 * @returns {Error}  404 - Category not found
 * @returns {Error}  500 - Server error
 */
router.delete("/:id", deleteCategory);

/**
 * @route   DELETE http://localhost:5001/api/categories/:id/sub/:subName
 * @desc    Remove a specific subcategory from a category
 * @access  Private (Admin)
 * @params  {String} id - The ID of the parent category
 * @params  {String} subName - The name of the subcategory to remove
 * @returns {Object} 200 - Success message and updated category object
 * @returns {Error}  404 - Category not found
 * @returns {Error}  500 - Server error
 */
router.delete("/:id/sub/:subName", deleteSubCategory);

/**
 * @route   PATCH http://localhost:5001/api/categories/:id/sub
 * @desc    Add multiple subcategories to an existing category
 * @access  Private (Admin)
 * @params  {String} id - The ID of the parent category
 * @body    {Array} subCategories - Array of subcategory names to add
 * @returns {Object} 200 - Success message and updated category object
 * @returns {Error}  400 - subCategories must be an array
 * @returns {Error}  404 - Category not found
 * @returns {Error}  500 - Server error
 */
router.patch("/:id/sub", addSubCategories);



export default router;