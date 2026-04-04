import { Router } from 'express';
import { createOrder, getUserOrders } from '../controllers/order.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

/**
 * @route   POST http://localhost:5001/api/orders
 * @desc    Create a new order from the user's current cart
 * @access  Private
 * @body    {String} userId - The ID of the user placing the order
 * @body    {Object} shippingAddress - The shipping address object
 * @body    {String} paymentMethod - The payment method used (e.g., "Cash on Delivery")
 * @returns {Object} 211 - Success message and the created order object
 * @returns {Error}  400 - Cart is empty
 * @returns {Error}  500 - Server error
 */
router.post('/', authMiddleware, createOrder);

/**
 * @route   GET http://localhost:5001/api/orders/:userId
 * @desc    Get all orders for a specific user
 * @access  Private
 * @params  {String} userId - The ID of the user whose orders to fetch
 * @returns {Array}  200 - An array of order objects sorted by creation date (descending)
 * @returns {Error}  500 - Server error
 */
router.get('/:userId', authMiddleware, getUserOrders);



export default router;