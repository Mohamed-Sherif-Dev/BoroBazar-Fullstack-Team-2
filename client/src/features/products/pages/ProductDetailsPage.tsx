import { useState, useEffect } from 'react';
import { Star, ShoppingCart, Heart, Minus, Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { RelatedProducts } from '../components/RelatedProducts';
import { useProduct } from '../hooks/useProducts';
import { useParams } from 'react-router-dom';

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, isError, error } = useProduct(id || "");
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState<string>("");
  useEffect(() => {
    if (product?.image) {
      setSelectedImage(product.image);
    } else if (product?.images?.[0]) {
      setSelectedImage(product.images[0]);
    }
  }, [product]);

  if (isLoading) {
    return (
      <div className="container mx-auto py-20 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto"></div>
        <p className="mt-4 text-gray-600 font-medium">Loading product details...</p>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="container mx-auto py-20 text-center">
        <p className="text-red-600 font-bold text-xl">Error loading product</p>
        <p className="text-gray-500">{isError ? (error as Error).message : "Product not found"}</p>
      </div>
    );
  }

  const allImages = product.image ? [product.image, ...(product.images || [])] : (product.images || []);

  return (
      <div className="container mx-auto py-10">
          {/* product details */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
        
        {/* display product images */}
        <div className="space-y-4 lg:col-span-2">
          {/* big image */}
          <div className="relative border rounded-sm p-8 bg-white flex justify-center items-center overflow-hidden h-[400px] md:h-[500px]">
            {product.oldPrice && product.price && (
              <Badge className="absolute top-4 left-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-1 px-3">
                {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
              </Badge>
            )}
            <img 
              src={selectedImage} 
              alt={product.name}
              className="max-h-full object-contain transition-all duration-300"
            />
          </div>
          
          {/* small thumbnails */}
          {allImages.length > 1 && (
            <div className="flex justify-center lg:justify-start gap-4 overflow-x-auto pb-2">
              {allImages.map((image, idx) => (
                <div 
                  key={idx} 
                  onClick={() => setSelectedImage(image)}
                  className={`w-20 h-24 border-2 rounded-sm p-2 cursor-pointer bg-white transition-all ${
                    selectedImage === image 
                      ? "border-2 border-emerald-500 shadow-md" 
                      : "border-gray-100 hover:border-emerald-200"
                  }`}
                >
                  <img src={image} alt={`thumbnail-${idx}`} className="w-full h-full object-contain" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* product details */}
        <div className="flex flex-col space-y-6 lg:col-span-3">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-900 leading-tight">
              {product.name}
            </h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">
                Category: <span className="text-gray-900 font-medium">{product.category?.name}</span>
              </span>
              <div className="flex items-center gap-1 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    fill={i < Math.floor(product.rating) ? "currentColor" : "none"} 
                    className={i < Math.floor(product.rating) ? "" : "text-gray-300"} 
                  />
                ))}
                <span className="text-xs text-gray-400 ml-1">Review ({product.reviewsCount || 0})</span>
              </div>
            </div>
          </div>

          <div className="flex items-baseline gap-4">
            <span className="text-3xl font-bold text-red-600">${product.price}</span>
            {product.oldPrice && (
              <span className="text-xl text-gray-400 line-through">${product.oldPrice}</span>
            )}
            <span className="text-emerald-600 text-sm font-medium">
              {product.stock ? `Available In Stock: ${product.stock.toLocaleString()} Items` : "In Stock"}
            </span>
          </div>

          <p className="text-gray-600 leading-relaxed max-w-xl">
            {product.description || "No description available for this product."}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            {/* Increment/Decrement Quantity */}
            <div className="flex items-center border rounded-lg h-12 bg-gray-50 overflow-hidden">
              <button 
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                className="px-4 h-full hover:bg-gray-200 hover:text-emerald-600 transition-colors"
              >
                <Minus size={16} />
              </button>
              <Input 
                type="number" 
                value={quantity} 
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                className="w-14 border-none bg-transparent text-center focus-visible:ring-0 font-bold text-lg"
              />
              <button 
                onClick={() => setQuantity(prev => prev + 1)}
                className="px-4 h-full hover:bg-gray-200 hover:text-emerald-600 transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>

            {/* Buttons */}
            <Button className="bg-emerald-500 hover:bg-emerald-600 h-12 px-10 gap-2 rounded-lg font-bold text-white transition-all active:scale-95">
              <ShoppingCart size={20} />
              Add to Cart
            </Button>
            
            <Button variant="outline" size="icon" className="h-12 w-12 rounded-lg text-gray-400 hover:text-red-500 hover:border-red-200 transition-colors">
              <Heart size={20} />
            </Button>
          </div>
        </div>
          </div>
          {/* related products */}
          <RelatedProducts  />
    </div>
  );
}