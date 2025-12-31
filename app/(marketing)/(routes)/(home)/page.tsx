import { BrandSection } from "./_components/brand-section";
import { HeroSection } from "./_components/hero";
import { ProductsSection } from "./_components/products-section";

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <BrandSection />
      <ProductsSection />
    </div>
  );
}
