import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";

import { getProducts } from "@/services/products/server";
import { ProductsList } from "@/components/products-list";

export async function ProductsSection() {
  const products = await getProducts();

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
