import { cn } from "@/lib/utils";

interface CatalogLogoProps {
  className?: string;
  showLabel?: boolean;
}

const CatalogLogo = ({ className, showLabel = true }: CatalogLogoProps) => {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <span className="bg-primary text-primary-foreground flex size-9 shrink-0 items-center justify-center rounded-lg shadow-sm shadow-primary/25">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="size-5"
          aria-hidden="true"
        >
          <rect x="3" y="4" width="7" height="7" rx="1.5" fill="currentColor" fillOpacity="0.95" />
          <rect x="14" y="4" width="7" height="7" rx="1.5" fill="currentColor" fillOpacity="0.65" />
          <rect x="3" y="14" width="7" height="5" rx="1.5" fill="currentColor" fillOpacity="0.65" />
          <rect x="14" y="14" width="7" height="5" rx="1.5" fill="currentColor" fillOpacity="0.95" />
        </svg>
      </span>
      {showLabel && (
        <span className="min-w-0">
          <span className="block text-sm font-semibold tracking-tight">Catalog</span>
          <span className="text-muted-foreground block text-xs">Product admin</span>
        </span>
      )}
    </div>
  );
};

export default CatalogLogo;
