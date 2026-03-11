// src/features/admin-dashboard/components/ProductTableFilters.tsx
type Props = {
  categories: string[];
  subCategories: string[];
  selectedCategory: string;
  selectedSubCategory: string;
  search: string;
  onCategoryChange: (value: string) => void;
  onSubCategoryChange: (value: string) => void;
  onSearchChange: (value: string) => void;
};

export default function ProductTableFilters({
  categories,
  subCategories,
  selectedCategory,
  selectedSubCategory,
  search,
  onCategoryChange,
  onSubCategoryChange,
  onSearchChange,
}: Props) {
  return (
    <div className="mb-4 grid grid-cols-1 gap-3 md:grid-cols-3">
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Category By
        </label>
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm outline-none"
        >
          <option value="">All Categories</option>
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Sub Category By
        </label>
        <select
          value={selectedSubCategory}
          onChange={(e) => onSubCategoryChange(e.target.value)}
          className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm outline-none"
        >
          <option value="">All Sub Categories</option>
          {subCategories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Search
        </label>
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search here..."
          className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm outline-none"
        />
      </div>
    </div>
  );
}