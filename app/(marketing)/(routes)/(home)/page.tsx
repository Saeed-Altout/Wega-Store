import { Suspense } from "react";
import { HeroSection } from "./_components/hero";
import { ProductsSection } from "./_components/products";

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <Suspense>
        <ProductsSection />
      </Suspense>
    </div>
  );
}
