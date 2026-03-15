"use client";

import { useEffect, useState } from "react";
import type { Product } from "../../../shared/types/product.types";
import { getFeaturedProducts } from "../api/getFeaturedProducts";

export function useFeaturedProducts() {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchFeaturedProducts() {
      try {
        const result = await getFeaturedProducts();
        setData(result);
      } catch (err) {
        setError("Failed to load featured products");
      } finally {
        setLoading(false);
      }
    }

    fetchFeaturedProducts();
  }, []);

  return { data, loading, error };
}