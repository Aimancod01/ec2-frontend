import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { formatPrice } from "../utils/format-price";
import type { Category, Product } from "../types/api-types";
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
        <Spinner className="size-8" />
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
    <div className="overflow-hidden rounded-xl border">
      <table className="w-full text-sm">
        <thead className="bg-muted/50 border-b">
          <tr>
            <th className="px-4 py-3 text-start font-medium">Name</th>
            <th className="px-4 py-3 text-start font-medium">Price</th>
            <th className="px-4 py-3 text-start font-medium">Category</th>
            <th className="px-4 py-3 text-end font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-b last:border-b-0">
              <td className="px-4 py-3 font-medium">{product.name}</td>
              <td className="px-4 py-3 tabular-nums">{formatPrice(product.price)}</td>
              <td className="text-muted-foreground px-4 py-3">
                {categoryNameById.get(product.categoryId) ?? product.categoryId}
              </td>
              <td className="px-4 py-3">
                <div className="flex justify-end gap-1">
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
    </div>
  );
};

export default ProductTable;
