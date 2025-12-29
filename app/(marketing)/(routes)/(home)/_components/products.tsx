"use client";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Spinner } from "@/components/ui/spinner";

import { ProductsList } from "@/components/products-list";
import { useGetProductsQuery } from "@/services/products/queries";
import { Product } from "@/lib/generated/client";

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
    <section>
      <Container>
        <div className="py-10">
          <Heading
            title="Products"
            description="Explore our featured collection"
          >
            <Button variant="link" asChild>
              <Link href="/products">
                More
                <ArrowRightIcon />
              </Link>
            </Button>
          </Heading>

          <ProductsList products={featuredProducts} />
        </div>
      </Container>
    </section>
  );
}
