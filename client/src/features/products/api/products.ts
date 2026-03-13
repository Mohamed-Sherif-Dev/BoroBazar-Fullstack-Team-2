import axios from "axios";
import type { IProduct } from "../../../types/product";

const apiClient = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
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

