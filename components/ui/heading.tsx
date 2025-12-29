import { cn } from "@/lib/utils";

export function Heading({
  title,
  description,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  title: string;
  description?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-start md:items-center justify-between flex-col md:flex-row gap-2 md:gap-0",
        className
      )}
      {...props}
    >
      <div className="flex flex-col">
        <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
        {description && (
          <p className="text-muted-foreground max-w-2xl">{description}</p>
        )}
      </div>
      {children}
    </div>
  );
}
