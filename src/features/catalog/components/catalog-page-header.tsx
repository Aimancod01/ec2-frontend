interface CatalogPageHeaderProps {
  title: string;
  description: string;
  action?: React.ReactNode;
}

const CatalogPageHeader = ({ title, description, action }: CatalogPageHeaderProps) => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
      {action}
    </div>
  );
};

export default CatalogPageHeader;
