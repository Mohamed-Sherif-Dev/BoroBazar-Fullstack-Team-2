// import React, { useState, useEffect } from "react";
// import AccountSidebar from "../../../components/account/AccountSidebar";
// import WishlistList from "../components/WishlistList";

// // Mock data for wishlist items
// const initialMockData = [
//   {
//     id: 1,
//     name: "Fortune Sunlite Refined Sunflower Oil 1 L",
//     brand: "Fortune",
//     price: 25.99,
//     originalPrice: 38.10,
//     discount: "14% OFF",
//     quantity: 1,
//     rating: 5,
//     image: "https://images.unsplash.com/photo-1628157588553-5eeea00af15c?auto=format&fit=crop&q=80&w=150&h=200"
//   },
//   {
//     id: 2,
//     name: "Chyavanprashad With No Added Sugar 900 gm",
//     brand: "Zandu",
//     price: 25.99,
//     originalPrice: 38.10,
//     discount: "14% OFF",
//     quantity: 1,
//     rating: 5,
//     image: "https://images.unsplash.com/photo-1628157588553-5eeea00af15c?auto=format&fit=crop&q=80&w=150&h=200"
//   },
//   {
//     id: 3,
//     name: "Gemini Refined Sunflower Oil 1 L",
//     brand: "Gemini",
//     price: 25.99,
//     originalPrice: 38.10,
//     discount: "14% OFF",
//     quantity: 1,
//     rating: 5,
//     image: "https://images.unsplash.com/photo-1628157588553-5eeea00af15c?auto=format&fit=crop&q=80&w=150&h=200"
//   },
//   {
//     id: 4,
//     name: "Lay's American Style Cream & Onion Potato Chips 82 g",
//     brand: "Lay's",
//     price: 25.99,
//     originalPrice: 38.10,
//     discount: "14% OFF",
//     quantity: 1,
//     rating: 5,
//     image: "https://images.unsplash.com/photo-1628157588553-5eeea00af15c?auto=format&fit=crop&q=80&w=150&h=200"
//   }
// ];

// function useWishlist() {
//   const [data, setData] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     // Simulate loading time
//     const timer = setTimeout(() => {
//       setData(initialMockData);
//       setIsLoading(false);
//     }, 800);
//     return () => clearTimeout(timer);
//   }, []);

//   const removeItem = (id) => {
//     setData(prev => prev.filter(item => item.id !== id));
//   };

//   return { data, isLoading, removeItem };
// }

// // Skeleton component for loading state
// const WishlistSkeleton = () => (
//   <div className="max-w-6xl mx-auto px-6 py-10 animate-pulse">
//     <div className="grid grid-cols-12 gap-8">
//       <div className="col-span-12 lg:col-span-8 bg-white border border-gray-200 rounded-lg h-[600px]"></div>
//       <div className="col-span-12 lg:col-span-4 bg-white border border-gray-200 rounded-lg h-[300px]"></div>
//     </div>
//   </div>
// );

// // Empty wishlist component
// const EmptyWishlist = () => (
//   <div className="max-w-6xl mx-auto px-6 py-20 text-center flex flex-col items-center justify-center">
//     <h2 className="text-2xl font-bold mb-3 text-gray-800">Your wishlist is empty</h2>
//     <button onClick={() => window.location.reload()} className="bg-[#00b589] text-white px-8 py-2 rounded font-medium mt-4 hover:bg-[#009b75] transition-colors">
//       Reload Items
//     </button>
//   </div>
// );

// export default function WishlistPage() {
//   const { data, isLoading, removeItem } = useWishlist();

//   if (isLoading) return <WishlistSkeleton />;
//   if (!data || data.length === 0) return <EmptyWishlist />;

//   return (
//     <div className="min-h-screen bg-[#f8f9fa] font-sans py-10">
//       <div className="max-w-[1100px] mx-auto px-6">

//         <div className="grid grid-cols-12 gap-8">
// {/* Right Column - Account Sidebar */}
//           <div className="col-span-12 lg:col-span-4">
//             <AccountSidebar />
//           </div>
//           {/* Left Column - Wishlist List (White Card) */}
//           <div className="col-span-12 lg:col-span-8 bg-white border border-gray-200 rounded-lg overflow-hidden">
//             <WishlistList items={data} />
//           </div>

          

//         </div>

//       </div>
//     </div>
//   );
// }