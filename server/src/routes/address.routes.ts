import { Router } from "express";
import { getAddresses, addAddress, updateAddress, deleteAddress } from "../controllers/address.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", authMiddleware, getAddresses);
router.post("/", authMiddleware, addAddress);
router.put("/:id", authMiddleware, updateAddress);
router.delete("/:id", authMiddleware, deleteAddress);

export default router;
