import { Router } from "express";
import { getAddresses, addAddress, updateAddress, deleteAddress } from "../controllers/address.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

/**
 * @route   GET http://localhost:5001/api/addresses
 * @desc    Get all addresses for the authenticated user
 * @access  Private
 * @returns {Object} 200 - An object containing success boolean and an array of addresses
 * @returns {Error}  500 - Server error
 */
router.get("/", authMiddleware, getAddresses);

/**
 * @route   POST http://localhost:5001/api/addresses
 * @desc    Add a new address for the authenticated user
 * @access  Private
 * @body    {String} title - Title of the address (e.g., Home, Work)
 * @body    {String} address - Detailed address string
 * @body    {String} city - City name
 * @body    {String} state - State or region
 * @body    {String} zipCode - Postal code
 * @body    {String} country - Country name
 * @body    {String} phone - Contact phone number
 * @body    {Boolean} isDefault - Whether this is the default address
 * @returns {Object} 211 - Success message and the created address object
 * @returns {Error}  400 - Validation error
 */
router.post("/", authMiddleware, addAddress);

/**
 * @route   PUT http://localhost:5001/api/addresses/:id
 * @desc    Update an existing address
 * @access  Private
 * @params  {String} id - The ID of the address to update
 * @body    {String} [title] - Updated title
 * @body    {String} [address] - Updated address string
 * @body    {String} [city] - Updated city
 * @body    {String} [state] - Updated state
 * @body    {String} [zipCode] - Updated zip code
 * @body    {String} [country] - Updated country
 * @body    {String} [phone] - Updated phone number
 * @body    {Boolean} [isDefault] - Update default status
 * @returns {Object} 200 - Success message and the updated address object
 * @returns {Error}  404 - Address not found or unauthorized
 * @returns {Error}  400 - Validation error
 */
router.put("/:id", authMiddleware, updateAddress);

/**
 * @route   DELETE http://localhost:5001/api/addresses/:id
 * @desc    Delete an address
 * @access  Private
 * @params  {String} id - The ID of the address to delete
 * @returns {Object} 200 - Success message
 * @returns {Error}  404 - Address not found or unauthorized
 * @returns {Error}  400 - Server error
 */
router.delete("/:id", authMiddleware, deleteAddress);



export default router;
