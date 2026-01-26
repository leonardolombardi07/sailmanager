"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
  type VisibilityState,
  type ColumnFiltersState,
} from "@tanstack/react-table";
import { ChevronDown, X } from "lucide-react";
import { Practice } from "@/api/types";
import { useColumns } from "./columns";
import { DataTableFilter } from "./filter";

// Define filter options
const STATUS_OPTIONS = [
  { label: "Agendado", value: "scheduled" },
  { label: "Finalizado", value: "finished" },
  { label: "Em Andamento", value: "ongoing" },
];

const CLASS_OPTIONS = [
  { label: "Optimist", value: "Optimist" },
  { label: "ILCA 4", value: "ILCA 4" },
  { label: "ILCA 6", value: "ILCA 6" },
  { label: "ILCA 7", value: "ILCA 7" },
  { label: "Snipe", value: "Snipe" },
  { label: "420", value: "420" },
];

export default function DataTable({ practices }: { practices: Practice[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  // Global Search State
  const [globalFilter, setGlobalFilter] = React.useState("");

  const columns = useColumns();

  // Manual Global Filter Logic
  // Filters data BEFORE passing it to the table
  const filteredData = React.useMemo(() => {
    if (!globalFilter) return practices;
    const search = globalFilter.toLowerCase();

    return practices.filter((practice) => {
      const name = practice.name?.toLowerCase() || "";
      const status = practice.status?.toLowerCase() || "";
      const location = practice.location?.place?.name?.toLowerCase() || "";
      const dateStr = practice.expectedStart?.datetime || "";
      const classesStr = (practice.classes || []).join(" ").toLowerCase();

      return (
        name.includes(search) ||
        status.includes(search) ||
        location.includes(search) ||
        dateStr.includes(search) ||
        classesStr.includes(search)
      );
    });
  }, [practices, globalFilter]);

  const table = useReactTable({
    data: filteredData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const isFiltered = globalFilter.length > 0 || columnFilters.length > 0;

  return (
    <div className="w-full space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 items-center space-x-2">
          <Input
            placeholder="Pesquisar..."
            value={globalFilter}
            onChange={(event) => setGlobalFilter(event.target.value)}
            className="h-8 w-[150px] lg:w-[250px]"
          />

          {/* Faceted Filters */}
          {table.getColumn("status") && (
            <DataTableFilter
              column={table.getColumn("status")}
              title="Status"
              options={STATUS_OPTIONS}
            />
          )}
          {table.getColumn("classes") && (
            <DataTableFilter
              column={table.getColumn("classes")}
              title="Classes"
              options={CLASS_OPTIONS}
            />
          )}

          {/* Reset Filters Button */}
          {isFiltered && (
            <Button
              variant="ghost"
              onClick={() => {
                setGlobalFilter("");
                table.resetColumnFilters();
              }}
              className="h-8 px-2 lg:px-3"
            >
              Resetar
              <X className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Column Visibility */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="ml-auto hidden h-8 lg:flex"
            >
              Colunas <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuGroup>
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id === "expectedStart_datetime"
                        ? "Data"
                        : column.id === "location_place_name"
                          ? "Local"
                          : column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Nenhum resultado encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-end space-x-2">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} de{" "}
          {table.getFilteredRowModel().rows.length} linha(s) selecionadas.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Próximo
          </Button>
        </div>
      </div>
    </div>
  );
}
