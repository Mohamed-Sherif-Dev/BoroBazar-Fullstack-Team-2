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
} from "./admin.controller";
import upload from "../../middlewares/upload";

const router = Router();

router.get("/dashboard", getDashboard);

router.get("/products", getAllProducts);
router.post("/products", upload.single("image"), addProduct);
router.put("/products/:id", upload.single("image"), editProduct);
router.delete("/products/:id", removeProduct);

router.get("/users", getAllUsers);
router.delete("/users/:id", deleteUser);
router.get("/orders", getAllOrders);
router.get("/sales-data", getSalesData);

export default router;
