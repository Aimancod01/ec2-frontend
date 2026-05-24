import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormFieldWrapper, FormProvider } from "@/components/shared/form-provider/form-provider";
import CommonButton from "@/components/shared/button/common-button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  productSchema,
  type ProductFormValues,
} from "../schema/product-schema";
import type { Category, Product } from "../types/api-types";

interface ProductFormPanelProps {
  product?: Product | null;
  categories: Category[];
  isSubmitting: boolean;
  onSubmit: (values: ProductFormValues) => void;
  onCancel: () => void;
}

const selectClassName = cn(
  "border-input dark:bg-input/30 focus-visible:border-ring focus-visible:ring-ring/50 h-8 w-full rounded-lg border bg-transparent px-2.5 text-sm outline-none focus-visible:ring-3",
);

const ProductFormPanel = ({
  product,
  categories,
  isSubmitting,
  onSubmit,
  onCancel,
}: ProductFormPanelProps) => {
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product?.name ?? "",
      price: product?.price ?? 0,
      categoryId: product?.categoryId ?? "",
    },
  });

  useEffect(() => {
    form.reset({
      name: product?.name ?? "",
      price: product?.price ?? 0,
      categoryId: product?.categoryId ?? categories[0]?.id ?? "",
    });
  }, [product, categories, form]);

  const hasCategories = categories.length > 0;

  return (
    <Card className="border-primary/20 shadow-md shadow-primary/5 ring-1 ring-primary/10">
      <CardHeader>
        <CardTitle>{product ? "Edit product" : "New product"}</CardTitle>
        <CardDescription>
          {product
            ? "Update product details and assign it to a category."
            : "Add a product with a name, price, and category."}
        </CardDescription>
      </CardHeader>
      <FormProvider form={form} onSubmit={onSubmit}>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <FormFieldWrapper name="name" label="Name" className="sm:col-span-2">
            {(field) => (
              <Input {...field} placeholder="e.g. Wireless headphones" autoFocus />
            )}
          </FormFieldWrapper>
          <FormFieldWrapper name="price" label="Price">
            {(field) => (
              <Input
                {...field}
                type="number"
                min={0}
                step="0.01"
                placeholder="0.00"
                value={Number.isNaN(field.value) ? "" : field.value}
                onChange={(event) => field.onChange(event.target.valueAsNumber)}
              />
            )}
          </FormFieldWrapper>
          <FormFieldWrapper name="categoryId" label="Category">
            {(field) => (
              <select
                {...field}
                className={selectClassName}
                disabled={!hasCategories}
              >
                {!hasCategories && <option value="">No categories available</option>}
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            )}
          </FormFieldWrapper>
        </CardContent>
        <CardFooter className="gap-2 border-t-0 bg-transparent">
          <CommonButton
            type="submit"
            label={product ? "Save changes" : "Create product"}
            isLoading={isSubmitting}
            disabled={!hasCategories}
          />
          <CommonButton
            type="button"
            variant="outline"
            label="Cancel"
            onClick={onCancel}
            disabled={isSubmitting}
          />
        </CardFooter>
      </FormProvider>
    </Card>
  );
};

export default ProductFormPanel;
