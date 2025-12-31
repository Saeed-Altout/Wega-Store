"use client";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Spinner } from "@/components/ui/spinner";

import { useGetProductsQuery } from "@/services/products/queries";
import { Product } from "@/lib/generated/client";
import { ProductsSection as Products } from "@/components/sections/products-section";

export function ProductsSection() {
  const { data: products, isLoading } = useGetProductsQuery();

  if (isLoading) {
    return (
      <div className="h-[600px] flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  const featuredProducts = products.filter(
    (product: Product) => product.isFeatured
  );

  return (
    <section className="py-10" id="products-section">
      <Container className="space-y-4">
        <Heading title="Products" description="Explore our featured collection">
          <Button variant="link" asChild>
            <Link href="/products">
              More
              <ArrowRightIcon />
            </Link>
          </Button>
        </Heading>

        <Products products={featuredProducts} />
      </Container>
    </section>
  );
}
