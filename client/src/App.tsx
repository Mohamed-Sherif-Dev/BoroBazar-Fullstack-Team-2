import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// ─── Customer Auth ────────────────────────────────────────────────────────────
import LoginPage from "./pages/auth/customer/LoginPage";
import RegisterPage from "./pages/auth/customer/RegisterPage";
import ForgotPasswordPage from "./pages/auth/customer/ForgotPasswordPage";
import VerifyOTPPage from "./pages/auth/customer/VerifyOTPPage";

// ─── Admin Auth ───────────────────────────────────────────────────────────────
import AdminLoginPage from "./pages/auth/admin/LoginPage";
import AdminRegisterPage from "./pages/auth/admin/RegisterPage";
import AdminForgotPasswordPage from "./pages/auth/admin/ForgotPasswordPage";
import AdminVerifyOTPPage from "./pages/auth/admin/VerifyOTPPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1 },
    mutations: { retry: 0 },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* ── Customer routes ── */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/verify" element={<VerifyOTPPage />} />

          {/* ── Admin routes ── */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin/register" element={<AdminRegisterPage />} />
          <Route path="/admin/forgot-password" element={<AdminForgotPasswordPage />} />
          <Route path="/admin/verify" element={<AdminVerifyOTPPage />} />

          {/* ── Default redirect ── */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;