export const CATALOG_QUERY_KEYS = {
  categories: ["catalog", "categories"] as const,
  category: (id: string) => ["catalog", "categories", id] as const,
  products: ["catalog", "products"] as const,
  product: (id: string) => ["catalog", "products", id] as const,
};
