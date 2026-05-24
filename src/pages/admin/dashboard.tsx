import { Link } from "react-router-dom";
import { ArrowRight, FolderTree, Package } from "lucide-react";
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
import { cn } from "@/lib/utils";

const statCards = [
  {
    to: "/admin/categories",
    label: "Categories",
    description: "Organize products into groups",
    icon: FolderTree,
    accent: "from-violet-500/15 to-transparent",
    iconClass: "text-violet-600 dark:text-violet-400",
  },
  {
    to: "/admin/products",
    label: "Products",
    description: "Items in your catalog",
    icon: Package,
    accent: "from-indigo-500/15 to-transparent",
    iconClass: "text-indigo-600 dark:text-indigo-400",
  },
] as const;

const Dashboard = () => {
  const { data: categories = [], isLoading: categoriesLoading } = useCategoriesQuery();
  const { data: products = [], isLoading: productsLoading } = useProductsQuery();

  const isLoading = categoriesLoading || productsLoading;
  const counts = [categories.length, products.length];

  return (
    <div className="space-y-8">
      <CatalogPageHeader
        badge="Overview"
        title="Dashboard"
        description="A quick snapshot of your catalog. Jump into categories or products to manage inventory."
      />

      {isLoading ? (
        <div className="flex justify-center py-20">
          <Spinner className="text-primary size-8" />
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2">
          {statCards.map(({ to, label, description, icon: Icon, accent, iconClass }, index) => (
            <Link
              key={to}
              to={to}
              className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-2xl"
            >
              <Card className="h-full overflow-hidden transition-all duration-200 group-hover:-translate-y-0.5 group-hover:shadow-md group-hover:shadow-primary/5">
                <CardHeader className="relative">
                  <div
                    className={cn(
                      "pointer-events-none absolute inset-0 bg-gradient-to-br",
                      accent,
                    )}
                  />
                  <div className="relative flex items-start justify-between gap-3">
                    <div>
                      <CardTitle>{label}</CardTitle>
                      <CardDescription className="mt-1">{description}</CardDescription>
                    </div>
                    <span
                      className={cn(
                        "bg-background/80 flex size-10 items-center justify-center rounded-xl border shadow-sm",
                        iconClass,
                      )}
                    >
                      <Icon className="size-5" />
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="relative flex items-end justify-between">
                  <p className="text-4xl font-semibold tracking-tight tabular-nums">
                    {counts[index]}
                  </p>
                  <span className="text-muted-foreground flex items-center gap-1 text-sm font-medium transition-colors group-hover:text-primary">
                    Manage
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
