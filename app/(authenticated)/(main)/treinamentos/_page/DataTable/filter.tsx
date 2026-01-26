import * as React from "react";
import { PlusCircle } from "lucide-react";
import { Column } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";

interface DataTableFilterProps<TData, TValue> {
  column?: Column<TData, TValue>;
  title: string;
  options: {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
}

export function DataTableFilter<TData, TValue>({
  column,
  title,
  options,
}: DataTableFilterProps<TData, TValue>) {
  const selectedValues = new Set(column?.getFilterValue() as string[]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          <PlusCircle className="mr-2 h-4 w-4" />
          {title}
          {selectedValues.size > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal lg:hidden"
              >
                {selectedValues.size}
              </Badge>
              <div className="hidden space-x-1 lg:flex">
                {selectedValues.size > 2 ? (
                  <Badge
                    variant="secondary"
                    className="rounded-sm px-1 font-normal"
                  >
                    {selectedValues.size} selecionados
                  </Badge>
                ) : (
                  options
                    .filter((option) => selectedValues.has(option.value))
                    .map((option) => (
                      <Badge
                        variant="secondary"
                        key={option.value}
                        className="rounded-sm px-1 font-normal"
                      >
                        {option.label}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[200px]">
        <DropdownMenuLabel>{title}</DropdownMenuLabel>
        <DropdownMenuGroup>
          {options.map((option) => {
            const isSelected = selectedValues.has(option.value);
            return (
              <DropdownMenuCheckboxItem
                key={option.value}
                checked={isSelected}
                onCheckedChange={(checked) => {
                  const newSet = new Set(selectedValues);
                  if (checked) {
                    newSet.add(option.value);
                  } else {
                    newSet.delete(option.value);
                  }
                  // Set filter value as array for multi-select
                  const filterValue = Array.from(newSet);
                  column?.setFilterValue(
                    filterValue.length ? filterValue : undefined,
                  );
                }}
              >
                {option.icon && (
                  <option.icon className="text-muted-foreground mr-2 h-4 w-4" />
                )}
                <span>{option.label}</span>
              </DropdownMenuCheckboxItem>
            );
          })}
        </DropdownMenuGroup>
        {selectedValues.size > 0 && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="justify-center text-center"
              onClick={() => column?.setFilterValue(undefined)}
            >
              Limpar filtros
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
