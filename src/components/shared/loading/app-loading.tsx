import { Spinner } from "@/components/ui/spinner";
import CatalogLogo from "@/components/shared/brand/catalog-logo";

const AppLoading = () => {
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-4">
      <CatalogLogo showLabel={false} />
      <Spinner className="text-primary size-6" />
      <p className="text-muted-foreground text-sm">Loading catalog…</p>
    </div>
  );
};

export default AppLoading;
