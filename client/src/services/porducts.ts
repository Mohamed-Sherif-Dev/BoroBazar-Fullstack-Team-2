import { api } from "./axios";

export async function getProducts(params: { q?: string; category?: string }) {
  const res = await api.get("/products/search", { params });

  return res.data;
}
