import React from "react";
import { X, Star } from "lucide-react";

interface WishlistItem {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice: number;
  discount: string;
  quantity: number;
  rating: number;
  image: string;
}

interface Props {
  items?: WishlistItem[];
}

const WishlistItemComponent = ({ item }: { item: WishlistItem }) => (
  <div className="relative p-6 border-b border-gray-200 last:border-0 flex gap-6 items-start">

    {/* Product Image */}
    <div className="w-[80px] h-[100px] flex-shrink-0 flex items-center justify-center">
      <img src={item.image} alt={item.name} className="max-w-full max-h-full object-contain" />
    </div>

    {/* Product Details */}
    <div className="flex-1 min-w-0 pr-8">
      <p className="text-[13px] text-gray-400 mb-1">{item.brand}</p>
      <h3 className="text-[15px] font-medium text-gray-800 leading-tight mb-2">
        {item.name}
      </h3>

      {/* Star Rating */}
      <div className="flex items-center gap-[2px] mb-3">
        {[...Array(item.rating)].map((_, i) => (
          <Star key={i} size={14} className="text-[#ffc107] fill-[#ffc107]" />
        ))}
      </div>

      {/* Price & Discount Row */}
      <div className="flex items-center gap-4 flex-wrap">
        <span className="text-[16px] font-bold text-[#e53e3e]">
          ${item.price.toFixed(2)}
        </span>
        <span className="text-[14px] font-medium text-gray-400 line-through">
          ${item.originalPrice.toFixed(2)}
        </span>
        <span className="text-[13px] font-bold text-[#00b589]">
          {item.discount}
        </span>
      </div>
    </div>

    {/* Remove Button (Absolute top right) */}
    <button
      className="absolute top-6 right-6 text-gray-800 hover:text-red-500 transition-colors"
      title="Remove from wishlist"
    >
      <X size={20} strokeWidth={1.5} />
    </button>
  </div>
);

export default function WishlistList({ items }: Props) {
  return (
    <div className="flex flex-col">
      {/* Header of the List Card */}
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-[22px] font-semibold text-gray-800 mb-1">
          My Wishlist
        </h1>
        <p className="text-[14px] text-gray-500">
          There are {items?.length || 0} products in your wishlist
        </p>
      </div>

      {/* Items Loop */}
      <div className="flex flex-col">
        {items?.map((item) => (
          <WishlistItemComponent key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}