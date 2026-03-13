import type { Product } from "../../types/product";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  // Mock rating for demo
  const rating = product.rating || 4;

  return (
    <div
      id={`product-card-${product.id}`}
      className="product-card-shadow rounded-xl bg-white border border-gray-100 overflow-hidden group cursor-pointer h-full flex flex-col"
    >
      {/* Image Container */}
      <div className="relative w-full aspect-square overflow-hidden bg-white flex items-center justify-center p-4">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
        ) : (
          <div className="placeholder-img w-full h-full rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Rating */}
        <div className="flex items-center gap-0.5 mb-2">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`h-3 w-3 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
                }`}
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>

        {/* Name */}
        <h3 className="text-sm text-heading font-semibold leading-relaxed line-clamp-2 min-h-[2.5rem] mb-1">
          {product.name}
        </h3>

        {/* Unit / Description */}
        <p className="text-[12px] text-body mb-4">{product.unit || "64 fl oz Bottle"}</p>

        {/* Price Row */}
        <div className="mt-auto">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-base font-bold text-red-500">
              ${product.price.toFixed(2)}
            </span>
            {product.oldPrice && (
              <span className="text-xs text-gray-400 line-through">
                ${product.oldPrice.toFixed(2)}
              </span>
            )}
          </div>

          <button
            id={`add-to-cart-${product.id}`}
            className="w-full btn-cart py-2 rounded-lg text-sm font-semibold transition-all border border-primary text-primary hover:bg-primary hover:text-white"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}