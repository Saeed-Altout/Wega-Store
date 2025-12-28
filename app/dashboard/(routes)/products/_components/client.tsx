"use client";
import { PlusIcon } from "lucide-react";

import { columns } from "./columns";
import { ProductSheet } from "./product-sheet";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { DataTable } from "@/components/ui/data-table";
import { useGetProductsQuery } from "@/services/products/queries";

export function ProductsClientPage() {
  const { data } = useGetProductsQuery();

  return (
    <div className="px-4 lg:px-6">
      <Heading
        title="Products"
        description="Explore all products in your store."
      >
        <ProductSheet>
          <Button className="w-full md:w-auto">
            <PlusIcon /> Add New Product
          </Button>
        </ProductSheet>
      </Heading>
      <DataTable data={data ?? []} columns={columns} searchKey="title" />
    </div>
  );
}
