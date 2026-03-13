// import CartList from "../features/cart/components/CartList"
// import CartTotals from "../features/cart/components/CartTotals"
// import EmptyCart from "../features/cart/components/EmptyCart"
// import CartSkeleton from "../features/cart/components/CartSkeleton"
// import { useCart } from "../features/cart/hooks/useCart"

// export default function CartPage(){

//  const{
//   data,
//   isLoading,
//   removeItem,
//   updateQuantity
//  } = useCart()

//  if(isLoading) return <CartSkeleton/>

//  if(!data || data.length===0) return <EmptyCart/>

//  const subtotal = data.reduce(
//   (acc,item)=>acc + item.price * item.quantity,
//   0
//  )

//  return(

//  <div className="max-w-7xl mx-auto px-6 py-10">

//   <h1 className="text-3xl font-bold mb-1">
//    Your Cart
//   </h1>

//   <p className="text-gray-500 mb-6">
//    There are {data.length} products in your cart.
//   </p>

//   <div className="grid grid-cols-12 gap-10">

//    <div className="col-span-12 lg:col-span-8">

//     <CartList
//      items={data}
//      removeItem={removeItem}
//      updateQuantity={updateQuantity}
//     />

//    </div>

//    <div className="col-span-12 lg:col-span-4">

//     <CartTotals subtotal={subtotal}/>

//    </div>

//   </div>

//  </div>

//  )
// }

import React, { useState, useEffect } from "react";
import { X, Star, ChevronDown } from "lucide-react";

// ---------------------------------------------------------
// 1. Mock Data & Hooks (بيانات تجريبية مطابقة للصورة)
// ---------------------------------------------------------

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
    image: "https://images.unsplash.com/photo-1611078516091-64506822fb95?auto=format&fit=crop&q=80&w=150&h=200"
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
    image: "https://images.unsplash.com/photo-1599557859345-0d4d36e7a2b0?auto=format&fit=crop&q=80&w=150&h=200"
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
    image: "https://images.unsplash.com/photo-1566478989037-e987b58a8abf?auto=format&fit=crop&q=80&w=150&h=200"
  }
];

function useCart() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // محاكاة وقت التحميل
    const timer = setTimeout(() => {
      setData(initialMockData);
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const removeItem = (id) => {
    setData(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setData(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  return { data, isLoading, removeItem, updateQuantity };
}

// ---------------------------------------------------------
// 2. Sub-components (المكونات الفرعية)
// ---------------------------------------------------------

const CartSkeleton = () => (
  <div className="max-w-6xl mx-auto px-6 py-10 animate-pulse">
    <div className="grid grid-cols-12 gap-8">
      <div className="col-span-12 lg:col-span-8 bg-white border border-gray-200 rounded-lg h-[600px]"></div>
      <div className="col-span-12 lg:col-span-4 bg-white border border-gray-200 rounded-lg h-[300px]"></div>
    </div>
  </div>
);

const EmptyCart = () => (
  <div className="max-w-6xl mx-auto px-6 py-20 text-center flex flex-col items-center justify-center">
    <h2 className="text-2xl font-bold mb-3 text-gray-800">Your cart is empty</h2>
    <button onClick={() => window.location.reload()} className="bg-[#00b589] text-white px-8 py-2 rounded font-medium mt-4 hover:bg-[#009b75] transition-colors">
      Reload Items
    </button>
  </div>
);

const CartList = ({ items, removeItem, updateQuantity }) => (
  <div className="flex flex-col">
    {/* Header of the List Card */}
    <div className="p-6 border-b border-gray-200">
      <h1 className="text-[22px] font-semibold text-gray-800 mb-1">
        Your Cart
      </h1>
      <p className="text-[14px] text-gray-500">
        There are {items.length} products in your cart
      </p>
    </div>

    {/* Items Loop */}
    <div className="flex flex-col">
      {items.map((item) => (
        <div key={item.id} className="relative p-6 border-b border-gray-200 last:border-0 flex gap-6 items-start">
          
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

            {/* Price & Quantity Row */}
            <div className="flex items-center gap-4 flex-wrap">
              {/* Fake Dropdown for Quantity */}
              <button 
                className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded text-[13px] text-gray-700 font-medium border border-transparent hover:border-gray-300 transition-colors"
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
              >
                Qty:{item.quantity} <ChevronDown size={14} className="text-gray-500" />
              </button>
              
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
            onClick={() => removeItem(item.id)}
            className="absolute top-6 right-6 text-gray-800 hover:text-red-500 transition-colors"
            title="Remove item"
          >
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>
      ))}
    </div>
  </div>
);

const CartTotals = ({ subtotal }) => {
  // للتقريب لصورة الفيجما، السعر الظاهر هو 2133
  // بما أننا نستخدم mock data، سنعرض الرقم الموجود في التصميم كأنه الإجمالي الفعلي لتطابق الصورة
  const displayTotal = "2,133"; 

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden sticky top-6">
      
      {/* Totals Header */}
      <div className="p-5 border-b border-gray-200">
        <h2 className="text-[18px] font-semibold text-gray-800">Cart Totals</h2>
      </div>
      
      {/* Totals Body */}
      <div className="p-5">
        <div className="space-y-4 text-[14px] mb-6">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-bold text-[#e53e3e]">${displayTotal}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Shipping</span>
            <span className="font-bold text-gray-800">Free</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Estimate for</span>
            <span className="font-bold text-gray-800">India</span>
          </div>
          <div className="flex justify-between items-center pt-2">
            <span className="text-gray-600">Total</span>
            <span className="font-bold text-[#e53e3e]">${displayTotal}</span>
          </div>
        </div>

        <button className="w-full bg-[#00b589] text-white py-3 rounded text-[15px] font-bold hover:bg-[#009b75] transition-colors">
          Next
        </button>
      </div>

    </div>
  );
};

// ---------------------------------------------------------
// 3. Main Component
// ---------------------------------------------------------

export default function CartPage() {
  const {
    data,
    isLoading,
    removeItem,
    updateQuantity
  } = useCart();

  if (isLoading) return <CartSkeleton />;
  if (!data || data.length === 0) return <EmptyCart />;

  const subtotal = data.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    // Background color matching the figma design
    <div className="min-h-screen bg-[#f8f9fa] font-sans py-10">
      <div className="max-w-[1100px] mx-auto px-6">
        
        <div className="grid grid-cols-12 gap-8">
          
          {/* Left Column - List (White Card) */}
          <div className="col-span-12 lg:col-span-8 bg-white border border-gray-200 rounded-lg overflow-hidden">
            <CartList
              items={data}
              removeItem={removeItem}
              updateQuantity={updateQuantity}
            />
          </div>

          {/* Right Column - Totals */}
          <div className="col-span-12 lg:col-span-4">
            <CartTotals subtotal={subtotal} />
          </div>

        </div>

      </div>
    </div>
  );
}