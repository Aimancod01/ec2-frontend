import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import type { Category } from "../types/api-types";
import {
  CatalogDataTable,
  catalogTableHeadClass,
  catalogTableRowClass,
  truncateId,
} from "./catalog-data-table";
import EmptyState from "./empty-state";

interface CategoryTableProps {
  categories: Category[];
  isLoading: boolean;
  isError: boolean;
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
}

const CategoryTable = ({
  categories,
  isLoading,
  isError,
  onEdit,
  onDelete,
}: CategoryTableProps) => {
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
        title="Could not load categories"
        description="Check that the API is running on port 4000, then try again."
      />
    );
  }

  if (categories.length === 0) {
    return (
      <EmptyState
        title="No categories yet"
        description="Create your first category to start organizing products."
      />
    );
  }

  return (
    <CatalogDataTable>
      <table className="w-full text-sm">
        <thead className="border-b">
          <tr>
            <th className={catalogTableHeadClass}>Name</th>
            <th className={catalogTableHeadClass}>ID</th>
            <th className={cn(catalogTableHeadClass, "text-end")}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id} className={catalogTableRowClass}>
              <td className="px-4 py-3.5 font-medium">{category.name}</td>
              <td className="text-muted-foreground px-4 py-3.5">
                <code
                  className="bg-muted rounded-md px-1.5 py-0.5 font-mono text-xs"
                  title={category.id}
                >
                  {truncateId(category.id)}
                </code>
              </td>
              <td className="px-4 py-3.5">
                <div className="flex justify-end gap-0.5">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => onEdit(category)}
                    aria-label={`Edit ${category.name}`}
                  >
                    <Pencil className="size-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => onDelete(category)}
                    aria-label={`Delete ${category.name}`}
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


export default CategoryTable;
