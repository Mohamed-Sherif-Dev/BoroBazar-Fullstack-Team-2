import { useState } from "react";
import ProductCard from "../components/ProductCard";
import ProductsToolbar from "../components/ProductsToolbar";
import Pagination from "../components/Pagination";
import { useProducts } from "../hooks/useProducts";

const ProductsPage = () => {
  const { data: products, isLoading, isError, error } = useProducts();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; 

  if (isLoading) {
    return (
      <div className="container mx-auto py-20 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto"></div>
        <p className="mt-4 text-gray-600 font-medium">Loading products...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto py-20 text-center">
        <p className="text-red-600 font-bold text-xl">Error loading products</p>
        <p className="text-gray-500">{(error as Error).message}</p>
      </div>
    );
  }

  const allProducts = products || [];

  // 2. Calculate total pages
  const totalPages = Math.ceil(allProducts.length / itemsPerPage);
  
  // Get current products
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = allProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // 3. Handle Page Change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container mx-auto py-10">
      <ProductsToolbar totalProducts={allProducts.length} />
      
      {/* Render only the sliced products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {currentProducts.map((product) => (
          <ProductCard product={product} key={product._id} />
        ))}
      </div>

      {/* 4. Add the Pagination Component */}
      {totalPages > 1 && (
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={handlePageChange} 
        />
      )}
    </div>
  );
};

export default ProductsPage;