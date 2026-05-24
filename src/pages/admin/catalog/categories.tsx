import { useState } from "react";
import { Plus } from "lucide-react";
import CommonButton from "@/components/shared/button/common-button";
import CatalogPageHeader from "@/features/catalog/components/catalog-page-header";
import CategoryFormPanel from "@/features/catalog/components/category-form-panel";
import CategoryTable from "@/features/catalog/components/category-table";
import DeleteConfirmDialog from "@/features/catalog/components/delete-confirm-dialog";
import {
  useCategoriesQuery,
  useCategoryMutations,
} from "@/features/catalog/hooks/use-categories";
import type { CategoryFormValues } from "@/features/catalog/schema/category-schema";
import type { Category } from "@/features/catalog/types/api-types";

type FormMode = "closed" | "create" | "edit";

const CategoriesPage = () => {
  const { data: categories = [], isLoading, isError } = useCategoriesQuery();
  const { createCategory, updateCategory, deleteCategory } = useCategoryMutations();

  const [formMode, setFormMode] = useState<FormMode>("closed");
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deletingCategory, setDeletingCategory] = useState<Category | null>(null);

  const isFormOpen = formMode !== "closed";
  const isSubmitting =
    createCategory.isPending || updateCategory.isPending;

  const openCreate = () => {
    setEditingCategory(null);
    setFormMode("create");
  };

  const openEdit = (category: Category) => {
    setEditingCategory(category);
    setFormMode("edit");
  };

  const closeForm = () => {
    setFormMode("closed");
    setEditingCategory(null);
  };

  const handleSubmit = (values: CategoryFormValues) => {
    if (formMode === "edit" && editingCategory) {
      updateCategory.mutate(
        { id: editingCategory.id, data: values },
        { onSuccess: closeForm },
      );
      return;
    }

    createCategory.mutate(values, { onSuccess: closeForm });
  };

  const handleDelete = () => {
    if (!deletingCategory) return;

    deleteCategory.mutate(deletingCategory.id, {
      onSuccess: () => setDeletingCategory(null),
    });
  };

  return (
    <div className="space-y-6">
      <CatalogPageHeader
        badge="Inventory"
        title="Categories"
        description="Create and manage product categories for your catalog."
        action={
          !isFormOpen ? (
            <CommonButton
              type="button"
              label="New category"
              leftIcon={<Plus className="size-4" />}
              onClick={openCreate}
            />
          ) : null
        }
      />

      {isFormOpen && (
        <CategoryFormPanel
          category={formMode === "edit" ? editingCategory : null}
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit}
          onCancel={closeForm}
        />
      )}

      <CategoryTable
        categories={categories}
        isLoading={isLoading}
        isError={isError}
        onEdit={openEdit}
        onDelete={setDeletingCategory}
      />

      <DeleteConfirmDialog
        open={Boolean(deletingCategory)}
        onOpenChange={(open) => !open && setDeletingCategory(null)}
        title="Delete category?"
        description={`"${deletingCategory?.name}" will be removed permanently. Products linked to it may fail validation on the server.`}
        onConfirm={handleDelete}
        isLoading={deleteCategory.isPending}
      />
    </div>
  );
};

export default CategoriesPage;
