import { Routes, Route, Navigate } from "react-router-dom";

// ─── Store Pages ─────────────────────────────────────────
import Home from "../pages/Home";
import CartPage from "../pages/CartPage";
import WishlistPage from "../pages/WishlistPage";

import ProductsPage from "@/features/products/pages/ProductsPage";
import ProductDetails from "@/features/products/pages/ProductDetailsPage";
import OrdersPage from "@/features/orders/pages/OrdersPage";
import OrderDetailsPage from "@/features/orders/pages/OrderDetailsPage";

// ─── Customer Auth ───────────────────────────────────────
import LoginPage from "../pages/auth/customer/LoginPage";
import RegisterPage from "../pages/auth/customer/RegisterPage";
import ForgotPasswordPage from "../pages/auth/customer/ForgotPasswordPage";
import VerifyOTPPage from "../pages/auth/customer/VerifyOTPPage";

// ─── Admin Auth ──────────────────────────────────────────
import AdminLoginPage from "../pages/auth/admin/LoginPage";
import AdminRegisterPage from "../pages/auth/admin/RegisterPage";
import AdminForgotPasswordPage from "../pages/auth/admin/ForgotPasswordPage";
import AdminVerifyOTPPage from "../pages/auth/admin/VerifyOTPPage";
import AdminDashboardPage from "../pages/AdminDashboardPage";

const AppRouter = () => {
  return (
    <Routes>

      {/* ─── Store Routes ─── */}
      <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
      <Route path="/home" element={<Home />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/wishlist" element={<WishlistPage />} />
      <Route path="/orders" element={<OrdersPage />} />
      <Route path="/orders/:id" element={<OrderDetailsPage />} />

      {/* ─── Customer Auth Routes ─── */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/verify" element={<VerifyOTPPage />} />

      {/* ─── Admin Auth Routes ─── */}
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route path="/admin/register" element={<AdminRegisterPage />} />
      <Route path="/admin/forgot-password" element={<AdminForgotPasswordPage />} />
      <Route path="/admin/verify" element={<AdminVerifyOTPPage />} />
      
      {/* ─── Admin Dashboard ─── */}
      <Route path="/admin/dashboard" element={<AdminDashboardPage />} />

      {/* ─── Fallback ─── */}
      <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />

    </Routes>
  );
};

export default AppRouter;