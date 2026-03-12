import { Router } from "express";
import { register, login, forgotPasswordController, verifyOtpController, resetPasswordController } from "../controllers/auth.controller";


const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPasswordController);
router.post("/verify-otp", verifyOtpController);
router.post("/reset-password", resetPasswordController);
export default router;