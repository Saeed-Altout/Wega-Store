import { useQuery } from "@tanstack/react-query";

import { getProduct, getProducts } from "./api";

export const useGetProductsQuery = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
};

export const useGetProductQuery = (productId: string) => {
  return useQuery({
    queryKey: ["product"],
    queryFn: () => getProduct(productId),
    enabled: !!productId,
  });
};
