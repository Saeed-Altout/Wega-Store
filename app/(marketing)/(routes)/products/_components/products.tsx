"use client";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Spinner } from "@/components/ui/spinner";

import { ProductsList } from "@/components/products-list";
import { useGetProductsQuery } from "@/services/products/queries";

export function ProductsSection() {
  const { data: products, isLoading } = useGetProductsQuery();

  if (isLoading) {
    return (
      <div className="h-[600px] flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <section>
      <Container>
        <div className="py-10">
          <Heading title="Products" description="Explore our collection" />
          <ProductsList products={products} />
        </div>
      </Container>
    </section>
  );
}
