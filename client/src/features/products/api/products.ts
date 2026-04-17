import axios from "axios";
import type { IProduct } from "../../../types/product";

const apiClient = axios.create({
  baseURL: import.meta.env.DEV ? "/api" : `${import.meta.env.VITE_API_BASE_URL}/api`,
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true",
  },
});

export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export const getProducts = async (): Promise<IProduct[]> => {
  const response = await apiClient.get<ApiResponse<IProduct[]>>("/products");
  return response.data.data;
};

export const getProductById = async (id: string): Promise<IProduct> => {
  const response = await apiClient.get<ApiResponse<IProduct>>(`/products/${id}`);
  return response.data.data;
};

