import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import type { Category } from "../types/api-types";
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
        <Spinner className="size-8" />
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
    <div className="overflow-hidden rounded-xl border">
      <table className="w-full text-sm">
        <thead className="bg-muted/50 border-b">
          <tr>
            <th className="px-4 py-3 text-start font-medium">Name</th>
            <th className="px-4 py-3 text-start font-medium">ID</th>
            <th className="px-4 py-3 text-end font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id} className="border-b last:border-b-0">
              <td className="px-4 py-3 font-medium">{category.name}</td>
              <td className="text-muted-foreground px-4 py-3 font-mono text-xs">
                {category.id}
              </td>
              <td className="px-4 py-3">
                <div className="flex justify-end gap-1">
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
    </div>
  );
};

export default CategoryTable;
