// src/features/admin-dashboard/components/ProductsTable.tsx
import { useMemo, useState } from "react";
import { Eye, Pencil, Trash2, Star, X } from "lucide-react";
import ProductTableFilters from "./ProductTableFilters";
import ProductTablePagination from "./ProductTablePagination";
import type { ProductItem } from "../../types/admin-dashboard.types";

type ProductsTableProps = {
    products: ProductItem[];
    setProducts: React.Dispatch<React.SetStateAction<ProductItem[]>>;
    onAddProduct: () => void;
    onEditProduct: (product: ProductItem) => void;
    onViewProduct: (product: ProductItem) => void;
};

export default function ProductsTable({ products, setProducts, onAddProduct, onEditProduct, onViewProduct }: ProductsTableProps) {


    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedSubCategory, setSelectedSubCategory] = useState("");
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [productToDelete, setProductToDelete] = useState<ProductItem | null>(null);

    const categories = useMemo(
        () => [...new Set(products.map((item) => item.category))],
        [products]
    );

    const subCategories = useMemo(() => {
        const filtered = selectedCategory
            ? products.filter((item) => item.category === selectedCategory)
            : products;

        return [...new Set(filtered.map((item) => item.subCategory))];
    }, [products, selectedCategory]);

    const filteredProducts = useMemo(() => {
        return products.filter((item) => {
            const matchesCategory =
                !selectedCategory || item.category === selectedCategory;

            const matchesSubCategory =
                !selectedSubCategory || item.subCategory === selectedSubCategory;

            const matchesSearch =
                !search ||
                item.name.toLowerCase().includes(search.toLowerCase()) ||
                item.category.toLowerCase().includes(search.toLowerCase()) ||
                item.subCategory.toLowerCase().includes(search.toLowerCase());

            return matchesCategory && matchesSubCategory && matchesSearch;
        });
    }, [products, selectedCategory, selectedSubCategory, search]);

    const totalItems = filteredProducts.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / rowsPerPage));
    const start = (currentPage - 1) * rowsPerPage;
    const paginatedProducts = filteredProducts.slice(start, start + rowsPerPage);

    const startIndex = totalItems === 0 ? 0 : start + 1;
    const endIndex = Math.min(start + rowsPerPage, totalItems);

    const confirmDelete = () => {
        if (productToDelete === null) return;
        setProducts((prev) => prev.filter((item) => item.id !== productToDelete.id));
        setProductToDelete(null);
    };

    const handleDeleteClick = (product: ProductItem) => {
        setProductToDelete(product);
    };

    const handleEdit = (product: ProductItem) => {
        onEditProduct(product);
    };

    const handleView = (product: ProductItem) => {
        onViewProduct(product);
    };

    const handleRowsPerPageChange = (value: number) => {
        setRowsPerPage(value);
        setCurrentPage(1);
    };

    const handleCategoryChange = (value: string) => {
        setSelectedCategory(value);
        setSelectedSubCategory("");
        setCurrentPage(1);
    };

    const handleSubCategoryChange = (value: string) => {
        setSelectedSubCategory(value);
        setCurrentPage(1);
    };

    const handleSearchChange = (value: string) => {
        setSearch(value);
        setCurrentPage(1);
    };

    return (
        <section className="rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
                <h2 className="text-lg font-semibold text-gray-900">Products</h2>

                <button
                    onClick={onAddProduct}
                    className="rounded-md bg-emerald-500 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-600"
                >
                    ADD PRODUCT
                </button>
            </div>

            <div className="p-4">
                <ProductTableFilters
                    categories={categories}
                    subCategories={subCategories}
                    selectedCategory={selectedCategory}
                    selectedSubCategory={selectedSubCategory}
                    search={search}
                    onCategoryChange={handleCategoryChange}
                    onSubCategoryChange={handleSubCategoryChange}
                    onSearchChange={handleSearchChange}
                />

                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                        <thead>
                            <tr className="border-y border-gray-200 bg-gray-50 text-left text-xs font-semibold uppercase text-gray-500">
                                <th className="px-3 py-3">
                                    <input type="checkbox" />
                                </th>
                                <th className="px-3 py-3">Product</th>
                                <th className="px-3 py-3">Category</th>
                                <th className="px-3 py-3">Sub Category</th>
                                <th className="px-3 py-3">Price</th>
                                <th className="px-3 py-3">Sales</th>
                                <th className="px-3 py-3">Stock</th>
                                <th className="px-3 py-3">Rating</th>
                                <th className="px-3 py-3">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {paginatedProducts.length > 0 ? (
                                paginatedProducts.map((product) => (
                                    <tr key={product.id} className="border-b border-gray-100">
                                        <td className="px-3 py-4 align-top">
                                            <input type="checkbox" />
                                        </td>

                                        <td className="px-3 py-4">
                                            <div className="flex items-start gap-3">
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="h-12 w-12 rounded object-cover"
                                                />
                                                <div>
                                                    <p className="max-w-[220px] font-medium text-gray-900">
                                                        {product.name}
                                                    </p>
                                                    {product.brand && (
                                                        <p className="mt-1 text-xs text-gray-500">
                                                            {product.brand}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-3 py-4 text-gray-700">{product.category}</td>
                                        <td className="px-3 py-4 text-gray-700">{product.subCategory}</td>

                                        <td className="px-3 py-4">
                                            <div className="flex flex-col">
                                                {product.oldPrice && (
                                                    <span className="text-xs text-gray-400 line-through">
                                                        ${product.oldPrice.toFixed(2)}
                                                    </span>
                                                )}
                                                <span className="font-semibold text-blue-600">
                                                    ${product.price.toFixed(2)}
                                                </span>
                                            </div>
                                        </td>

                                        <td className="px-3 py-4 text-gray-700">{product.sales} sale</td>

                                        <td className="px-3 py-4 font-semibold text-blue-600">
                                            {product.stock}
                                        </td>

                                        <td className="px-3 py-4">
                                            <div className="flex items-center gap-1">
                                                {Array.from({ length: 5 }).map((_, index) => (
                                                    <Star
                                                        key={index}
                                                        size={14}
                                                        className={
                                                            index < product.rating
                                                                ? "fill-yellow-400 text-yellow-400"
                                                                : "text-gray-300"
                                                        }
                                                    />
                                                ))}
                                            </div>
                                        </td>

                                        <td className="px-3 py-4">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => handleEdit(product)}
                                                    className="rounded p-1.5 text-blue-500 transition-colors hover:bg-blue-50 hover:text-blue-600"
                                                    title="Edit Product"
                                                >
                                                    <Pencil size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleView(product)}
                                                    className="rounded p-1.5 text-emerald-500 transition-colors hover:bg-emerald-50 hover:text-emerald-600"
                                                    title="View Product"
                                                >
                                                    <Eye size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteClick(product)}
                                                    className="rounded p-1.5 text-red-500 transition-colors hover:bg-red-50 hover:text-red-600"
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
                                    <td colSpan={9} className="px-3 py-8 text-center text-gray-500">
                                        No products found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <ProductTablePagination
                currentPage={currentPage}
                totalPages={totalPages}
                rowsPerPage={rowsPerPage}
                totalItems={totalItems}
                startIndex={startIndex}
                endIndex={endIndex}
                onPrev={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                onNext={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                onRowsPerPageChange={handleRowsPerPageChange}
            />

            {productToDelete !== null && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-2xl overflow-hidden rounded-xl bg-white shadow-2xl">
                        <div className="flex items-center justify-between border-b border-red-100 bg-red-50 p-5">
                            <h2 className="text-xl font-semibold text-red-700">Confirm Deletion</h2>
                            <button
                                onClick={() => setProductToDelete(null)}
                                className="rounded-full p-2 text-red-400 hover:bg-red-100 hover:text-red-600"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-6 md:flex gap-8">
                            <div className="mb-6 shrink-0 md:mb-0">
                                <img
                                    src={productToDelete.image}
                                    alt={productToDelete.name}
                                    className="h-48 w-48 rounded-lg object-cover shadow-sm md:h-64 md:w-64 border border-gray-100"
                                />
                            </div>

                            <div className="flex-1 space-y-4">
                                <div className="rounded-md bg-red-50 p-3 mb-4 border border-red-100">
                                    <p className="text-sm text-red-800 font-medium">
                                        Are you sure you want to delete this product? This action cannot be undone.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900">{productToDelete.name}</h3>
                                    {productToDelete.brand && (
                                        <p className="text-sm text-gray-500">Brand: <span className="font-medium text-gray-700">{productToDelete.brand}</span></p>
                                    )}
                                </div>

                                <div className="flex items-center gap-2">
                                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600 border border-blue-100">
                                        {productToDelete.category}
                                    </span>
                                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 border border-gray-200">
                                        {productToDelete.subCategory}
                                    </span>
                                </div>

                                <div className="flex items-end gap-3 pt-2">
                                    <span className="text-3xl font-bold text-emerald-600">${productToDelete.price.toFixed(2)}</span>
                                </div>

                                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Stock</p>
                                        <p className="text-lg font-medium text-gray-900">{productToDelete.stock} units</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Sales</p>
                                        <p className="text-lg font-medium text-gray-900">{productToDelete.sales} total</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-gray-100 bg-gray-50 p-5 flex justify-end gap-3">
                            <button
                                onClick={() => setProductToDelete(null)}
                                className="rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="rounded-lg bg-red-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 flex items-center gap-2"
                            >
                                <Trash2 size={16} />
                                Delete Product
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );

}
