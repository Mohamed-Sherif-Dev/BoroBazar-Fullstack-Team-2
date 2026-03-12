import type { WishlistItemType } from "../types/wishlist.types";

interface Props {
  item: WishlistItemType;
}

export default function WishlistItem({ item }: Props) {
  return (
    <div className="flex items-center justify-between py-6 border-b">

      <div className="flex gap-4">

        <img
          src={item.image}
          className="w-[60px] h-[60px] object-contain"
        />

        <div>

          <p className="text-xs text-gray-400">{item.brand}</p>

          <h3 className="text-sm font-medium">
            {item.name}
          </h3>

          <div className="text-yellow-400 text-sm">
            ★★★★★
          </div>

          <div className="flex gap-3 mt-1 items-center">

            <span className="text-red-500 font-semibold">
              ${item.price}
            </span>

            <span className="line-through text-gray-400 text-sm">
              ${item.oldPrice}
            </span>

            <span className="text-green-600 text-sm font-medium">
              {item.discount}% OFF
            </span>

          </div>

        </div>

      </div>

      <button className="text-gray-400 hover:text-red-500">
        ✕
      </button>

    </div>
  );
}