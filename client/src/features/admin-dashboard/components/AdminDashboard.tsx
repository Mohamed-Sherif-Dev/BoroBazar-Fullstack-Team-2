import Sidebar from "./Sidebar";
import DashboardStats from "./DashboardStats";
import ProductsTable from "./products/ProductsTable";
import UsersTable from "./users/UsersTable";
import OrdersTable from "./orders/OrdersTable";
import SalesChart from "./SalesChart";
import { useEffect, useState } from "react";
import AddProductForm from "./AddProductForm";
import UserForm from "./users/UserForm";
import CategoryTable from "./CategoryTable";
import type { UserItem } from "../types/admin-dashboard.types";
import { X, Star, AlertCircle } from "lucide-react";
import { api } from "../../../services/api";

type AdminView = "dashboard" | "add-product" | "edit-product" | "add-user" | "edit-user" | "view-product" | "category" | "users" | "orders";

export default function AdminDashboard() {
  const [view, setView] = useState<AdminView>("dashboard");
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [editingUser, setEditingUser] = useState<UserItem | null>(null);
  const [viewedProduct, setViewedProduct] = useState<any | null>(null);
  const [loadingDashboard, setLoadingDashboard] = useState(true);
  const [statsError, setStatsError] = useState(false);

  const [dashboardStats, setDashboardStats] = useState({
    totalCategories: 0,
    totalUsers: 0,
    totalOrders: 0,
    totalProducts: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dashboardResult = await api.getDashboard();
        if (dashboardResult?.success) {
          setDashboardStats(dashboardResult.data);
        } else {
          setStatsError(true);
        }
      } catch {
        setStatsError(true);
      } finally {
        setLoadingDashboard(false);
      }
    };
    fetchData();
  }, []);

  const handleSaveProduct = () => {
    setView("dashboard");
    setEditingProduct(null);
  };

  const handleSaveUser = () => {
    // Left empty since users state is no longer managed here
    setView("dashboard");
    setEditingUser(null);
  };

  const renderContent = () => {
    if (view === "add-product" || view === "edit-product") {
      return (
        <AddProductForm
          initialData={editingProduct}
          onSave={handleSaveProduct}
          onClose={() => { setView("dashboard"); setEditingProduct(null); }}
        />
      );
    }

    if (view === "add-user" || view === "edit-user") {
      return (
        <UserForm
          initialData={editingUser}
          onSave={handleSaveUser}
          onClose={() => { setView("dashboard"); setEditingUser(null); }}
        />
      );
    }

    if (view === "orders") {
      return <OrdersTable />;
    }

    if (view === "category") {
      return <CategoryTable />;
    }

    if (view === "users") {
      return (
        <div className="space-y-6">
          <UsersTable />
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {statsError && (
          <div className="flex items-center gap-2 rounded-lg border border-yellow-200 bg-yellow-50 px-4 py-3 text-sm text-yellow-800">
            <AlertCircle size={16} className="shrink-0" />
            <span>Could not load dashboard stats. The API may be unavailable.</span>
          </div>
        )}

        <DashboardStats stats={dashboardStats} loading={loadingDashboard} />

        <ProductsTable
          onAddProduct={() => setView("add-product")}
          onEditProduct={(p) => { setEditingProduct(p); setView("edit-product"); }}
          onViewProduct={(p) => { setViewedProduct(p); setView("view-product"); }}
        />
        <UsersTable />
        <OrdersTable />
        <SalesChart />
      </div>
    );
  };

  const renderViewProductModal = () => {
    if (view !== "view-product" || !viewedProduct) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
        <div className="w-full max-w-2xl overflow-hidden rounded-xl bg-white shadow-2xl">
          <div className="flex items-center justify-between border-b border-gray-100 p-5">
            <h2 className="text-xl font-semibold text-gray-900">Product Details</h2>
            <button
              onClick={() => { setView("dashboard"); setViewedProduct(null); }}
              className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-6 md:flex gap-8">
            <div className="mb-6 shrink-0 md:mb-0">
              <img
                src={viewedProduct.image || "/images/placeholder.png"}
                alt={viewedProduct.name}
                className="h-48 w-48 rounded-lg object-cover shadow-sm md:h-64 md:w-64"
                onError={(e) => { (e.target as HTMLImageElement).src = "/images/placeholder.png"; }}
              />
            </div>

            <div className="flex-1 space-y-4">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{viewedProduct.name}</h3>
                {viewedProduct.brand && (
                  <p className="text-sm text-gray-500">Brand: <span className="font-medium text-gray-700">{viewedProduct.brand}</span></p>
                )}
              </div>

              <div className="flex items-center gap-2">
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600 border border-blue-100">
                  {typeof viewedProduct.category === 'object' ? viewedProduct.category.name : viewedProduct.category}
                </span>
                {viewedProduct.subCategory && (
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 border border-gray-200">
                    {viewedProduct.subCategory}
                  </span>
                )}
              </div>

              <div className="flex items-end gap-3 pt-2">
                <span className="text-3xl font-bold text-emerald-600">
                  ${typeof viewedProduct.price === 'number' ? viewedProduct.price.toFixed(2) : viewedProduct.price}
                </span>
                {viewedProduct.oldPrice && (
                  <span className="text-lg text-gray-400 line-through mb-1">
                    ${typeof viewedProduct.oldPrice === 'number' ? viewedProduct.oldPrice.toFixed(2) : viewedProduct.oldPrice}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Stock</p>
                  <p className="text-lg font-medium text-gray-900">{viewedProduct.stock ?? 0} units</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Sales</p>
                  <p className="text-lg font-medium text-gray-900">{viewedProduct.sales ?? 0} total</p>
                </div>
              </div>

              <div className="pt-2">
                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Rating</p>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={i < (viewedProduct.rating || 0) ? "fill-yellow-400 text-yellow-400" : "text-gray-200"}
                    />
                  ))}
                  <span className="ml-2 text-sm font-medium text-gray-700">{(viewedProduct.rating || 0).toFixed(1)} / 5.0</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 bg-gray-50 p-5 flex justify-end">
            <button
              onClick={() => {
                setViewedProduct(null);
                setEditingProduct(viewedProduct);
                setView("edit-product");
              }}
              className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 mr-3"
            >
              Edit Product
            </button>
            <button
              onClick={() => { setView("dashboard"); setViewedProduct(null); }}
              className="rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#f5f6fa] flex relative">
      <Sidebar currentView={view} onNavigate={(v) => setView(v as AdminView)} />
      <main className="flex-1 p-6 relative">
        {renderContent()}
        {renderViewProductModal()}
      </main>
    </div>
  );
}