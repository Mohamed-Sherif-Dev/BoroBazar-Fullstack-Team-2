import { Router } from "express";
import {
  addProduct,
  editProduct,
  getAllOrders,
  getAllProducts,
  getAllUsers,
  getDashboard,
  getSalesData,
  removeProduct,
  deleteUser,
} from "../controllers/admin.controller";

import upload from "../middlewares/upload";
import { authMiddleware } from "../middlewares/auth.middleware";
import { adminMiddleware } from "../middlewares/admin.middleware";

const router = Router();

// Apply protection to all routes below
router.use(authMiddleware, adminMiddleware);


/**
 * @route   GET http://localhost:5001/api/admin/dashboard
 * @desc    Get overall dashboard statistics
 * @access  Private (Admin)
 * @returns {Object} 200 - Dashboard summary data
 */
router.get("/dashboard", getDashboard);

/**
 * @route   GET http://localhost:5001/api/admin/products
 * @desc    Get all products (admin view)
 * @access  Private (Admin)
 */
router.get("/products", getAllProducts);

/**
 * @route   POST http://localhost:5001/api/admin/products
 * @desc    Add a new product with image
 * @access  Private (Admin)
 */
router.post("/products", upload.single("image"), addProduct);

/**
 * @route   PUT http://localhost:5001/api/admin/products/:id
 * @desc    Update an existing product with optional image update
 * @access  Private (Admin)
 */
router.put("/products/:id", upload.single("image"), editProduct);

/**
 * @route   DELETE http://localhost:5001/api/admin/products/:id
 * @desc    Permanently remove a product
 * @access  Private (Admin)
 */
router.delete("/products/:id", removeProduct);

/**
 * @route   GET http://localhost:5001/api/admin/users
 * @desc    Get a list of all registered users
 * @access  Private (Admin)
 */
router.get("/users", getAllUsers);

/**
 * @route   DELETE http://localhost:5001/api/admin/users/:id
 * @desc    Delete a user account
 * @access  Private (Admin)
 */
router.delete("/users/:id", deleteUser);

/**
 * @route   GET http://localhost:5001/api/admin/orders
 * @desc    Get all orders across all users
 * @access  Private (Admin)
 */
router.get("/orders", getAllOrders);

/**
 * @route   GET http://localhost:5001/api/admin/sales-data
 * @desc    Get detailed sales analytics
 * @access  Private (Admin)
 */
router.get("/sales-data", getSalesData);

export default router;
