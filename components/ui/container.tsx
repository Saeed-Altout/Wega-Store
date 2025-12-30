import { cn } from "@/lib/utils";

export function Container({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("px-4 md:px-6 lg:px-8 xl:px-10", className)}
      {...props}
    />
  );
}
