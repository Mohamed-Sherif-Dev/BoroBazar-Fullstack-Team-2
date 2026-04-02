import { Router } from 'express';
import { toggleWishlist, getWishlist, removeFromWishlist } from '../controllers/wishlist.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

/**
 * @route   POST http://localhost:5001/api/wishlist/toggle
 * @desc    Add or remove a product from the user's wishlist
 * @access  Private
 * @body    {String} productId - The ID of the product to toggle
 * @returns {Object} 200/211 - Success message and the updated wishlist object
 * @returns {Error}  400 - Invalid User or Product ID
 * @returns {Error}  500 - Server error
 */
router.post('/toggle', authMiddleware, toggleWishlist);

/**
 * @route   GET http://localhost:5001/api/wishlist
 * @desc    Get the authenticated user's wishlist with populated product details
 * @access  Private
 * @returns {Object} 200 - The wishlist object
 * @returns {Error}  404 - Wishlist empty
 * @returns {Error}  500 - Server error
 */
router.get('/', authMiddleware, getWishlist);

/**
 * @route   DELETE http://localhost:5001/api/wishlist/:productId
 * @desc    Remove a specific product from the authenticated user's wishlist
 * @access  Private
 * @params  {String} productId - The ID of the product to remove
 * @returns {Object} 200 - Success message and the updated wishlist object
 * @returns {Error}  404 - Wishlist not found
 * @returns {Error}  500 - Server error
 */
router.delete('/:productId', authMiddleware, removeFromWishlist);



export default router;