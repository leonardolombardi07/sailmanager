import React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { SailingClass } from "@/api/types";

interface SailingClassBadgeProps extends React.ComponentProps<typeof Badge> {
  sailingClass: SailingClass;
}

export function SailingClassBadge({
  sailingClass,
  className,
  ...rest
}: SailingClassBadgeProps) {
  return (
    <Badge
      variant="secondary"
      className={cn(
        "whitespace-nowrap", // Prevents wrapping on long names like 'Flying Dutchman'
        className, // Allows external overrides
      )}
      {...rest}
    >
      {sailingClass}
    </Badge>
  );
}
