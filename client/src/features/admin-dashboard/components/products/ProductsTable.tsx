import { useCallback, useEffect, useState } from "react";
import { Eye, Pencil, Trash2, Star, X, Loader2, RefreshCcw } from "lucide-react";
import ProductTableFilters from "./ProductTableFilters";
import ProductTablePagination from "./ProductTablePagination";
import { api } from "../../../../services/api";

interface DBProduct {
  _id: string;
  name: string;
  image: string;
  price: number;
  oldPrice?: number;
  rating: number;
  category: { _id: string; name: string } | string;
  subCategory: string;
  stock?: number;
  sales?: number;
  brand?: string;
  isFeatured?: boolean;
  isPopular?: boolean;
}

interface Pagination {
  totalDocuments: number;
  totalPages: number;
  currentPage: number;
  limit: number;
}

type ProductsTableProps = {
  onAddProduct: () => void;
  onEditProduct: (product: DBProduct) => void;
  onViewProduct: (product: DBProduct) => void;
};

function getCategoryName(cat: DBProduct["category"]): string {
  if (!cat) return "";
  if (typeof cat === "string") return cat;
  return cat.name;
}

export default function ProductsTable({ onAddProduct, onEditProduct, onViewProduct }: ProductsTableProps) {
  const [products, setProducts] = useState<DBProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<Pagination>({
    totalDocuments: 0,
    totalPages: 1,
    currentPage: 1,
    limit: 10,
  });

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [productToDelete, setProductToDelete] = useState<DBProduct | null>(null);
  const [deleting, setDeleting] = useState(false);

  // All unique category names extracted from current results for the filter dropdown
  const [allCategories, setAllCategories] = useState<string[]>([]);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await api.getProducts({
        page: currentPage,
        limit: rowsPerPage,
        search: search || undefined,
        category: selectedCategory || undefined,
      });

      if (result?.success) {
        const fetched: DBProduct[] = result.data.products;
        setProducts(fetched);
        setPagination(result.data.pagination);
        // Build category list from all products in this batch
        const cats = [...new Set(fetched.map((p) => getCategoryName(p.category)).filter(Boolean))];
        setAllCategories((prev) => [...new Set([...prev, ...cats])]);
      } else {
        setError("Failed to fetch products.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [currentPage, rowsPerPage, search, selectedCategory]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setCurrentPage(1);
  };

  const handleRowsPerPageChange = (value: number) => {
    setRowsPerPage(value);
    setCurrentPage(1);
  };

  const handleDeleteClick = (product: DBProduct) => {
    setProductToDelete(product);
  };

  const confirmDelete = async () => {
    if (!productToDelete) return;
    setDeleting(true);
    try {
      await api.deleteProduct(productToDelete._id);
      setProductToDelete(null);
      fetchProducts();
    } catch {
      // silently retry
    } finally {
      setDeleting(false);
    }
  };

  const startIndex = pagination.totalDocuments === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1;
  const endIndex = Math.min(currentPage * rowsPerPage, pagination.totalDocuments);

  return (
    <section className="rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
        <h2 className="text-lg font-semibold text-gray-900">Products</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={fetchProducts}
            className="rounded-md border border-gray-200 p-2 text-gray-500 hover:bg-gray-50"
            title="Refresh"
          >
            <RefreshCcw size={15} />
          </button>
          <button
            onClick={onAddProduct}
            className="rounded-md bg-emerald-500 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-600"
          >
            ADD PRODUCT
          </button>
        </div>
      </div>

      <div className="p-4">
        {/* Filters - pass empty subcategories since we do server-side filtering */}
        <ProductTableFilters
          categories={allCategories}
          subCategories={[]}
          selectedCategory={selectedCategory}
          selectedSubCategory=""
          search={search}
          onCategoryChange={handleCategoryChange}
          onSubCategoryChange={() => {}}
          onSearchChange={handleSearchChange}
        />

        {/* Table */}
        {loading ? (
          <div className="flex items-center justify-center py-16 text-gray-400">
            <Loader2 className="animate-spin mr-2" size={20} />
            Loading products...
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3 text-red-500">
            <p className="text-sm">{error}</p>
            <button
              onClick={fetchProducts}
              className="text-xs underline text-blue-500 hover:text-blue-700"
            >
              Try again
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-y border-gray-200 bg-gray-50 text-left text-xs font-semibold uppercase text-gray-500">
                  <th className="px-3 py-3">Product</th>
                  <th className="px-3 py-3">Category</th>
                  <th className="px-3 py-3">Sub Category</th>
                  <th className="px-3 py-3">Price</th>
                  <th className="px-3 py-3">Stock</th>
                  <th className="px-3 py-3">Rating</th>
                  <th className="px-3 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {products.length > 0 ? (
                  products.map((product) => (
                    <tr key={product._id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-3 py-4">
                        <div className="flex items-start gap-3">
                          <img
                            src={product.image}
                            alt={product.name}
                            onError={(e) => { (e.target as HTMLImageElement).src = "/images/placeholder.png"; }}
                            className="h-12 w-12 rounded object-cover border border-gray-100"
                          />
                          <div>
                            <p className="max-w-[220px] font-medium text-gray-900">{product.name}</p>
                            {product.brand && (
                              <p className="mt-1 text-xs text-gray-500">{product.brand}</p>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="px-3 py-4 text-gray-700">
                        <span className="rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-600 border border-blue-100">
                          {getCategoryName(product.category)}
                        </span>
                      </td>

                      <td className="px-3 py-4 text-gray-600 text-xs">{product.subCategory || "—"}</td>

                      <td className="px-3 py-4">
                        <div className="flex flex-col">
                          {product.oldPrice && (
                            <span className="text-xs text-gray-400 line-through">${product.oldPrice.toFixed(2)}</span>
                          )}
                          <span className="font-semibold text-blue-600">${product.price.toFixed(2)}</span>
                        </div>
                      </td>

                      <td className="px-3 py-4 font-semibold text-blue-600">
                        {product.stock ?? "—"}
                      </td>

                      <td className="px-3 py-4">
                        <div className="flex items-center gap-0.5">
                          {Array.from({ length: 5 }).map((_, index) => (
                            <Star
                              key={index}
                              size={13}
                              className={index < (product.rating ?? 0) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                            />
                          ))}
                        </div>
                      </td>

                      <td className="px-3 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onEditProduct(product)}
                            className="rounded p-1.5 text-blue-500 hover:bg-blue-50 hover:text-blue-600"
                            title="Edit Product"
                          >
                            <Pencil size={16} />
                          </button>
                          <button
                            onClick={() => onViewProduct(product)}
                            className="rounded p-1.5 text-emerald-500 hover:bg-emerald-50 hover:text-emerald-600"
                            title="View Product"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(product)}
                            className="rounded p-1.5 text-red-500 hover:bg-red-50 hover:text-red-600"
                            title="Delete Product"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-3 py-8 text-center text-gray-400">
                      No products found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <ProductTablePagination
        currentPage={currentPage}
        totalPages={pagination.totalPages}
        rowsPerPage={rowsPerPage}
        totalItems={pagination.totalDocuments}
        startIndex={startIndex}
        endIndex={endIndex}
        onPrev={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        onNext={() => setCurrentPage((prev) => Math.min(prev + 1, pagination.totalPages))}
        onRowsPerPageChange={handleRowsPerPageChange}
      />

      {/* Delete Confirmation Modal */}
      {productToDelete !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md overflow-hidden rounded-xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-red-100 bg-red-50 p-5">
              <h2 className="text-lg font-semibold text-red-700">Confirm Deletion</h2>
              <button
                onClick={() => setProductToDelete(null)}
                className="rounded-full p-2 text-red-400 hover:bg-red-100 hover:text-red-600"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 flex gap-5 items-start">
              <img
                src={productToDelete.image}
                alt={productToDelete.name}
                className="h-20 w-20 rounded-lg object-cover border border-gray-100 shrink-0"
              />
              <div className="flex-1 space-y-2">
                <div className="rounded-md bg-red-50 p-3 border border-red-100">
                  <p className="text-sm text-red-800 font-medium">
                    Are you sure you want to delete this product? This action cannot be undone.
                  </p>
                </div>
                <h3 className="text-base font-bold text-gray-900">{productToDelete.name}</h3>
                <span className="text-lg font-bold text-emerald-600">${productToDelete.price.toFixed(2)}</span>
              </div>
            </div>

            <div className="border-t border-gray-100 bg-gray-50 p-4 flex justify-end gap-3">
              <button
                onClick={() => setProductToDelete(null)}
                className="rounded-lg border border-gray-300 bg-white px-5 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={deleting}
                className="rounded-lg bg-red-600 px-5 py-2 text-sm font-semibold text-white hover:bg-red-500 flex items-center gap-2 disabled:opacity-50"
              >
                {deleting ? <Loader2 size={15} className="animate-spin" /> : <Trash2 size={15} />}
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
