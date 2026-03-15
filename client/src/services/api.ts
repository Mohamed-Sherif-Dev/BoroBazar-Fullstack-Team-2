const BASE_URL = "http://localhost:5000/admin";

export const api = {
  getDashboard: async () => {
    const res = await fetch(`${BASE_URL}/dashboard`);
    return res.json();
  },

  getUsers: async () => {
    const res = await fetch(`${BASE_URL}/users`);
    return res.json();
  },

  getOrders: async () => {
    const res = await fetch(`${BASE_URL}/orders`);
    return res.json();
  },

  getProducts: async () => {
    const res = await fetch(`${BASE_URL}/products`);
    return res.json();
  },

  getSalesData: async () => {
    const res = await fetch(`${BASE_URL}/sales-data`);
    return res.json();
  },

  addProduct: async (product: {
    name: string;
    price: number;
    category: string;
    stock: number;
  }) => {
    const res = await fetch(`${BASE_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    return res.json();
  },

  updateProduct: async (
    id: number,
    product: Partial<{
      name: string;
      price: number;
      category: string;
      stock: number;
    }>,
  ) => {
    const res = await fetch(`${BASE_URL}/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    return res.json();
  },

  deleteProduct: async (id: number) => {
    const res = await fetch(`${BASE_URL}/products/${id}`, {
      method: "DELETE",
    });

    return res.json();
  },
};
