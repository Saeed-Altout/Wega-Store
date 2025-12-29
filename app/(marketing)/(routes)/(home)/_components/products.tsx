import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";

import { getProducts } from "@/services/products/server";
import { ProductsList } from "@/components/products-list";

export async function ProductsSection() {
  const products = await getProducts();
  const featuredProducts = products.filter((product) => product.isFeatured);

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
