import { cn } from "@/lib/utils";

interface CatalogDataTableProps {
  children: React.ReactNode;
  className?: string;
}

export const CatalogDataTable = ({ children, className }: CatalogDataTableProps) => {
  return (
    <div
      className={cn(
        "bg-card overflow-hidden rounded-xl border shadow-sm shadow-black/[0.03]",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const catalogTableHeadClass =
  "bg-muted/60 text-muted-foreground px-4 py-3 text-start text-xs font-medium uppercase tracking-wide";

export const catalogTableRowClass =
  "border-b transition-colors last:border-b-0 hover:bg-muted/30";

export const truncateId = (id: string) =>
  id.length > 12 ? `${id.slice(0, 8)}…${id.slice(-4)}` : id;
