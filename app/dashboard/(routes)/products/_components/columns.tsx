"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import { Currency } from "@/components/ui/currency";
import { Badge } from "@/components/ui/badge";

import { Product } from "@/lib/generated/client";
import { CellAction } from "./cell-action";

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      return <Currency value={+row.original.price} />;
    },
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      return <p className="capitalize">{row.original.category}</p>;
    },
  },
  {
    accessorKey: "isFeatured",
    header: "Featured",
    cell: ({ row }) => {
      return (
        <Badge variant={row.original.isFeatured ? "featured" : "outline"}>
          {row.original.isFeatured ? "Featured" : "Not Featured"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      const createdAt = row.original.createdAt;
      return format(createdAt, "PPP");
    },
  },
  {
    accessorKey: "id",
    header: "Actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
