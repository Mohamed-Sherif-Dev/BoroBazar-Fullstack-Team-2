import api from "../lib/Api";
import type {
  LoginFormData,
  RegisterFormData,
  ForgotPasswordFormData,
  AuthResponse,
} from "../types/Auth";

export const loginUser = async (
  data: Omit<LoginFormData, "rememberMe">
): Promise<AuthResponse> => {
  const res = await api.post<AuthResponse>("/auth/login", data);
  return res.data;
};

export interface RegisterResponse {
  success: boolean;
  message: string;
  data: {
    name: string;
    email: string;
    _id: string;
  };
}

export const registerUser = async (
  data: Omit<RegisterFormData, "rememberMe" | "confirmPassword">
): Promise<RegisterResponse> => {
  const res = await api.post<RegisterResponse>("/auth/register", data);
  return res.data;
};

export const forgotPassword = async (
  data: ForgotPasswordFormData
): Promise<{ message: string }> => {
  const res = await api.post<{ message: string }>("/auth/forgot-password", data);
  return res.data;
};

export const verifyOTP = async (data: {
  email: string;
  otp: string;
}): Promise<{ message: string }> => {
  const res = await api.post("/auth/verify-otp", data);
  return res.data;
};
