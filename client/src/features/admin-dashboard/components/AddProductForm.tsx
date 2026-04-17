import { useState, useRef } from "react";
import { ImageUp, Star, X, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { useCategories } from "../../../hooks/useCategories";
import { api } from "../../../services/api";

type AddProductFormProps = {
  initialData?: any | null;
  onSave: () => void;
  onClose: () => void;
};

export default function AddProductForm({ initialData, onSave, onClose }: AddProductFormProps) {
  const { data: fetchedCategories = [], isLoading: isLoadingCategories } = useCategories();

  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    description: "",
    category: initialData?.category?._id || initialData?.category || "",
    subCategory: initialData?.subCategory || "",
    price: initialData?.price?.toString() || "",
    oldPrice: initialData?.oldPrice?.toString() || "",
    isFeatured: initialData?.isFeatured ? "true" : "",
    isPopular: initialData?.isPopular ? "true" : "",
    stock: initialData?.stock?.toString() || "",
    brand: initialData?.brand || "",
    rating: initialData?.rating || 4,
    image: null as File | null,
  });

  const [imagePreview, setImagePreview] = useState<string | null>(
    initialData?.image || null
  );
  const [hoveredRating, setHoveredRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newData = { ...prev, [name]: value };
      if (name === "category") {
        newData.subCategory = "";
      }
      return newData;
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setFormData((prev) => ({ ...prev, image: file }));
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({ ...prev, image: null }));
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      const fd = new FormData();
      fd.append("name", formData.name);
      fd.append("price", formData.price);
      fd.append("category", formData.category);
      fd.append("stock", formData.stock);
      if (formData.brand) fd.append("brand", formData.brand);
      if (formData.subCategory) fd.append("subCategory", formData.subCategory);
      if (formData.oldPrice || formData.oldPrice === "") fd.append("oldPrice", formData.oldPrice);
      fd.append("rating", String(formData.rating));
      if (formData.isFeatured) fd.append("isFeatured", formData.isFeatured);
      if (formData.isPopular) fd.append("isPopular", formData.isPopular);
      
      if (formData.image) {
        fd.append("image", formData.image);
      } else if (!imagePreview && initialData) {
        // Explicitly clear image
        fd.append("image", "/images/product-1.png");
      }

      let data;
      if (initialData?._id) {
        data = await api.updateProduct(initialData._id, fd);
      } else {
        data = await api.addProduct(fd);
      }

      console.log("Submission response:", data);

      if (!data || !data.success) {
        setErrorMessage(data?.message || "Something went wrong. Please try again.");
        setSubmitStatus("error");
        return;
      }

      setSubmitStatus("success");
      setTimeout(() => {
        onSave();
      }, 800);
    } catch (err: any) {
      console.error("Submission error:", err);
      const msg = err.response?.data?.message || "Network error. Please check your connection.";
      setErrorMessage(msg);
      setSubmitStatus("error");
    } finally {
      setSubmitting(false);
    }
  };

  const activeRating = hoveredRating || formData.rating;

  const currentCategoryObj = fetchedCategories.find(
    (c: any) => c._id === formData.category || c.name === formData.category
  );
  const availableSubCategories: string[] = currentCategoryObj?.subCategories || [];

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
          >
            <X size={24} />
          </button>
        )}
      </div>

      {submitStatus === "success" && (
        <div className="mb-4 flex items-center gap-2 rounded-md bg-green-50 border border-green-200 p-3 text-green-700">
          <CheckCircle size={18} />
          <span className="text-sm font-medium">Product saved successfully!</span>
        </div>
      )}
      {submitStatus === "error" && (
        <div className="mb-4 flex items-center gap-2 rounded-md bg-red-50 border border-red-200 p-3 text-red-700">
          <AlertCircle size={18} />
          <span className="text-sm font-medium">{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="border-2 border-[#1e90ff] bg-white p-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="mb-1 block text-[11px] text-[#444]">
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="h-8 w-full border border-[#d9d9d9] px-2 text-[12px] outline-none focus:border-blue-400"
              />
            </div>

            <div>
              <label className="mb-1 block text-[11px] text-[#444]">Product Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full resize-none border border-[#d9d9d9] px-2 py-2 text-[12px] outline-none focus:border-blue-400"
              />
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
              <div>
                <label className="mb-1 block text-[11px] text-[#444]">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="h-8 w-full border border-[#d9d9d9] bg-white px-2 text-[12px] outline-none"
                >
                  <option value="">{isLoadingCategories ? "Loading..." : "Select Category"}</option>
                  {fetchedCategories.map((cat: any) => (
                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-[11px] text-[#444]">Sub Category</label>
                <select
                  name="subCategory"
                  value={formData.subCategory}
                  onChange={handleChange}
                  disabled={!formData.category || availableSubCategories.length === 0}
                  className="h-8 w-full border border-[#d9d9d9] bg-white px-2 text-[12px] outline-none"
                >
                  <option value="">Select Sub Category</option>
                  {availableSubCategories.map((sub: string) => (
                    <option key={sub} value={sub}>{sub}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-[11px] text-[#444]">
                  Price <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.01"
                  className="h-8 w-full border border-[#d9d9d9] px-2 text-[12px] outline-none focus:border-blue-400"
                />
              </div>

              <div>
                <label className="mb-1 block text-[11px] text-[#444]">Old Price</label>
                <input
                  type="number"
                  name="oldPrice"
                  value={formData.oldPrice}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  className="h-8 w-full border border-[#d9d9d9] px-2 text-[12px] outline-none focus:border-blue-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
              <div>
                <label className="mb-1 block text-[11px] text-[#444]">Is Featured?</label>
                <select
                  name="isFeatured"
                  value={formData.isFeatured}
                  onChange={handleChange}
                  className="h-8 w-full border border-[#d9d9d9] bg-white px-2 text-[12px] outline-none"
                >
                  <option value="">No</option>
                  <option value="true">Yes</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-[11px] text-[#444]">Is Popular?</label>
                <select
                  name="isPopular"
                  value={formData.isPopular}
                  onChange={handleChange}
                  className="h-8 w-full border border-[#d9d9d9] bg-white px-2 text-[12px] outline-none"
                >
                  <option value="">No</option>
                  <option value="true">Yes</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-[11px] text-[#444]">
                  Stock <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  required
                  min="0"
                  className="h-8 w-full border border-[#d9d9d9] px-2 text-[12px] outline-none focus:border-blue-400"
                />
              </div>

              <div>
                <label className="mb-1 block text-[11px] text-[#444]">Brand</label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  className="h-8 w-full border border-[#d9d9d9] px-2 text-[12px] outline-none focus:border-blue-400"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-[11px] text-[#444]">Product Rating</label>
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
                      onClick={() => setFormData((prev) => ({ ...prev, rating: starValue }))}
                    >
                      <Star
                        size={18}
                        className={isActive ? "fill-[#f4b400] text-[#f4b400]" : "text-[#cfcfcf]"}
                      />
                    </button>
                  );
                })}
                <span className="ml-2 text-[11px] text-gray-500">{formData.rating} / 5</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <h3 className="mb-2 text-[18px] font-semibold text-[#4b4b4b]">Media & Images</h3>
          <div className="flex items-start gap-4">
            <label className="flex h-[95px] w-[95px] cursor-pointer flex-col items-center justify-center rounded border-2 border-dashed border-[#d9d9d9] bg-[#fafafa] text-[#a0a0a0] hover:border-blue-400 hover:text-blue-500">
              <ImageUp size={24} />
              <span className="mt-1 text-[10px]">Click to Upload</span>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>

            {imagePreview && (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="h-[95px] w-[95px] rounded border border-gray-200 object-cover"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute -top-2 -right-2 rounded-full bg-red-500 p-0.5 text-white"
                >
                  <X size={12} />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 flex items-center gap-4">
          <button
            type="submit"
            disabled={submitting}
            className="h-11 min-w-[185px] rounded bg-[#11b886] px-6 text-[14px] font-medium text-white hover:bg-[#0fa679] disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {submitting ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Saving...
              </>
            ) : (
              initialData ? "Update Product" : "Publish Product"
            )}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="h-11 min-w-[120px] rounded border border-gray-300 bg-white px-6 text-[14px] font-medium text-gray-600 hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
}