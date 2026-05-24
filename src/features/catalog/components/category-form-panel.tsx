import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormFieldWrapper, FormProvider } from "@/components/shared/form-provider/form-provider";
import CommonButton from "@/components/shared/button/common-button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  categorySchema,
  type CategoryFormValues,
} from "../schema/category-schema";
import type { Category } from "../types/api-types";

interface CategoryFormPanelProps {
  category?: Category | null;
  isSubmitting: boolean;
  onSubmit: (values: CategoryFormValues) => void;
  onCancel: () => void;
}

const CategoryFormPanel = ({
  category,
  isSubmitting,
  onSubmit,
  onCancel,
}: CategoryFormPanelProps) => {
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: { name: category?.name ?? "" },
  });

  useEffect(() => {
    form.reset({ name: category?.name ?? "" });
  }, [category, form]);

  return (
    <Card className="border-primary/20 shadow-md shadow-primary/5 ring-1 ring-primary/10">
      <CardHeader>
        <CardTitle>{category ? "Edit category" : "New category"}</CardTitle>
        <CardDescription>
          {category
            ? "Update the category name and save your changes."
            : "Add a category to organize your products."}
        </CardDescription>
      </CardHeader>
      <FormProvider form={form} onSubmit={onSubmit}>
        <CardContent>
          <FormFieldWrapper name="name" label="Name">
            {(field) => (
              <Input
                {...field}
                placeholder="e.g. Electronics"
                autoFocus
              />
            )}
          </FormFieldWrapper>
        </CardContent>
        <CardFooter className="gap-2 border-t-0 bg-transparent">
          <CommonButton
            type="submit"
            label={category ? "Save changes" : "Create category"}
            isLoading={isSubmitting}
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

export default CategoryFormPanel;
