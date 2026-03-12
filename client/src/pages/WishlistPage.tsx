import React, { useState, useEffect } from "react";

import AccountSidebar from "../components/account/AccountSidebar";
import WishlistList from "../features/wishlist/components/WishlistList";

// Mock data
const initialMockData = [
  {
    id: 1,
    name: "Fortune Sunlite Refined Sunflower Oil 1 L",
    brand: "Fortune",
    price: 25.99,
    originalPrice: 38.10,
    discount: "14% OFF",
    quantity: 1,
    rating: 5,
    image: "https://images.unsplash.com/photo-1628157588553-5eeea00af15c?auto=format&fit=crop&q=80&w=150&h=200"
  },
  {
    id: 2,
    name: "Chyavanprashad With No Added Sugar 900 gm",
    brand: "Zandu",
    price: 25.99,
    originalPrice: 38.10,
    discount: "14% OFF",
    quantity: 1,
    rating: 5,
    image: "https://images.unsplash.com/photo-1628157588553-5eeea00af15c?auto=format&fit=crop&q=80&w=150&h=200"
  },
  {
    id: 3,
    name: "Gemini Refined Sunflower Oil 1 L",
    brand: "Gemini",
    price: 25.99,
    originalPrice: 38.10,
    discount: "14% OFF",
    quantity: 1,
    rating: 5,
    image: "https://images.unsplash.com/photo-1628157588553-5eeea00af15c?auto=format&fit=crop&q=80&w=150&h=200"
  },
  {
    id: 4,
    name: "Lay's American Style Cream & Onion Potato Chips 82 g",
    brand: "Lay's",
    price: 25.99,
    originalPrice: 38.10,
    discount: "14% OFF",
    quantity: 1,
    rating: 5,
    image: "https://images.unsplash.com/photo-1628157588553-5eeea00af15c?auto=format&fit=crop&q=80&w=150&h=200"
  }
];

function useWishlist() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setData(initialMockData);
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const removeItem = (id: number) => {
    setData((prev) => prev.filter((item) => item.id !== id));
  };

  return { data, isLoading, removeItem };
}

const WishlistSkeleton = () => (
  <div className="max-w-[1100px] mx-auto px-6 py-10 animate-pulse">
    <div className="grid grid-cols-12 gap-8">
      <div className="col-span-12 lg:col-span-4 bg-white border border-gray-100 rounded-xl h-[400px]"></div>
      <div className="col-span-12 lg:col-span-8 bg-white border border-gray-100 rounded-xl h-[500px]"></div>
    </div>
  </div>
);

export default function WishlistPage() {
  const { data, isLoading, removeItem } = useWishlist();

  if (isLoading) return <WishlistSkeleton />;

  return (
    <div className="min-h-screen bg-[#f8f9fa] py-10 px-4">
      <div className="max-w-[1100px] mx-auto">
        <div className="grid grid-cols-12 gap-8 items-start">
          <div className="col-span-12 lg:col-span-4 sticky top-6">
            <AccountSidebar />
          </div>
          <div className="col-span-12 lg:col-span-8">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
              <WishlistList items={data} onRemove={removeItem} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}