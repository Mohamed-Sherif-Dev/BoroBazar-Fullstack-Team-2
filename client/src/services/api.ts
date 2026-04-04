import { api as axiosApi } from "./axios";

const ADMIN_URL = "/admin";

export const api = {
  getDashboard: async () => {
    const res = await axiosApi.get(`${ADMIN_URL}/dashboard`);
    return res.data;
  },

  getUsers: async (params?: { page?: number; limit?: number }) => {
    const res = await axiosApi.get(`${ADMIN_URL}/users`, { params });
    return res.data;
  },

  getOrders: async (params?: { page?: number; limit?: number }) => {
    const res = await axiosApi.get(`${ADMIN_URL}/orders`, { params });
    return res.data;
  },

  getProducts: async (params?: { page?: number; limit?: number; search?: string; category?: string }) => {
    const res = await axiosApi.get(`${ADMIN_URL}/products`, {
      params: {
        page: params?.page,
        limit: params?.limit,
        search: params?.search,
        category: params?.category,
      }
    });
    return res.data;
  },

  getSalesData: async () => {
    const res = await axiosApi.get(`${ADMIN_URL}/sales-data`);
    return res.data;
  },

  addProduct: async (fd: FormData) => {
    console.log("api.addProduct (axios): Sending FormData...");
    const res = await axiosApi.post(`${ADMIN_URL}/products`, fd);
    return res.data;
  },

  updateProduct: async (id: string, fd: FormData) => {
    console.log(`api.updateProduct (axios): Updating ${id}...`);
    const res = await axiosApi.put(`${ADMIN_URL}/products/${id}`, fd);
    return res.data;
  },

  deleteProduct: async (id: string) => {
    const res = await axiosApi.delete(`${ADMIN_URL}/products/${id}`);
    return res.data;
  },

  deleteUser: async (id: string) => {
    const res = await axiosApi.delete(`${ADMIN_URL}/users/${id}`);
    return res.data;
  },
};
