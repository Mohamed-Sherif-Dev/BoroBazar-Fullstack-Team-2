import { heroData } from "../data/hero.data";

export function HeroBanner() {
  return (
    <section className="w-full bg-[#f3f1ee] rounded-md border border-blue-300 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 md:py-16 grid grid-cols-1 md:grid-cols-2 items-center gap-8">
        
        <div>
          <span className="inline-block bg-green-200 text-green-800 text-sm px-3 py-1 rounded-md mb-4">
            Weekend Discount
          </span>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight text-gray-800 mb-4">
            Get the best quality products at the lowest prices
          </h1>

          <p className="text-gray-600 text-base md:text-lg mb-6 max-w-lg">
            We have prepared special discounts for you on organic breakfast
            products.
          </p>

          <div className="flex items-center gap-4 flex-wrap">
            <button className="bg-green-500 hover:bg-green-600 text-white font-medium px-6 py-3 rounded-md">
              Shop Now →
            </button>

            <div>
              <span className="text-red-500 text-3xl font-bold mr-2">$21.67</span>
              <span className="text-gray-400 line-through text-lg">$59.99</span>
              <p className="text-xs text-gray-400">Don’t miss this limited time offer.</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center md:justify-end">
          <img
            src={heroData.image }
            alt="Organic products"
            className="max-h-[500px] w-auto object-contain"
          />
        </div>
      </div>
    </section>
  );
}