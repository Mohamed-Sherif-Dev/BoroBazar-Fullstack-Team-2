import { Router } from 'express';
import { addToCart, deleteFromCart, getCart } from '../controllers/cart.controller';

const router = Router();


/**
 * @route   POST http://localhost:5001/api/cart/add
 * @desc    Add a product to the cart or increment quantity if already exists
 * @access  Public (should ideally be Private, but depends on global auth setup)
 * @body    {String} userId - The ID of the user
 * @body    {String} productId - The ID of the product to add
 * @body    {Number} quantity - Quantity to add
 * @body    {Number} price - Price of the product at the time of adding
 * @returns {Object} 200/211 - The updated or newly created cart object
 * @returns {Error}  500 - Server error
 */
router.post('/add', addToCart);

/**
 * @route   GET http://localhost:5001/api/cart/:userId
 * @desc    Get the cart for a specific user
 * @access  Public
 * @params  {String} userId - The ID of the user whose cart to fetch
 * @returns {Object} 200 - The cart object with populated product details
 * @returns {Error}  404 - Cart not found
 * @returns {Error}  500 - Server error
 */
router.get('/:userId', getCart);

/**
 * @route   DELETE http://localhost:5001/api/cart/:userId/:productId
 * @desc    Remove a specific product from a user's cart
 * @access  Public
 * @params  {String} userId - The ID of the user
 * @params  {String} productId - The ID of the product to remove
 * @returns {Object} 200 - Success message and the updated cart object
 * @returns {Error}  404 - Cart or product not found in cart
 * @returns {Error}  500 - Server error
 */
router.delete('/:userId/:productId', deleteFromCart);


export default router;