import { z } from "zod";
import axios from "axios";
import { productSchema } from "@/schemas/product-schema";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getProducts = async () => {
  try {
    const response = await fetch(`${baseUrl}/api/products`, {
      method: "GET",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const getProduct = async (productId: string) => {
  try {
    const response = await fetch(`${baseUrl}/api/products/${productId}`, {
      method: "GET",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const createProduct = async (req: z.infer<typeof productSchema>) => {
  try {
    const response = await axios.post(`/api/products`, req);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateProduct = async (
  req: z.infer<typeof productSchema> & { productId: string }
) => {
  try {
    const { productId, ...rest } = req;
    const response = await axios.patch(`/api/products/${productId}`, rest);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteProduct = async (productId: string) => {
  try {
    const response = await axios.delete(`/api/products/${productId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
