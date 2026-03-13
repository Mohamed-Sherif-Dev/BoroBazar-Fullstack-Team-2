import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Zap, Flame } from "lucide-react";
import type { IProduct } from "@/types/product";
import { Link } from "react-router-dom";

export default function ProductCard({ product }: { product: IProduct }) {
  // convert rating to 5-star system
  const fullStars = Math.floor(product.rating || 0);
  const emptyStars = 5 - fullStars;

  return (
    <Card className="group w-full ring-0 rounded-xl border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full flex flex-col overflow-hidden bg-white">
      <Link to={`/products/${product._id}`} className="flex-1 relative">
        {/* Status Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
          {product.isFeatured && (
            <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-none px-2 py-0.5 text-[10px] font-bold uppercase flex items-center gap-1">
              <Zap size={10} fill="currentColor" />
              Featured
            </Badge>
          )}
          {product.isPopular && (
            <Badge className="bg-rose-100 text-rose-700 hover:bg-rose-100 border-none px-2 py-0.5 text-[10px] font-bold uppercase flex items-center gap-1">
              <Flame size={10} fill="currentColor" />
              Popular
            </Badge>
          )}
        </div>

        <CardContent className="p-5">
          {/* product image */}
          <div className="flex justify-center mb-5 h-44 group-hover:scale-105 transition-transform duration-500 ease-out">
            <img
              src={product.image || product?.images?.[0]}
              alt={product.name}
              className="h-full object-contain"
            />
          </div>

          {/* product details */}
          <div className="space-y-2">
            {/* Category */}
            <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider block">
              {product.category?.name || "General"}
            </span>

            <h3 className="font-bold text-base text-gray-800 leading-snug line-clamp-2 h-10 group-hover:text-emerald-700 transition-colors">
              {product.name}
            </h3>

            {/* rating system */}
            <div className="flex items-center gap-0.5 text-yellow-400 py-1">
              {/* full stars */}
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={14} 
                  fill={i < fullStars ? "currentColor" : "none"} 
                  className={i < fullStars ? "" : "text-gray-200"} 
                />
              ))}
              <span className="text-[10px] text-gray-400 ml-1.5 font-medium">({product.reviewsCount || 0})</span>
            </div>

            {/* prices */}
            <div className="flex items-center justify-between gap-2 pt-1">
              <div className="flex flex-col">
                <span className="text-xl font-extrabold text-gray-900">${product.price.toFixed(2)}</span>
                {product.oldPrice && (
                  <span className="text-xs text-gray-400 line-through font-medium">
                    ${product.oldPrice.toFixed(2)}
                  </span>
                )}
              </div>
              
              {product.oldPrice && (
                <Badge variant="outline" className="text-[10px] border-emerald-100 text-emerald-700 bg-emerald-50/50 font-bold">
                  Save ${ (product.oldPrice - product.price).toFixed(2) }
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Link>

      <CardFooter className="p-5 pt-0 border-none mt-auto">
        <Button
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-5 text-sm rounded-lg transition-all active:scale-[0.98] shadow-sm hover:shadow-emerald-200"
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
