import HeroSection from "../components/hero/HeroSection";
import TopCategories from "../components/categories/TopCategories";
import PopularProducts from "../components/products/PopularProducts";
import FeaturedProducts from "../components/products/FProducts";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* 
        Main content container with responsive padding 
        matching the Figma design layout
      */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 pb-20">
        {/* Banner Section */}
        <HeroSection />

        {/* Top Categories Grid */}
        <TopCategories />

        {/* Popular Products Slider */}
        <PopularProducts />

        {/* Banner Grid (Optional/Future - shown in design but not requested yet) */}

        {/* Featured Products Grid */}
        <FeaturedProducts />

        {/* Section specific to Breakfast & Dairy */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-heading">Breakfast & Dairy</h2>
            <a href="#" className="text-sm font-medium text-body hover:text-primary transition-colors flex items-center gap-1">
              View All
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </a>
          </div>
          <FeaturedProducts />
        </div>
      </main>
    </div>
  );
}