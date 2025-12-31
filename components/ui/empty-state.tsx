import { AlertCircleIcon, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Button } from "@/components/ui/button";

export function EmptyState({
  title,
  description,
  icon: Icon = AlertCircleIcon,
  label,
  onClick,
  className,
}: {
  title: string;
  description: string;
  icon?: LucideIcon;
  label?: string;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <Empty className={cn("", className)}>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Icon />
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
      {label && (
        <EmptyContent>
          <Button onClick={onClick} size="sm">
            {label}
          </Button>
        </EmptyContent>
      )}
    </Empty>
  );
}
