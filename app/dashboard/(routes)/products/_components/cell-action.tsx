"use client";

import Link from "next/link";
import { useState } from "react";
import { EditIcon, EyeIcon, MoreHorizontal, TrashIcon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import { Product } from "@/lib/generated/client";
import { useDeleteProduct } from "@/services/products/mutation";

import { ProductSheet } from "./product-sheet";
import { AlertModal } from "./alert-modal";

export function CellAction({ data }: { data: Product }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { mutate: deleteProduct, isPending: isDeleting } = useDeleteProduct();

  function onConfirm() {
    deleteProduct(data.id, { onSuccess: () => setIsOpen(false) });
  }

  return (
    <>
      <AlertModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        loading={isDeleting}
        onConfirm={onConfirm}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon-sm">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem asChild>
            <Link href={`/dashboard/products/${data.id}`}>
              <EyeIcon />
              <span>View</span>
            </Link>
          </DropdownMenuItem>
          <ProductSheet initialData={data}>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <EditIcon />
              <span>Edit</span>
            </DropdownMenuItem>
          </ProductSheet>
          <DropdownMenuItem
            variant="destructive"
            onClick={() => setIsOpen(true)}
          >
            <TrashIcon />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
