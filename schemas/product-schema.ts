import { z } from "zod";

export const productSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(2),
  price: z.string().min(1),
  imageUrl: z.url(),
  category: z.string().min(1),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
});
