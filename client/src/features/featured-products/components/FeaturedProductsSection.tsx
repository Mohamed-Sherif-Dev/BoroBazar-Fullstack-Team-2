import { useFeaturedProducts } from "../hooks/useFeaturedProducts";
import ProductCard from "../../../shared/components/ui/ProductCard";
import SectionHeader from "../../../shared/components/ui/SectionHeader";

export default function FeaturedProductsSection() {
  const { data, loading, error } = useFeaturedProducts();

  if (loading) return <p>Loading featured products...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="w-full bg-white py-6">
      <div className="items-center border-b border-gray-200">
        <SectionHeader
        title="Featured Products"
        subtitle="New products with updated stocks"
        showViewAll={true}
        onViewAll={() => console.log("View all featured products")}
      />
      </div>

      <div className="border border-gray-200 bg-white">
        <div className="">
          <div className="flex w-max min-w-full">
            {data.map((product) => (
              <div
                key={product.id}
                className="w-[160px] shrink-0 border-r border-gray-200 sm:w-[180px] md:w-[190px] lg:w-[210px]">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
