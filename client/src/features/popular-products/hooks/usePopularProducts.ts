"use client";

import { useEffect, useState } from "react";
import type { Product } from "../../../shared/types/product.types";
import { getPopularProducts } from "../api/getPopularProducts";

export function usePopularProducts() {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPopularProducts() {
      try {
        const result = await getPopularProducts();
        setData(result);
      } catch (err) {
        setError("Failed to load popular products");
      } finally {
        setLoading(false);
      }
    }

    fetchPopularProducts();
  }, []);

  return { data, loading, error };
}