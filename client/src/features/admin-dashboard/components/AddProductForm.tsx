import { useState } from "react";
import { ImageUp, Star, X } from "lucide-react";

import type { ProductItem } from "../types/admin-dashboard.types";

type AddProductFormProps = {
  initialData?: ProductItem | null;
  onSave: (product: Omit<ProductItem, 'id' | 'sales'>) => void;
  onClose: () => void;
};



const categories = ["Groceries", "Electronics", "Fashion", "Beauty", "Home"];

export default function AddProductForm({ initialData, onSave, onClose }: AddProductFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    description: "",
    category: initialData?.category || "",
    subCategory: initialData?.subCategory || "",
    price: initialData?.price?.toString() || "",
    oldPrice: initialData?.oldPrice?.toString() || "",
    isFeatured: "",
    stock: initialData?.stock?.toString() || "",
    brand: initialData?.brand || "",
    discount: "",
    rating: initialData?.rating || 1,
    image: null as File | null,
  });

  const [hoveredRating, setHoveredRating] = useState(0);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;

    setFormData((prev) => ({
      ...prev,
      image: file,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSave({
      name: formData.name,
      category: formData.category,
      subCategory: formData.subCategory,
      price: Number(formData.price),
      oldPrice: formData.oldPrice ? Number(formData.oldPrice) : undefined,
      stock: Number(formData.stock),
      brand: formData.brand,
      rating: formData.rating,
      image: formData.image ? URL.createObjectURL(formData.image) : (initialData?.image || "https://picsum.photos/200"),
    });
  };

  const activeRating = hoveredRating || formData.rating;

  return (
    <section className="rounded-sm bg-[#f7f7f7] p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-[26px] font-semibold text-[#4b4b4b]">
          {initialData ? "Edit Product" : "Add Product"}
        </h2>
        
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1 text-gray-400 hover:bg-gray-200 hover:text-gray-600"
            aria-label="Close form"
          >
            <X size={24} />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="border-2 border-[#1e90ff] bg-white p-2">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="mb-1 block text-[11px] text-[#444]">
                Product Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="h-8 w-full border border-[#d9d9d9] px-2 text-[12px] outline-none"
              />
            </div>

            <div>
              <label className="mb-1 block text-[11px] text-[#444]">
                Product Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={6}
                className="w-full resize-none border border-[#d9d9d9] px-2 py-2 text-[12px] outline-none"
              />
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
              <div>
                <label className="mb-1 block text-[11px] text-[#444]">
                  Product Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="h-8 w-full border border-[#d9d9d9] bg-white px-2 text-[12px] outline-none"
                >
                  <option value=""></option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-[11px] text-[#444]">
                  Product Price
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="h-8 w-full border border-[#d9d9d9] px-2 text-[12px] outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-[11px] text-[#444]">
                  Product Old Price
                </label>
                <input
                  type="number"
                  name="oldPrice"
                  value={formData.oldPrice}
                  onChange={handleChange}
                  className="h-8 w-full border border-[#d9d9d9] px-2 text-[12px] outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-[11px] text-[#444]">
                  Is Featured?
                </label>
                <select
                  name="isFeatured"
                  value={formData.isFeatured}
                  onChange={handleChange}
                  className="h-8 w-full border border-[#d9d9d9] bg-white px-2 text-[12px] outline-none"
                >
                  <option value=""></option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
              <div>
                <label className="mb-1 block text-[11px] text-[#444]">
                  Product Stock
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  className="h-8 w-full border border-[#d9d9d9] px-2 text-[12px] outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-[11px] text-[#444]">
                  Product Brand
                </label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  className="h-8 w-full border border-[#d9d9d9] px-2 text-[12px] outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-[11px] text-[#444]">
                  Product Discount
                </label>
                <input
                  type="number"
                  name="discount"
                  value={formData.discount}
                  onChange={handleChange}
                  className="h-8 w-full border border-[#d9d9d9] px-2 text-[12px] outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-[11px] text-[#444]">
                  Product Sub Category
                </label>
                <input
                  type="text"
                  name="subCategory"
                  value={formData.subCategory}
                  onChange={handleChange}
                  className="h-8 w-full border border-[#d9d9d9] px-2 text-[12px] outline-none"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-[11px] text-[#444]">
                Product Rating
              </label>

              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, index) => {
                  const starValue = index + 1;
                  const isActive = starValue <= activeRating;

                  return (
                    <button
                      key={starValue}
                      type="button"
                      onMouseEnter={() => setHoveredRating(starValue)}
                      onMouseLeave={() => setHoveredRating(0)}
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          rating: starValue,
                        }))
                      }
                      className="p-0"
                    >
                      <Star
                        size={15}
                        className={
                          isActive
                            ? "fill-[#f4b400] text-[#f4b400]"
                            : "text-[#cfcfcf]"
                        }
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <h3 className="mb-2 text-[18px] font-semibold text-[#4b4b4b]">
            Media & Images
          </h3>

          <label className="flex h-[95px] w-[95px] cursor-pointer flex-col items-center justify-center rounded border border-[#e3e3e3] bg-[#fafafa] text-[#a0a0a0]">
            <ImageUp size={24} strokeWidth={1.8} />
            <span className="mt-2 text-[10px]">Image Upload</span>
            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
          </label>

          {formData.image && (
            <p className="mt-2 text-[11px] text-gray-500">{formData.image.name}</p>
          )}
        </div>

        <div className="mt-8">
          <button
            type="submit"
            className="h-11 min-w-[185px] rounded bg-[#11b886] px-6 text-[14px] font-medium text-white transition hover:bg-[#0fa679]"
          >
            {initialData ? "Update Product" : "Publish and view"}
          </button>
        </div>
      </form>
    </section>
  );
}