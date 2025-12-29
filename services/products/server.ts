import { db } from "@/lib/db";

export const getProducts = async () => {
  try {
    const products = await db.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return products;
  } catch (error) {
    console.error("[GET_PRODUCTS_SERVER]", error);
    return [];
  }
};

export const getProduct = async (productId: string) => {
  try {
    if (!productId) return null;

    const product = await db.product.findUnique({
      where: {
        id: productId,
      },
    });
    return product;
  } catch (error) {
    console.error("[GET_PRODUCT_SERVER]", error);
    return null;
  }
};
