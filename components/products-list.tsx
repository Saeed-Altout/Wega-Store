import { Product } from "@/lib/generated/client";
import { ProductCard } from "@/components/cards/product-card";

export function ProductsList({ products }: { products: Product[] }) {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
