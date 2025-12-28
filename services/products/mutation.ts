import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { createProduct, deleteProduct, updateProduct } from "./api";

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["create-product"],
    mutationFn: createProduct,
    onSuccess: () => {
      toast.success("Product created successfully");
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
    onError: () => {
      toast.error("Failed to create product. Please try again.");
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["update-product"],
    mutationFn: updateProduct,
    onSuccess: () => {
      toast.success("Product updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
    onError: () => {
      toast.error("Failed to update product. Please try again.");
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-product"],
    mutationFn: deleteProduct,
    onSuccess: () => {
      toast.success("Product deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
    onError: () => {
      toast.error("Failed to delete product. Please try again.");
    },
  });
};
