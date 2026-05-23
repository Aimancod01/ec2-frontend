import { Link } from "react-router-dom";
import { FolderTree, Package } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import CatalogPageHeader from "@/features/catalog/components/catalog-page-header";
import { useCategoriesQuery } from "@/features/catalog/hooks/use-categories";
import { useProductsQuery } from "@/features/catalog/hooks/use-products";

const Dashboard = () => {
  const { data: categories = [], isLoading: categoriesLoading } = useCategoriesQuery();
  const { data: products = [], isLoading: productsLoading } = useProductsQuery();

  const isLoading = categoriesLoading || productsLoading;

  return (
    <div className="space-y-6">
      <CatalogPageHeader
        title="Dashboard"
        description="Overview of your catalog API data."
      />

      {isLoading ? (
        <div className="flex justify-center py-16">
          <Spinner className="size-8" />
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          <Link to="/admin/categories" className="block transition-opacity hover:opacity-90">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FolderTree className="size-5" />
                  Categories
                </CardTitle>
                <CardDescription>Organize products into groups</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-semibold tabular-nums">{categories.length}</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/admin/products" className="block transition-opacity hover:opacity-90">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="size-5" />
                  Products
                </CardTitle>
                <CardDescription>Items in your catalog</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-semibold tabular-nums">{products.length}</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
