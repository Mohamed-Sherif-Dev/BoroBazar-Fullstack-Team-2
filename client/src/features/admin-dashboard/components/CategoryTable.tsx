import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { products as productsData } from "../data/AdminDashboard.data";

type CategoryData = {
  id: string;
  category: string;
  subCategory: string;
  productCount: number;
};

export default function CategoryTable() {
  const [search, setSearch] = useState("");

  const categoriesData = useMemo(() => {
    const categoryMap = new Map<string, CategoryData>();

    productsData.forEach((product) => {
      const key = `${product.category}-${product.subCategory}`;
      if (categoryMap.has(key)) {
        categoryMap.get(key)!.productCount += 1;
      } else {
        categoryMap.set(key, {
          id: key,
          category: product.category,
          subCategory: product.subCategory,
          productCount: 1,
        });
      }
    });

    return Array.from(categoryMap.values());
  }, []);

  const filteredCategories = useMemo(() => {
    return categoriesData.filter((item) => {
      const keyword = search.toLowerCase();
      return (
        item.category.toLowerCase().includes(keyword) ||
        item.subCategory.toLowerCase().includes(keyword)
      );
    });
  }, [categoriesData, search]);

  return (
    <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="flex flex-col gap-3 border-b border-gray-200 px-4 py-3 md:flex-row md:items-center md:justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Categories & Subcategories</h2>

        <div className="relative w-full md:w-[280px] lg:w-[320px]">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search category or subcategory..."
            className="h-10 w-full rounded-md border border-gray-200 bg-gray-50 pl-9 pr-3 text-sm outline-none placeholder:text-gray-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold uppercase text-gray-500">
              <th className="px-6 py-4">Category Name</th>
              <th className="px-6 py-4">SubCategory Name</th>
              <th className="px-6 py-4 text-center">Total Products</th>
            </tr>
          </thead>
          <tbody>
            {filteredCategories.length > 0 ? (
              filteredCategories.map((item) => (
                <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-semibold text-gray-900">{item.category}</span>
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 border border-blue-100">
                        {item.subCategory}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-xs font-medium text-gray-800">
                        {item.productCount}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                  No categories found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
