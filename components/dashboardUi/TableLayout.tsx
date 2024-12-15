"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  // DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Row,
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  VisibilityState,
  useReactTable,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import {
  // ArrowUpDown,
  MoreHorizontal,
  ChevronDown,
  PlusSquare,
  ChevronLeft,
  ChevronRight,
  Eye,
  SquarePen,
  Trash2,
} from "lucide-react";
import toast from "react-hot-toast";
import Image from "next/image";
import { truncateText } from "@/utils/truncateText";
import ConfirmDeleteDialog from "@/components/dashboardUi/ConfirmDeleteDialog";

// Define generic types for TableLayout
type TableLayoutProps<T> = {
  data: T[];
  title: string;
  deleteRow: (id: string | number) => Promise<void>;
  baseUrl?: string;
};

const TableLayout = <
  T extends { id: string | number; name: string; slug: string }
>({
  data,
  title,
  deleteRow,
  baseUrl,
}: TableLayoutProps<T>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [rowIdToDelete, setRowIdToDelete] = useState<string | number | null>(
    null
  );
  const [tableData, setTableData] = useState(data);
  const router = useRouter();

  const addRowUrl = `${baseUrl || `/dashboard/${title.toLowerCase()}`}/new`;

  const handleDelete = async (id: string | number) => {
    setRowIdToDelete(id);
    setIsConfirmDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (rowIdToDelete !== null) {
      try {
        await deleteRow(rowIdToDelete);
        setTableData((prev) => prev.filter((row) => row.id !== rowIdToDelete));
        toast.success("Successfully deleted.");
      } catch (error) {
        console.error("Error deleting row:", error);
        toast.error("Error occurred while deleting.");
      } finally {
        setIsConfirmDeleteOpen(false);
        setRowIdToDelete(null);
      }
    }
  };

  // const deleteSelectedRows = async () => {
  //   const selectedIds = Object.keys(rowSelection)
  //     .filter((key) => rowSelection[key]) // Filter selected rows
  //     .map((key) => (isNaN(Number(key)) ? key : Number(key))); // Preserve type (string or number)

  //   if (selectedIds.length === 0) return;

  //   try {
  //     for (const id of selectedIds) {
  //       await deleteRow(id); // Use ID as-is (string or number)
  //     }

  //     setTableData((prev) =>
  //       prev.filter((row) => !selectedIds.includes(row.id))
  //     );

  //     setRowSelection({});
  //     toast.success("Successfully deleted selected rows.");
  //   } catch (error) {
  //     console.error("Error deleting selected rows:", error);
  //     toast.error("An error occurred while deleting.");
  //   }
  // };

  // Dynamically infer columns from data
  const inferredColumns = Object.keys(data[0] || {}).map((key) => {
    if (key === "id") {
      return {
        accessorKey: key,
        header: "ID",
        cell: ({ row }: { row: Row<T> }) => row.getValue(key),
      };
    }
    if (key === "createdAt" || key === "updatedAt") {
      return {
        accessorKey: key,
        header: key
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, (str) => str.toUpperCase()),
        cell: ({ row }: { row: Row<T> }) =>
          new Date(row.getValue(key)).toLocaleDateString(),
      };
    }
    if (key === "image") {
      return {
        accessorKey: key,
        header: "Image",
        cell: ({ row }: { row: Row<T> }) => {
          const imageUrl = row.getValue(key);
          console.log("Image URL:", imageUrl); // Debug the URL
          return (
            <Image
              src={typeof imageUrl === "string" ? imageUrl : ""}
              alt={title}
              width={20}
              height={20}
              className="size-10 object-cover rounded"
              unoptimized // Remove if optimization works after fixing
            />
          );
        },
      };
    }
    // if (key === "image") {
    //   return {
    //     accessorKey: key,
    //     header: "Image",
    //     cell: ({ row }: { row: Row<T> }) => (
    //       <Image
    //         src={row.getValue(key)}
    //         alt={title}
    //         width={20}
    //         height={20}
    //         className="size-10 object-cover rounded"
    //       />
    //     ),
    //   };
    // }
    // return {
    //   accessorKey: key,
    //   header: key
    //     .replace(/([A-Z])/g, " $1")
    //     .replace(/^./, (str) => str.toUpperCase()),
    //   cell: ({ row }: { row: Row<T> }) => {
    //     const cellValue = row.getValue(key);
    //     if (typeof cellValue !== "string") {
    //       return <div>Invalid data</div>;
    //     }
    //     const truncatedValue = truncateText(cellValue, 50);

    //     return (
    //       <div
    //         className="truncate max-w-xs"
    //         dangerouslySetInnerHTML={{ __html: truncatedValue }}
    //       />
    //     );
    //   },
    // };
    return {
      accessorKey: key,
      header: key
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase()),
      cell: ({ row }: { row: Row<T> }) => {
        const cellValue = row.getValue(key);
  
        // Check if the value is a number
        if (typeof cellValue === "number") {
          return <div>{cellValue}</div>;  // Display the number directly
        }
  
        // Check if it's a valid string (e.g., it could be text, etc.)
        if (typeof cellValue === "string") {
          const truncatedValue = truncateText(cellValue, 50);
          return (
            <div
              className="truncate max-w-xs"
              dangerouslySetInnerHTML={{ __html: truncatedValue }}
            />
          );
        }
  
        // If it's any other type (null, undefined, etc.), show a fallback message
        return <div>Invalid data</div>;
      },
    };
  });

  // Add default actions column
  const columns: ColumnDef<T>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    ...inferredColumns,
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>
                <Link
                  href={`${baseUrl || `/dashboard/${title.toLowerCase()}`}/${
                    row.original.slug?.length > 0
                      ? row.original.slug
                      : String(row.original.id)
                  }`}
                  className="w-full flex items-center gap-2 hover:text-green-500 transition-all duration-100 ease-linear"
                >
                  <Eye className="size-4" />
                  View
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  href={`${baseUrl || `/dashboard/${title.toLowerCase()}`}/${
                    row.original.slug?.length > 0
                      ? row.original.slug
                      : row.original.id
                  }/edit`}
                  className="w-full flex items-center gap-2 hover:text-blue-500 transition-all duration-100 ease-linear"
                >
                  <SquarePen className="size-4" />
                  Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div
                  onClick={() => handleDelete(row.original.id)}
                  className="text-red-600 w-full cursor-pointer flex items-center gap-2 hover:text-red-600 transition-all duration-200 ease-linear"
                >
                  <Trash2 className="size-4" />
                  Delete
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <ConfirmDeleteDialog
            isOpen={isConfirmDeleteOpen}
            onClose={() => setIsConfirmDeleteOpen(false)}
            onConfirm={handleConfirmDelete}
          />
        </>
      ),
    },
  ];

  const table = useReactTable({
    data: tableData,
    columns,
    state: { sorting, columnFilters, columnVisibility, rowSelection },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 5 } },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4 justify-between space-x-5">
        <Input
          placeholder={`Filter by name or title...`}
          value={
            (table.getColumn("name")?.getFilterValue() as string) ||
            (table.getColumn("title")?.getFilterValue() as string) ||
            ""
          }
          onChange={(e) => {
            const value = e.target.value;
            if (table.getColumn("name")) {
              table.getColumn("name")?.setFilterValue(value);
            }
            if (table.getColumn("title")) {
              table.getColumn("title")?.setFilterValue(value);
            }
          }}
          className="max-w-sm"
        />
        <div className="flex items-center gap-2 hover:text-green-500 transition-all duration-200 ease-linear">
          <Button
            onClick={() => router.push(addRowUrl)}
            className="flex items-center gap-1"
          >
            <PlusSquare className="" />
            <span className="hidden md:inline-block">Add {title}</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
          {/* <Button
            variant="destructive"
            onClick={deleteSelectedRows}
            disabled={Object.keys(rowSelection).length === 0}
          >
            Delete Selected
          </Button> */}
        </div>
      </div>
      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
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
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
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
                <TableCell colSpan={columns.length} className="text-center">
                  No {title.toLowerCase()} found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between py-4">
        <div className="text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2 flex items-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft />
            <span className="hidden md:inline-block">Previous</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="hidden md:inline-block">Next</span>
            <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TableLayout;
