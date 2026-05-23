export const CATALOG_API_ENDPOINTS = {
  categories: "/api/categories",
  categoryById: (id: string) => `/api/categories/${id}`,
  products: "/api/products",
  productById: (id: string) => `/api/products/${id}`,
} as const;
