import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ProductCard from "./ProductCard";
import { ArrowRight } from "lucide-react";
import { useProducts } from "../hooks/useProducts";

export function RelatedProducts() {
  const { data: products, isLoading } = useProducts();

  if (isLoading) {
    return (
      <div className="py-12 text-center text-gray-500">
        Loading related products...
      </div>
    );
  }

  const allProducts = products || [];

  return (
    <section className="py-12">
      {/* Header section with View All */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Related Products</h2>
        <a 
          href="/products" 
          className="flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-emerald-600 transition-colors"
        >
          View All <ArrowRight size={16} />
        </a>
      </div>

      {/* Carousel Implementation */}
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {allProducts.map((product) => (
            <CarouselItem 
              key={product._id} 
              className="pl-4 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
            >
              <div className="p-1">
                <ProductCard product={product} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        {/* Optional: Add these if you want manual navigation arrows */}
        <div className="hidden md:block">
          <CarouselPrevious className="-left-12 hover:bg-emerald-50 hover:text-emerald-600" />
          <CarouselNext className="-right-12 hover:bg-emerald-50 hover:text-emerald-600" />
        </div>
      </Carousel>
    </section>
  );
}
