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

router.post("/", upload.single("image"), createCategory);
router.get("/", getAllCategories);
router.delete("/:id", deleteCategory);
router.delete("/:id/sub/:subName", deleteSubCategory);
router.patch("/:id/sub", addSubCategories);

export default router;