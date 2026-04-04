import { Router } from "express";
import { register, login, forgotPasswordController, verifyOtpController, resetPasswordController } from "../controllers/auth.controller";


const router = Router();

/**
 * @route   POST http://localhost:5001/api/auth/register
 * @desc    Register a new user
 * @access  Public
 * @body    {String} name - User's full name
 * @body    {String} email - User's email address
 * @body    {String} password - User's password
 * @returns {Object} 201 - Success message and user data
 * @returns {Error}  400 - Registration error (e.g., user already exists)
 */
router.post("/register", register);

/**
 * @route   POST http://localhost:5001/api/auth/login
 * @desc    Login a user
 * @access  Public
 * @body    {String} email - User's email address
 * @body    {String} password - User's password
 * @returns {Object} 200 - Success message and auth result (token and user data)
 * @returns {Error}  400 - Login error (e.g., invalid credentials)
 */
router.post("/login", login);

/**
 * @route   POST http://localhost:5001/api/auth/forgot-password
 * @desc    Request a password reset OTP
 * @access  Public
 * @body    {String} email - User's email address
 * @returns {Object} 200 - Success message
 * @returns {Error}  400 - Error message
 */
router.post("/forgot-password", forgotPasswordController);

/**
 * @route   POST http://localhost:5001/api/auth/verify-otp
 * @desc    Verify the password reset OTP
 * @access  Public
 * @body    {String} email - User's email address
 * @body    {String} otp - One-time password sent to email
 * @returns {Object} 200 - Success message
 * @returns {Error}  400 - Error message (e.g., invalid OTP)
 */
router.post("/verify-otp", verifyOtpController);

/**
 * @route   POST http://localhost:5001/api/auth/reset-password
 * @desc    Reset user password using email and new password (after OTP verification)
 * @access  Public
 * @body    {String} email - User's email address
 * @body    {String} newPassword - New password
 * @returns {Object} 200 - Success message
 * @returns {Error}  400 - Error message
 */
router.post("/reset-password", resetPasswordController);


export default router;