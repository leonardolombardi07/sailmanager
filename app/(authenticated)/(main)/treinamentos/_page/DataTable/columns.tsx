"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Column, ColumnDef } from "@tanstack/react-table";
import { Practice } from "@/api/types";
import { StatusBadge } from "@/components/status-badge";
import { Rating } from "@/components/ui/rating";
import { SailingClassBadge } from "@/components/sailing-class-badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

// Helper component for sortable headers
const SortableHeader = ({
  column,
  title,
}: {
  column: Column<Practice, unknown>;
  title: string;
}) => {
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      className="data-[state=open]:bg-accent -ml-4 h-8"
    >
      <span>{title}</span>
      {column.getIsSorted() === "desc" ? (
        <ArrowUpDown className="ml-2 h-4 w-4 rotate-180" />
      ) : (
        <ArrowUpDown className="ml-2 h-4 w-4" />
      )}
    </Button>
  );
};

export function useColumns(): ColumnDef<Practice>[] {
  const router = useRouter();

  return [
    {
      accessorKey: "status",
      header: ({ column }) => <SortableHeader column={column} title="Status" />,
      cell: ({ row }) => <StatusBadge status={row.original.status} />,
      // Filter Logic: Checks if the row's status is inside the selected filter array
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: "expectedStart.datetime",
      header: ({ column }) => <SortableHeader column={column} title="Data" />,
      cell: ({ row }) => {
        const dateStr = row.original.expectedStart.datetime;
        const date = new Date(dateStr);
        const formatted = new Intl.DateTimeFormat("en-US", {
          dateStyle: "medium",
          timeStyle: "short",
        }).format(date);
        return <div>{formatted}</div>;
      },
    },
    {
      accessorKey: "name",
      header: ({ column }) => <SortableHeader column={column} title="Nome" />,
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("name")}</div>
      ),
    },

    {
      accessorKey: "location.place.name",
      header: ({ column }) => <SortableHeader column={column} title="Local" />,
      cell: ({ row }) => {
        const locationName = row.original.location?.place?.name || "Unknown";
        return <div>{locationName}</div>;
      },
    },

    {
      id: "classes",
      // Flatten the array to a string for easier sorting/filtering default behavior
      accessorFn: (row) => row.classes?.join(", ") || "",
      header: ({ column }) => (
        <SortableHeader column={column} title="Classes" />
      ),
      cell: ({ row }) => {
        const classes = row.original.classes || [];
        return (
          <div className="flex flex-wrap gap-1">
            {classes.map((cls) => (
              <SailingClassBadge key={cls} sailingClass={cls}>
                {cls}
              </SailingClassBadge>
            ))}
          </div>
        );
      },
      // Filter Logic: Checks if ANY of the selected filters exist in the row string
      filterFn: (row, id, value) => {
        const rowValue = row.getValue(id) as string;
        // Value is an array of selected filters (e.g. ["Optimist", "Laser"])
        return value.some((val: string) => rowValue.includes(val));
      },
    },

    {
      accessorKey: "metereologySummary", // Note: Matches your type spelling
      header: ({ column }) => <SortableHeader column={column} title="Vento" />,
      // Custom sorting: Sort by wind speed
      sortingFn: (rowA, rowB) => {
        const speedA = rowA.original.metereologySummary?.wind?.speed || 0;
        const speedB = rowB.original.metereologySummary?.wind?.speed || 0;
        return speedA - speedB;
      },
      cell: ({ row }) => {
        const wind = row.original.metereologySummary?.wind;

        if (!wind) {
          return <span className="text-muted-foreground">-</span>;
        }

        return (
          <div className="flex items-center gap-2">
            <div className="font-medium">{wind.speed} kn</div>

            {/* Direction indicator */}
            <div
              className="bg-muted flex h-6 w-6 items-center justify-center rounded-full border"
              title={`Direção: ${wind.direction}°`}
            >
              <ArrowUp
                className="text-muted-foreground h-3 w-3"
                style={{ transform: `rotate(${wind.direction}deg)` }}
              />
            </div>
          </div>
        );
      },
    },

    {
      accessorKey: "rating",
      header: ({ column }) => (
        <SortableHeader column={column} title="Avaliação" />
      ),
      cell: ({ row }) => {
        return <Rating rating={row.original.rating} variant="yellow" />;
      },
    },

    {
      id: "actions",
      enableHiding: false,
      enableSorting: false,
      cell: ({ row }) => {
        const practice = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuGroup>
                <DropdownMenuLabel>Ações</DropdownMenuLabel>
              </DropdownMenuGroup>
              <DropdownMenuGroup>
                <DropdownMenuItem
                  onClick={() =>
                    router.push(`/treinamentos/${practice.id}/geral`)
                  }
                >
                  Ver detalhes
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
}
