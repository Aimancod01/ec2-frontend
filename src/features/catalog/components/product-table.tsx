import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { formatPrice } from "../utils/format-price";
import type { Category, Product } from "../types/api-types";
import {
  CatalogDataTable,
  catalogTableHeadClass,
  catalogTableRowClass,
} from "./catalog-data-table";
import EmptyState from "./empty-state";

interface ProductTableProps {
  products: Product[];
  categories: Category[];
  isLoading: boolean;
  isError: boolean;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

const ProductTable = ({
  products,
  categories,
  isLoading,
  isError,
  onEdit,
  onDelete,
}: ProductTableProps) => {
  const categoryNameById = new Map(categories.map((c) => [c.id, c.name]));

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner className="text-primary size-8" />
      </div>
    );
  }

  if (isError) {
    return (
      <EmptyState
        title="Could not load products"
        description="Check that the API is running on port 4000, then try again."
      />
    );
  }

  if (products.length === 0) {
    return (
      <EmptyState
        title="No products yet"
        description="Create a category first, then add your first product."
      />
    );
  }

  return (
    <CatalogDataTable>
      <table className="w-full text-sm">
        <thead className="border-b">
          <tr>
            <th className={catalogTableHeadClass}>Name</th>
            <th className={catalogTableHeadClass}>Price</th>
            <th className={catalogTableHeadClass}>Category</th>
            <th className={cn(catalogTableHeadClass, "text-end")}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className={catalogTableRowClass}>
              <td className="px-4 py-3.5 font-medium">{product.name}</td>
              <td className="px-4 py-3.5 font-medium tabular-nums">
                {formatPrice(product.price)}
              </td>
              <td className="px-4 py-3.5">
                <Badge variant="secondary">
                  {categoryNameById.get(product.categoryId) ?? "Unknown"}
                </Badge>
              </td>
              <td className="px-4 py-3.5">
                <div className="flex justify-end gap-0.5">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => onEdit(product)}
                    aria-label={`Edit ${product.name}`}
                  >
                    <Pencil className="size-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => onDelete(product)}
                    aria-label={`Delete ${product.name}`}
                  >
                    <Trash2 className="text-destructive size-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </CatalogDataTable>
  );
};

export default ProductTable;
