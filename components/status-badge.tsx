import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import React from "react";

export type Status = "scheduled" | "ongoing" | "finished";

interface StatusBadgeProps extends React.ComponentProps<typeof Badge> {
  status: Status;
}

export function StatusBadge({ status, className, ...rest }: StatusBadgeProps) {
  const statusConfig: Record<Status, { label: string; className: string }> = {
    scheduled: {
      label: "Agendado",
      // Gray/Zinc look for something pending
      className: "bg-zinc-500 hover:bg-zinc-600 text-white border-transparent",
    },
    ongoing: {
      label: "Em Andamento",
      // Blue look for active state
      className: "bg-blue-500 hover:bg-blue-600 text-white border-transparent",
    },
    finished: {
      label: "Finalizado",
      // Green look for success/completion
      className:
        "bg-green-500 hover:bg-green-600 text-white border-transparent",
    },
  };

  const config = statusConfig[status];

  return (
    <Badge
      className={cn(config.className, className)}
      variant="outline"
      {...rest}
    >
      {config.label}
    </Badge>
  );
}
