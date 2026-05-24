import { PackageOpen } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description: string;
}

const EmptyState = ({ title, description }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed bg-muted/20 px-6 py-20 text-center">
      <div className="bg-primary/10 text-primary flex size-14 items-center justify-center rounded-2xl">
        <PackageOpen className="size-7" />
      </div>
      <div className="space-y-1.5">
        <p className="text-base font-semibold">{title}</p>
        <p className="text-muted-foreground max-w-sm text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

export default EmptyState;
