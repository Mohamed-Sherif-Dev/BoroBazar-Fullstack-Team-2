import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { getFProducts } from "../../services/productService";
import type { Product } from "../../types/product";

export default function FProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFProducts()
      .then((data) => setProducts(data))
      .catch(() => {
        // Fallback mock data when API is unavailable
        setProducts(getMockFeaturedProducts());
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="featured-products" className="mt-10 mb-12">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-heading">
            Featured Products
          </h2>
          <p className="text-xs text-body mt-1">
            Hand-picked products just for you
          </p>
        </div>

        <a
          href="#"
          id="featured-view-all"
          className="text-sm font-medium text-primary hover:text-primary-700 transition-colors flex items-center gap-1"
        >
          View All
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </a>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-[280px] rounded-xl bg-gray-100 animate-pulse"
            ></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

/* =====================
   Mock Data (fallback)
===================== */

function getMockFeaturedProducts(): Product[] {
  return [
    {
      id: 101,
      name: "100 Percent Apple Juice",
      price: 25.99,
      oldPrice: 30.99,
      image: "",
      unit: "64 fl oz Bottle",
    },
    {
      id: 102,
      name: "100 Percent Apple Juice",
      price: 22.89,
      oldPrice: 28.99,
      image: "",
      unit: "64 fl oz Bottle",
    },
    {
      id: 103,
      name: "100 Percent Apple Juice",
      price: 18.99,
      oldPrice: 24.99,
      image: "",
      unit: "64 fl oz Bottle",
    },
    {
      id: 104,
      name: "100 Percent Apple Juice",
      price: 15.50,
      image: "",
      unit: "64 fl oz Bottle",
    },
    {
      id: 105,
      name: "100 Percent Apple Juice",
      price: 29.99,
      oldPrice: 35.99,
      image: "",
      unit: "64 fl oz Bottle",
    },
    {
      id: 106,
      name: "100 Percent Apple Juice",
      price: 12.99,
      oldPrice: 18.99,
      image: "",
      unit: "64 fl oz Bottle",
    },
  ];
}