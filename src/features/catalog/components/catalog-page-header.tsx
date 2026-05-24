interface CatalogPageHeaderProps {
  title: string;
  description: string;
  action?: React.ReactNode;
  badge?: string;
}

const CatalogPageHeader = ({
  title,
  description,
  action,
  badge,
}: CatalogPageHeaderProps) => {
  return (
    <div className="flex flex-col gap-4 border-b pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div className="space-y-2">
        {badge && (
          <p className="text-primary text-xs font-semibold tracking-widest uppercase">
            {badge}
          </p>
        )}
        <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
        <p className="text-muted-foreground max-w-xl text-sm leading-relaxed">
          {description}
        </p>
      </div>
      {action}
    </div>
  );
};

export default CatalogPageHeader;
