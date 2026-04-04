import { Router } from "express";
import { getProfile, updateProfile, changePassword } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

/**
 * @route   GET http://localhost:5001/api/users/profile
 * @desc    Get the authenticated user's profile information
 * @access  Private
 * @returns {Object} 200 - Success boolean and the user object (excluding password)
 * @returns {Error}  404 - User not found
 * @returns {Error}  500 - Server error
 */
router.get("/profile", authMiddleware, getProfile);

/**
 * @route   PUT http://localhost:5001/api/users/profile
 * @desc    Update the authenticated user's profile details
 * @access  Private
 * @body    {String} [name] - Updated user name
 * @body    {String} [phone] - Updated phone number
 * @body    {String} [avatar] - Image URL for the user's avatar
 * @returns {Object} 200 - Success message and the updated user object
 * @returns {Error}  404 - User not found
 * @returns {Error}  400 - Validation error
 */
router.put("/profile", authMiddleware, updateProfile);

/**
 * @route   PUT http://localhost:5001/api/users/change-password
 * @desc    Change the password for the authenticated user
 * @access  Private
 * @body    {String} oldPassword - The current password
 * @body    {String} newPassword - The new password to set
 * @returns {Object} 200 - Success message
 * @returns {Error}  400 - Invalid old password
 * @returns {Error}  404 - User not found
 * @returns {Error}  500 - Server error
 */
router.put("/change-password", authMiddleware, changePassword);



export default router;
