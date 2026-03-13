import { useEffect, useState, useRef } from "react";
import ProductCard from "./ProductCard";
import { getPopularProducts } from "../../services/productService";
import type { Product } from "../../types/product";

const CATEGORIES = [
  "Breads & Bakery",
  "Biscuits & Snacks",
  "Breakfast & Dairy",
  "Meats & Seafood",
  "Fruits & Vegetables",
];

export default function PopularProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState("Breads & Bakery");
  const [loading, setLoading] = useState(true);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getPopularProducts()
      .then((data) => setProducts(data))
      .catch(() => {
        setProducts(getMockPopularProducts());
      })
      .finally(() => setLoading(false));
  }, []);

  const scrollSlider = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const scrollAmount = sliderRef.current.clientWidth * 0.8;
      sliderRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="popular-products" className="mt-12 mb-10">
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8 pb-4 border-b border-gray-100">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-heading">
            Popular Products
          </h2>
          <p className="text-xs text-body mt-1">
            Do not miss the current offers
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-sm font-medium px-4 py-2 border-b-2 transition-all whitespace-nowrap ${activeCategory === cat
                  ? "border-primary text-primary"
                  : "border-transparent text-body hover:text-heading"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products Slider */}
      <div className="relative group">
        {/* Navigation Buttons */}
        <button
          onClick={() => scrollSlider("left")}
          className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white shadow-xl rounded-full flex items-center justify-center text-heading hover:bg-primary hover:text-white transition-all opacity-0 group-hover:opacity-100 border border-gray-100"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        <button
          onClick={() => scrollSlider("right")}
          className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white shadow-xl rounded-full flex items-center justify-center text-heading hover:bg-primary hover:text-white transition-all opacity-0 group-hover:opacity-100 border border-gray-100"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>

        {/* Slider Track */}
        <div
          ref={sliderRef}
          className="slider-container flex gap-5 overflow-x-auto"
        >
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="min-w-[220px] aspect-[4/5] rounded-xl bg-gray-50 animate-pulse"
              ></div>
            ))
            : products.map((product) => (
              <div
                key={product.id}
                className="min-w-[220px] max-w-[240px] flex-shrink-0"
              >
                <ProductCard product={product} />
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}

function getMockPopularProducts(): Product[] {
  return Array.from({ length: 8 }).map((_, i) => ({
    id: i + 1,
    name: "100 Percent Apple Juice – 64 fl oz Bottle",
    price: 25.99,
    oldPrice: 38.10,
    image: "",
    unit: "64 fl oz Bottle",
    rating: 4,
  }));
}