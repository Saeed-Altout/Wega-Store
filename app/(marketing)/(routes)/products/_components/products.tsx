"use client";

import { Container } from "@/components/ui/container";
import { Spinner } from "@/components/ui/spinner";
import { ProductsSection as Products } from "@/components/sections/products-section";

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
    <section className="py-10" id="products-section">
      <Container>
        <Products products={products} />
      </Container>
    </section>
  );
}
