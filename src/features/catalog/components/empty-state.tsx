import { PackageOpen } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description: string;
}

const EmptyState = ({ title, description }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed py-16 text-center">
      <div className="bg-muted text-muted-foreground flex size-12 items-center justify-center rounded-full">
        <PackageOpen className="size-6" />
      </div>
      <div className="space-y-1">
        <p className="font-medium">{title}</p>
        <p className="text-muted-foreground max-w-sm text-sm">{description}</p>
      </div>
    </div>
  );
};

export default EmptyState;
