import express from "express";
import {
  createCategory,
  getAllCategories,
} from "../controllers/category.controller";
import upload from "../middlewares/upload";

const router = express.Router();

router.post("/", upload.single("image"), createCategory);
router.get("/", getAllCategories);

export default router;