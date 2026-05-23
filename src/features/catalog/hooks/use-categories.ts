import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { catalogApi } from "../api/catalog-api";
import { CATALOG_QUERY_KEYS } from "../config/tanstack-keys";
import type { CategoryInput } from "../types/api-types";

const catalogQueryOptions = {
  staleTime: 30_000,
  refetchOnMount: true,
} as const;

export const useCategoriesQuery = () =>
  useQuery({
    queryKey: CATALOG_QUERY_KEYS.categories,
    queryFn: catalogApi.getCategories,
    ...catalogQueryOptions,
  });

export const useCategoryMutations = () => {
  const queryClient = useQueryClient();

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: CATALOG_QUERY_KEYS.categories });

  const createCategory = useMutation({
    mutationFn: (data: CategoryInput) => catalogApi.createCategory(data),
    onSuccess: () => {
      toast.success("Category created");
      void invalidate();
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const updateCategory = useMutation({
    mutationFn: ({ id, data }: { id: string; data: CategoryInput }) =>
      catalogApi.updateCategory(id, data),
    onSuccess: () => {
      toast.success("Category updated");
      void invalidate();
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const deleteCategory = useMutation({
    mutationFn: (id: string) => catalogApi.deleteCategory(id),
    onSuccess: () => {
      toast.success("Category deleted");
      void invalidate();
      void queryClient.invalidateQueries({ queryKey: CATALOG_QUERY_KEYS.products });
    },
    onError: (error: Error) => toast.error(error.message),
  });

  return { createCategory, updateCategory, deleteCategory };
};
