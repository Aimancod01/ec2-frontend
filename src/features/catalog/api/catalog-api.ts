import axiosInstance from "@/config/axios-instance";
import { isAxiosError } from "axios";
import { CATALOG_API_ENDPOINTS } from "../config/api-endpoints";
import type {
  ApiErrorBody,
  Category,
  CategoryInput,
  Product,
  ProductInput,
} from "../types/api-types";

const getErrorMessage = (error: unknown): string => {
  if (isAxiosError<ApiErrorBody>(error)) {
    return error.response?.data?.message ?? error.message ?? "Something went wrong";
  }

  return "Unexpected error";
};

const request = async <T>(fn: () => Promise<{ data: T }>): Promise<T> => {
  try {
    const response = await fn();
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const catalogApi = {
  getCategories: () =>
    request<Category[]>(() => axiosInstance.get(CATALOG_API_ENDPOINTS.categories)),

  getCategory: (id: string) =>
    request<Category>(() => axiosInstance.get(CATALOG_API_ENDPOINTS.categoryById(id))),

  createCategory: (data: CategoryInput) =>
    request<Category>(() => axiosInstance.post(CATALOG_API_ENDPOINTS.categories, data)),

  updateCategory: (id: string, data: CategoryInput) =>
    request<Category>(() =>
      axiosInstance.put(CATALOG_API_ENDPOINTS.categoryById(id), data),
    ),

  deleteCategory: (id: string) =>
    request<Category>(() => axiosInstance.delete(CATALOG_API_ENDPOINTS.categoryById(id))),

  getProducts: () =>
    request<Product[]>(() => axiosInstance.get(CATALOG_API_ENDPOINTS.products)),

  getProduct: (id: string) =>
    request<Product>(() => axiosInstance.get(CATALOG_API_ENDPOINTS.productById(id))),

  createProduct: (data: ProductInput) =>
    request<Product>(() => axiosInstance.post(CATALOG_API_ENDPOINTS.products, data)),

  updateProduct: (id: string, data: ProductInput) =>
    request<Product>(() =>
      axiosInstance.put(CATALOG_API_ENDPOINTS.productById(id), data),
    ),

  deleteProduct: (id: string) =>
    request<Product>(() => axiosInstance.delete(CATALOG_API_ENDPOINTS.productById(id))),
};
