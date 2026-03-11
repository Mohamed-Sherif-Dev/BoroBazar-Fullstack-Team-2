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
} from "./admin.controller";

const router = Router();

router.get("/dashboard", getDashboard);

router.get("/products", getAllProducts);
router.post("/products", addProduct);
router.put("/products/:id", editProduct);
router.delete("/products/:id", removeProduct);

router.get("/users", getAllUsers);
router.get("/orders", getAllOrders);
router.get("/sales-data", getSalesData);

export default router;
