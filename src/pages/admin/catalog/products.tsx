import { useState } from "react";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import CommonButton from "@/components/shared/button/common-button";
import CatalogPageHeader from "@/features/catalog/components/catalog-page-header";
import DeleteConfirmDialog from "@/features/catalog/components/delete-confirm-dialog";
import ProductFormPanel from "@/features/catalog/components/product-form-panel";
import ProductTable from "@/features/catalog/components/product-table";
import { useCategoriesQuery } from "@/features/catalog/hooks/use-categories";
import {
  useProductMutations,
  useProductsQuery,
} from "@/features/catalog/hooks/use-products";
import type { ProductFormValues } from "@/features/catalog/schema/product-schema";
import type { Product } from "@/features/catalog/types/api-types";

type FormMode = "closed" | "create" | "edit";

const ProductsPage = () => {
  const { data: products = [], isLoading, isError } = useProductsQuery();
  const { data: categories = [], isLoading: categoriesLoading } = useCategoriesQuery();
  const { createProduct, updateProduct, deleteProduct } = useProductMutations();

  const [formMode, setFormMode] = useState<FormMode>("closed");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);

  const isFormOpen = formMode !== "closed";
  const isSubmitting = createProduct.isPending || updateProduct.isPending;
  const hasCategories = categories.length > 0;

  const openCreate = () => {
    setEditingProduct(null);
    setFormMode("create");
  };

  const openEdit = (product: Product) => {
    setEditingProduct(product);
    setFormMode("edit");
  };

  const closeForm = () => {
    setFormMode("closed");
    setEditingProduct(null);
  };

  const handleSubmit = (values: ProductFormValues) => {
    if (formMode === "edit" && editingProduct) {
      updateProduct.mutate(
        { id: editingProduct.id, data: values },
        { onSuccess: closeForm },
      );
      return;
    }

    createProduct.mutate(values, { onSuccess: closeForm });
  };

  const handleDelete = () => {
    if (!deletingProduct) return;

    deleteProduct.mutate(deletingProduct.id, {
      onSuccess: () => setDeletingProduct(null),
    });
  };

  return (
    <div className="space-y-6">
      <CatalogPageHeader
        badge="Inventory"
        title="Products"
        description="Manage catalog products with name, price, and category."
        action={
          !isFormOpen ? (
            <CommonButton
              type="button"
              label="New product"
              leftIcon={<Plus className="size-4" />}
              onClick={openCreate}
              disabled={!hasCategories && !categoriesLoading}
            />
          ) : null
        }
      />

      {!categoriesLoading && !hasCategories && (
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm">
          <p className="font-medium">Create a category first</p>
          <p className="text-muted-foreground mt-1">
            Products require a category.{" "}
            <Link to="/admin/categories" className="text-foreground font-medium underline">
              Add a category
            </Link>{" "}
            before creating products.
          </p>
        </div>
      )}

      {isFormOpen && (
        <ProductFormPanel
          product={formMode === "edit" ? editingProduct : null}
          categories={categories}
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit}
          onCancel={closeForm}
        />
      )}

      <ProductTable
        products={products}
        categories={categories}
        isLoading={isLoading}
        isError={isError}
        onEdit={openEdit}
        onDelete={setDeletingProduct}
      />

      <DeleteConfirmDialog
        open={Boolean(deletingProduct)}
        onOpenChange={(open) => !open && setDeletingProduct(null)}
        title="Delete product?"
        description={`"${deletingProduct?.name}" will be removed permanently.`}
        onConfirm={handleDelete}
        isLoading={deleteProduct.isPending}
      />
    </div>
  );
};

export default ProductsPage;
