import { api } from "./axios";

export async function getProducts(params: { q?: string; category?: string }) {
  const res = await api.get("/product/search", { params });

  return res.data;
}
