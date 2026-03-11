import FeaturedProductsSection from "../features/featured-products/components/FeaturedProductsSection";
import { HeroBanner } from "../features/hero/components/HeroBanner";
import PopularProductsSlider from "../features/popular-products/components/PopularProductsSlider";

export default function HomePage() {
  return (
    <main className="overflow-x-hidden">
      <HeroBanner />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">      
        <PopularProductsSlider />
        <FeaturedProductsSection />
      </div>

    </main>
  );
}