type Product = {
  id: string;
  title: string;
  image: string;
  price: number;
  oldPrice?: number;
  rating?: number;
};

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const fullStars = Math.floor(product.rating ?? 4);

  return (
    <div className="flex h-full min-h-[300px] flex-col bg-white px-3 py-4 sm:min-h-[320px] sm:px-4 sm:py-5">
      <div className="mb-3 flex h-[110px] items-center justify-center sm:mb-4 sm:h-[130px] md:h-[140px]">
        <img
          src={product.image}
          alt={product.title}
          className="max-h-full w-auto object-contain"
        />
      </div>

      <h3 className="min-h-[40px] text-[13px] font-medium leading-5 text-[#3d3d3d] sm:min-h-[44px] sm:text-[14px]">
        {product.title}
      </h3>

      <div className="mt-2 flex items-center gap-[2px] text-[13px] sm:text-[14px]">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={star <= fullStars ? "text-[#f4b400]" : "text-[#d1d5db]"}
          >
            ★
          </span>
        ))}
      </div>

      <div className="mt-2 flex items-center gap-2 sm:gap-3">
        <span className="text-[16px] font-semibold text-[#e53935] sm:text-[18px]">
          ${product.price.toFixed(2)}
        </span>

        <span className="text-[12px] text-[#9ca3af] line-through sm:text-[13px]">
          ${(product.oldPrice ?? product.price).toFixed(2)}
        </span>
      </div>

      <button className="mt-3 h-[34px] w-full rounded-[4px] border border-[#52c7b8] text-[13px] font-medium text-[#20b6a4] transition hover:bg-[#20b6a4] hover:text-white sm:mt-4 sm:h-[36px] sm:text-[14px]">
        Add to Cart
      </button>
    </div>
  );
}