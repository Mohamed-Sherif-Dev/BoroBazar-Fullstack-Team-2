import { useCallback, useEffect, useState } from "react";
import {
  Package,
  MapPin,
  Loader2,
  RefreshCcw,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { api } from "../../../../services/api";

interface OrderItem {
  productId: string | { name: string; image: string };
  quantity: number;
  price: number;
}

interface DBOrder {
  _id: string;
  userId: { _id: string; name: string; email: string } | string;
  items: OrderItem[];
  totalPrice: number;
  shippingAddress: string;
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  paymentMethod: "Cash" | "Card";
  createdAt?: string;
}

interface Pagination {
  totalDocuments: number;
  totalPages: number;
  currentPage: number;
  limit: number;
}

// ─────── Status Badge ─────────────────────────────────────────
const STATUS_STYLES: Record<string, string> = {
  Pending: "bg-yellow-50 text-yellow-700 border border-yellow-200",
  Processing: "bg-blue-50 text-blue-700 border border-blue-200",
  Shipped: "bg-indigo-50 text-indigo-700 border border-indigo-200",
  Delivered: "bg-green-50 text-green-700 border border-green-200",
  Cancelled: "bg-red-50 text-red-600 border border-red-200",
};

function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLES[status] ?? "bg-gray-100 text-gray-600"}`}>
      {status}
    </span>
  );
}

function getUserLabel(userId: DBOrder["userId"]) {
  if (!userId) return "Unknown";
  if (typeof userId === "string") return userId;
  return userId.name || userId.email || userId._id;
}

// ─────── Component ────────────────────────────────────────────
export default function OrdersTable() {
  const [orders, setOrders] = useState<DBOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<Pagination>({
    totalDocuments: 0,
    totalPages: 1,
    currentPage: 1,
    limit: 10,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await api.getOrders({ page: currentPage, limit: rowsPerPage });

      if (result?.success) {
        setOrders(result.data.orders);
        setPagination(result.data.pagination);
      } else {
        setError("Failed to load orders.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [currentPage, rowsPerPage]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const startIndex = pagination.totalDocuments === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1;
  const endIndex = Math.min(currentPage * rowsPerPage, pagination.totalDocuments);

  return (
    <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex flex-col gap-3 border-b border-gray-200 px-4 py-3 md:flex-row md:items-center md:justify-between">
        <h2 className="text-lg font-semibold text-gray-900">
          Orders
          <span className="ml-2 text-sm font-normal text-gray-400">
            ({pagination.totalDocuments} total)
          </span>
        </h2>
        <button
          onClick={fetchOrders}
          className="inline-flex items-center gap-1.5 rounded-md border border-gray-200 px-3 py-1.5 text-sm text-gray-500 hover:bg-gray-50"
        >
          <RefreshCcw size={14} />
          Refresh
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold uppercase text-gray-500">
              <th className="px-4 py-3">Order ID</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Payment</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Items</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="px-4 py-14 text-center">
                  <div className="flex flex-col items-center justify-center gap-2 text-gray-400">
                    <Loader2 className="h-6 w-6 animate-spin text-emerald-500" />
                    <p className="text-sm">Loading orders...</p>
                  </div>
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={7} className="py-10 text-center">
                  <p className="text-sm text-red-500">{error}</p>
                  <button onClick={fetchOrders} className="mt-2 text-xs text-blue-500 underline">
                    Retry
                  </button>
                </td>
              </tr>
            ) : orders.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-gray-400">
                  <Package className="mx-auto mb-2 h-8 w-8 opacity-30" />
                  No orders found.
                </td>
              </tr>
            ) : (
              orders.map((order) => {
                const isExpanded = expandedOrder === order._id;
                return (
                  <>
                    <tr
                      key={order._id}
                      className={`border-b border-gray-100 transition-colors ${isExpanded ? "bg-blue-50" : "hover:bg-gray-50"}`}
                    >
                      <td className="px-4 py-3">
                        <span className="font-mono text-xs text-gray-500">
                          #{order._id.slice(-8).toUpperCase()}
                        </span>
                      </td>

                      <td className="px-4 py-3">
                        <p className="font-medium text-gray-900">{getUserLabel(order.userId)}</p>
                        {typeof order.userId !== "string" && order.userId?.email && (
                          <p className="text-xs text-gray-400">{order.userId.email}</p>
                        )}
                      </td>

                      <td className="px-4 py-3 text-xs text-gray-500">
                        {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "—"}
                      </td>

                      <td className="px-4 py-3">
                        <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${order.paymentMethod === "Card" ? "bg-purple-50 text-purple-700 border border-purple-200" : "bg-gray-100 text-gray-600"}`}>
                          {order.paymentMethod}
                        </span>
                      </td>

                      <td className="px-4 py-3 font-semibold text-emerald-600">
                        ${order.totalPrice.toFixed(2)}
                      </td>

                      <td className="px-4 py-3">
                        <StatusBadge status={order.status} />
                      </td>

                      <td className="px-4 py-3">
                        <button
                          onClick={() => setExpandedOrder(isExpanded ? null : order._id)}
                          className="inline-flex items-center gap-1 rounded border border-gray-200 px-2 py-1 text-xs text-gray-500 hover:bg-gray-100"
                        >
                          {order.items.length} item{order.items.length !== 1 ? "s" : ""}
                          {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                        </button>
                      </td>
                    </tr>

                    {/* Expanded row — order items */}
                    {isExpanded && (
                      <tr key={`${order._id}-details`} className="bg-blue-50">
                        <td colSpan={7} className="px-6 pb-4 pt-0">
                          <div className="rounded-lg border border-blue-100 bg-white p-4">
                            <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase text-gray-500">
                              <Package size={13} />
                              Order Items
                            </div>
                            <div className="space-y-2">
                              {order.items.map((item, idx) => {
                                const productName = typeof item.productId === "object"
                                  ? item.productId?.name
                                  : `Product #${idx + 1}`;
                                return (
                                  <div key={idx} className="flex items-center justify-between border-b border-gray-100 pb-2 last:border-0 last:pb-0">
                                    <span className="text-sm text-gray-700">{productName}</span>
                                    <div className="flex items-center gap-4 text-sm">
                                      <span className="text-gray-500">×{item.quantity}</span>
                                      <span className="font-medium text-gray-900">${item.price.toFixed(2)}</span>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                            <div className="mt-3 flex items-center gap-2 border-t border-gray-100 pt-2 text-xs text-gray-500">
                              <MapPin size={12} />
                              <span>{order.shippingAddress}</span>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col gap-3 border-t border-gray-200 px-4 py-3 text-sm text-gray-600 md:flex-row md:items-center md:justify-end">
        <div className="flex items-center gap-2">
          <span>Rows per page:</span>
          <select
            value={rowsPerPage}
            onChange={(e) => { setRowsPerPage(Number(e.target.value)); setCurrentPage(1); }}
            className="rounded border border-gray-200 px-2 py-1 outline-none text-sm"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>

        <span>{startIndex}–{endIndex} of {pagination.totalDocuments}</span>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="rounded border border-gray-200 px-3 py-1 disabled:cursor-not-allowed disabled:opacity-40 hover:bg-gray-50"
          >
            Prev
          </button>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, pagination.totalPages))}
            disabled={currentPage === pagination.totalPages}
            className="rounded border border-gray-200 px-3 py-1 disabled:cursor-not-allowed disabled:opacity-40 hover:bg-gray-50"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
