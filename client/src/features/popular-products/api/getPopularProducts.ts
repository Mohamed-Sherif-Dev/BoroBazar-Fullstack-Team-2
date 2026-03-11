import { apiClient } from "../../../shared/api/apiClient";
import { endpoints } from "../../../shared/api/endpoints";
import type { Product } from "../../../shared/types/product.types";

export async function getPopularProducts(): Promise<Product[]> {
  try {
    return await apiClient<Product[]>(endpoints.popularProducts);
  } catch (error) {
    console.warn("Failed to fetch popular products, using mock data instead.");
    return [
      {
        id: "101",
        title: "Wireless Noise Cancelling Headphones",
        price: 199.99,
        image: "/images/hero-product.png",
        rating: 4.9
      },
      {
        id: "102",
        title: "Smart Fitness Watch",
        price: 89.99,
        image: "/images/hero-product.png",
        rating: 4.4
      },
      {
        id: "103",
        title: "Mechanical Keyboard",
        price: 129.50,
        image: "/images/hero-product.png",
        rating: 4.8
      },
      {
        id: "104",
        title: "Ergonomic Office Mouse",
        price: 45.00,
        image: "/images/hero-product.png",
        rating: 4.5
      },{
        id: "105",
        title: "Ergonomic Office Mouse",
        price: 45.00,
        image: "/images/hero-product.png",
        rating: 4.5
      },{
        id: "106",
        title: "Ergonomic Office Mouse",
        price: 45.00,
        image: "/images/hero-product.png",
        rating: 4.5
      }
    ];
  }
}