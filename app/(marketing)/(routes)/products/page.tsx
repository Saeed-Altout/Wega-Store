import { Suspense } from "react";
import { ProductsSection } from "./_components/products";

export default function ProductsPage() {
  return (
    <div>
      <Suspense>
        <ProductsSection />
      </Suspense>
    </div>
  );
}
