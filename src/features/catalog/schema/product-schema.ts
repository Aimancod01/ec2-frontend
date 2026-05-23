import { z } from "zod";

export const productSchema = z.object({
  name: z.string().trim().min(1, "Product name is required"),
  price: z.number().positive("Price must be greater than 0"),
  categoryId: z.string().min(1, "Category is required"),
});

export type ProductFormValues = z.infer<typeof productSchema>;
