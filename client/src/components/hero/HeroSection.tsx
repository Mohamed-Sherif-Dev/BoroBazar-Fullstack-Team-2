import { useState, useEffect } from "react";

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section
      id="hero-banner"
      className="hero-gradient rounded-2xl mt-6 mb-10 overflow-hidden relative"
    >
      <div className="flex flex-col lg:flex-row items-center justify-between px-6 sm:px-10 lg:px-14 py-10 lg:py-16 gap-8">
        {/* ===== Left Content ===== */}
        <div
          className={`max-w-xl z-10 transition-all duration-700 ${isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-6"
            }`}
        >
          {/* Badge */}
          <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-md text-[11px] font-bold tracking-tight mb-6">
            Weekend Discount
          </span>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold leading-[1.1] text-heading tracking-tight mb-6">
            Get the best quality
            <br />
            products at the lowest
            <br />
            prices
          </h1>

          {/* Description */}
          <p className="text-body text-sm sm:text-base mb-10 leading-relaxed max-w-md">
            We have prepared special discounts for you on organic breakfast
            products.
          </p>

          {/* CTA Row */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            <button
              id="hero-shop-now-btn"
              className="bg-[#02b290] hover:bg-[#029a7d] text-white px-8 py-3.5 rounded-lg text-base font-bold flex items-center justify-center gap-2 transition-all transform hover:scale-105 active:scale-95"
            >
              Shop Now
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>

            {/* Price Tag Box */}
            <div className="flex flex-col">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-red-500">
                  $21.67
                </span>
                <span className="text-base text-gray-400 line-through font-medium">$59.99</span>
              </div>
              <p className="text-[11px] text-body mt-1">Don't miss this limited time offer.</p>
            </div>
          </div>
        </div>

        {/* ===== Right Image ===== */}
        <div
          className={`relative w-full lg:w-[540px] h-[300px] sm:h-[350px] lg:h-[400px] transition-all duration-1000 delay-200 ${isVisible
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-12"
            }`}
        >
          {/* Using uploaded hero image if it exists in public/images/hero_img.png */}
          <div className="w-full h-full relative">
            <img
              src="/images/hero_img.png"
              alt="Organic Breakfast"
              className="w-full h-full object-contain"
              onError={(e) => {
                // Fallback if image not found
                (e.target as any).src = "https://placehold.co/600x400/f3f4f6/9ca3af?text=Hero+Image";
              }}
            />
          </div>
        </div>
      </div>

      {/* Decorative patterns */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary-100/10 -skew-x-12 transform translate-x-20"></div>
    </section>
  );
}