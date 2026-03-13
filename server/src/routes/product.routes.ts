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


router.post("/products", upload.single("image"), createProduct);

router.get("/products", getLatestProducts);

router.get("/products/featured", getFeaturedProducts);

router.get("/products/popular", getPopularProducts);

router.get("/products/category/:categoryId", getProductsByCategory);

router.get("/products/search", searchProducts);

router.get("/products/:id", getProductById);

router.get("/products/related/:id", getRelatedProducts);

export default router;