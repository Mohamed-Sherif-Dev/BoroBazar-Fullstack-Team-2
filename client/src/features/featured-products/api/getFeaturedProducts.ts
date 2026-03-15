import { apiClient } from "../../../shared/api/apiClient";
import { endpoints } from "../../../shared/api/endpoints";
import type { Product } from "../../../shared/types/product.types";

export async function getFeaturedProducts(): Promise<Product[]> {
  try {
    return await apiClient<Product[]>(endpoints.featuredProducts);
  } catch (error) {
    console.warn("Failed to fetch featured products, using mock data instead.");
    return [
      {
        id: "1",
        title: "Organic Fresh Apple",
        price: 4.99,
        image: "/images/hero-product.png",
        rating: 4.5
      },
      {
        id: "2",
        title: "Fresh Organic Banana",
        price: 2.99,
        image: "/images/hero-product.png",
        rating: 4.8
      },
      {
        id: "3",
        title: "Orange Juice",
        price: 5.99,
        image: "/images/hero-product.png",
        rating: 4.2
      },
      {
        id: "4",
        title: "Whole Wheat Bread",
        price: 3.49,
        image: "/images/hero-product.png",
        rating: 4.6
      },
      {
        id: "5",
        title: "Fresh Strawberries",
        price: 4.50,
        image: "/images/hero-product.png",
        rating: 4.7
      },
      {
        id: "6",
        title: "Organic Milk",
        price: 3.99,
        image: "/images/hero-product.png",
        rating: 4.9
      }
    ];
  }
}