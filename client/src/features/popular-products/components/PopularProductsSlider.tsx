import { useState } from "react";
import { usePopularProducts } from "../hooks/usePopularProducts";
import ProductCard from "../../../shared/components/ui/ProductCard";
import SectionHeader from "../../../shared/components/ui/SectionHeader";

export default function PopularProductsSlider() {
  const { data, loading, error } = usePopularProducts();
  const [activeCategory, setActiveCategory] = useState("Breads & Bakery");

  const categories = [
    "Breads & Bakery",
    "Breakfast & Dairy",
    "Meats & Seafood",
    "Fruits & Vegetables",
  ];

  if (loading) return <p>Loading popular products...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="w-full bg-white py-6 ">
      <div className=" items-center border-b border-gray-200">
        <SectionHeader
          title="Popular Products"
          subtitle="Do not miss the current offers"
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
      </div>
      <div className="border border-gray-200 bg-white">
        <div className="">
          <div className="flex min-w-max">
            {data.map((product) => (
              <div
                key={product.id}
                className="w-[160px] shrink-0 border-r border-gray-200 sm:w-[180px] md:w-[190px] lg:w-[210px]"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}