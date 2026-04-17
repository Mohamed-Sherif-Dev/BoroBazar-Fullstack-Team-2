import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getOrders } from "../api/orders";
import OrderList from "../components/OrderList";
import { MoveLeft, LayoutDashboard, Search, Package } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { OrderStatus } from "@/types/order.types";

type TabType = "All" | OrderStatus;

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState<TabType>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: orders, isLoading, isError, error } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto py-20 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto"></div>
        <p className="mt-4 text-gray-600 font-medium">Fetching your orders...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto py-20 text-center">
        <div className="bg-rose-50 border border-rose-100 rounded-2xl p-10 max-w-lg mx-auto">
          <p className="text-red-600 font-bold text-xl mb-2">Error loading orders</p>
          <p className="text-gray-500 mb-6">{(error as Error).message}</p>
          <Button 
            onClick={() => window.location.reload()}
            className="bg-rose-600 hover:bg-rose-700 text-white px-8"
          >
            Retry Call
          </Button>
        </div>
      </div>
    );
  }

  const filteredOrders = (orders || []).filter((order) => {
    const matchesTab = activeTab === "All" || order.status === activeTab;
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const tabs: TabType[] = ["All", "Processing", "Shipped", "Delivered", "Cancelled"];

  return (
    <div className="container mx-auto py-12 px-4 md:px-0">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-widest">
            <LayoutDashboard size={14} />
            My Account
          </div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">
            Order <span className="text-emerald-600">History</span>
          </h1>
          <p className="text-gray-500 font-medium">
            Check the status of your recent orders and manage your returns.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <Input 
              placeholder="Search by order ID..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11 border-gray-200 focus:ring-emerald-500 rounded-lg"
            />
          </div>
          <Link to="/">
            <Button variant="outline" className="h-11 border-gray-200 gap-2 font-bold rounded-lg whitespace-nowrap">
              <MoveLeft size={16} />
              Back to Shopping
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-10">
        <div className="flex items-center justify-between border-b border-gray-100 pb-0">
          <div className="flex gap-8 overflow-x-auto no-scrollbar">
            {tabs.map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`font-bold transition-all pb-4 border-b-2 whitespace-nowrap ${
                  activeTab === tab 
                    ? "text-emerald-600 border-emerald-600" 
                    : "text-gray-400 border-transparent hover:text-gray-600"
                }`}
              >
                {tab} {tab === "All" && `(${orders?.length || 0})`}
              </button>
            ))}
          </div>
        </div>

        <OrderList orders={filteredOrders} />
      </div>

      {/* Footer Info */}
      <div className="mt-20 p-8 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 text-gray-600 font-medium italic">
          <Package className="text-emerald-500" size={24} />
          "Experience the best delivery service with BoroBazar."
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-gray-800">Need help with an order?</span>
          <Button variant="link" className="text-emerald-600 font-bold h-auto p-0 underline decoration-2 underline-offset-4">
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  );
}
