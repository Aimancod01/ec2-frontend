import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { catalogApi } from "../api/catalog-api";
import { CATALOG_QUERY_KEYS } from "../config/tanstack-keys";
import type { ProductInput } from "../types/api-types";

const catalogQueryOptions = {
  staleTime: 30_000,
  refetchOnMount: true,
} as const;

export const useProductsQuery = () =>
  useQuery({
    queryKey: CATALOG_QUERY_KEYS.products,
    queryFn: catalogApi.getProducts,
    ...catalogQueryOptions,
  });

export const useProductMutations = () => {
  const queryClient = useQueryClient();

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: CATALOG_QUERY_KEYS.products });

  const createProduct = useMutation({
    mutationFn: (data: ProductInput) => catalogApi.createProduct(data),
    onSuccess: () => {
      toast.success("Product created");
      void invalidate();
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const updateProduct = useMutation({
    mutationFn: ({ id, data }: { id: string; data: ProductInput }) =>
      catalogApi.updateProduct(id, data),
    onSuccess: () => {
      toast.success("Product updated");
      void invalidate();
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const deleteProduct = useMutation({
    mutationFn: (id: string) => catalogApi.deleteProduct(id),
    onSuccess: () => {
      toast.success("Product deleted");
      void invalidate();
    },
    onError: (error: Error) => toast.error(error.message),
  });

  return { createProduct, updateProduct, deleteProduct };
};
