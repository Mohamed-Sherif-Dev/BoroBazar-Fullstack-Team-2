import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../services/porducts";

type UseProductsParams = { q?: string; category?: string };

export function useProducts({ q, category }: UseProductsParams) {
  return useQuery({
    queryKey: ["products", q, category],
    queryFn: () => getProducts({ q, category }),
    enabled: false,
  });
}
