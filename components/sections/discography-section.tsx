"use client";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { useMemo, useState } from "react";
import { ContentBadge } from "@/components/shared/content-badge";
import { LazyImage } from "@/components/shared/lazy-image";
import { SectionShell } from "@/components/shared/section-shell";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useReleases } from "@/hooks/use-releases";
import { formatDuration } from "@/lib/utils";
import type { Release } from "@/types";

export function DiscographySection() {
  const { data: releases, isLoading } = useReleases();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState<string[]>([]);

  const filteredData = useMemo(() => {
    if (!releases) return [];
    return releases.filter(
      (r) => typeFilter.length === 0 || typeFilter.includes(r.type)
    );
  }, [releases, typeFilter]);

  const columns = useMemo<ColumnDef<Release>[]>(
    () => [
      {
        accessorKey: "artworkUrl",
        header: "Artwork",
        cell: ({ row }) => (
          <div className="relative h-10 w-10 overflow-hidden rounded-md">
            <LazyImage
              src={row.original.artworkUrl}
              alt={row.original.title}
              fill
            />
          </div>
        ),
        enableSorting: false,
      },
      {
        accessorKey: "title",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="-ml-4"
          >
            Release
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => (
          <div>
            <span className="font-medium">{row.original.title}</span>
            <ContentBadge
              status={row.original.contentStatus}
              className="ml-2"
            />
          </div>
        ),
      },
      {
        accessorKey: "artist",
        header: "Artist",
      },
      {
        accessorKey: "releaseDate",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="-ml-4"
          >
            Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) =>
          row.original.releaseDate
            ? new Date(row.original.releaseDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })
            : "—",
      },
      {
        accessorKey: "genre",
        header: "Genre",
      },
      {
        accessorKey: "type",
        header: "Type",
      },
      {
        accessorKey: "duration",
        header: "Duration",
        cell: ({ row }) =>
          row.original.duration
            ? formatDuration(row.original.duration)
            : "—",
      },
    ],
    []
  );

  const table = useReactTable({
    data: filteredData,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <SectionShell
      id="discography"
      title="Discography"
      subtitle="Complete catalog — searchable and sortable."
      className="bg-surface"
    >
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <Input
          placeholder="Search releases..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="max-w-sm"
          aria-label="Search discography"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              Filter by type
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {(["Single", "EP", "Album"] as const).map((type) => (
              <DropdownMenuCheckboxItem
                key={type}
                checked={typeFilter.includes(type)}
                onCheckedChange={(checked) => {
                  setTypeFilter((prev) =>
                    checked
                      ? [...prev, type]
                      : prev.filter((t) => t !== type)
                  );
                }}
              >
                {type}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {isLoading ? (
        <Skeleton className="h-64 w-full rounded-xl" />
      ) : (
        <div className="overflow-hidden rounded-xl border border-subtle">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((hg) => (
                <TableRow key={hg.id}>
                  {hg.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center text-secondary"
                  >
                    No releases found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </SectionShell>
  );
}
