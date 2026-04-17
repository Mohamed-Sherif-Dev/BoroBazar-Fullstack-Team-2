import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getOrderById } from "../api/orders";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Package, Truck, CheckCircle2, Clock, XCircle, MapPin, CreditCard, Receipt } from "lucide-react";
import type { OrderStatus } from "@/types/order.types";

const statusConfig: Record<OrderStatus, { label: string; color: string; icon: any; description: string }> = {
  Pending: { 
    label: "Pending", 
    color: "bg-amber-100 text-amber-700 border-amber-200", 
    icon: Clock,
    description: "Your order has been received and is waiting for confirmation."
  },
  Processing: { 
    label: "Processing", 
    color: "bg-blue-100 text-blue-700 border-blue-200", 
    icon: Package,
    description: "We are currently preparing your items for shipment."
  },
  Shipped: { 
    label: "Shipped", 
    color: "bg-purple-100 text-purple-700 border-purple-200", 
    icon: Truck,
    description: "Your order is on its way to you."
  },
  Delivered: { 
    label: "Delivered", 
    color: "bg-emerald-100 text-emerald-700 border-emerald-200", 
    icon: CheckCircle2,
    description: "Order has been delivered successfully. Enjoy your purchase!"
  },
  Cancelled: { 
    label: "Cancelled", 
    color: "bg-rose-100 text-rose-700 border-rose-200", 
    icon: XCircle,
    description: "This order has been cancelled."
  },
};

export default function OrderDetailsPage() {
  const { id } = useParams<{ id: string }>();

  const { data: order, isLoading, isError } = useQuery({
    queryKey: ["order", id],
    queryFn: () => getOrderById(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto py-20 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto"></div>
        <p className="mt-4 text-gray-600 font-medium">Fetching order details...</p>
      </div>
    );
  }

  if (isError || !order) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Order not found</h2>
        <Link to="/orders">
          <Button className="mt-4 bg-emerald-600">Back to Orders</Button>
        </Link>
      </div>
    );
  }

  const status = statusConfig[order.status];
  const StatusIcon = status.icon;

  return (
    <div className="container mx-auto py-12 px-4 md:px-0 max-w-5xl">
      <Link to="/orders" className="flex items-center gap-2 text-gray-500 hover:text-emerald-600 transition-colors mb-8 font-bold">
        <ArrowLeft size={20} />
        Back to Orders
      </Link>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div className="space-y-2">
          <h1 className="text-3xl font-black text-gray-900">
            Order <span className="text-emerald-600">#{order.orderNumber}</span>
          </h1>
          <p className="text-gray-500 font-medium">
            Placed on {new Date(order.createdAt).toLocaleDateString("en-US", { 
              year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" 
            })}
          </p>
        </div>
        <Badge className={`${status.color} border px-4 py-1.5 text-xs font-bold uppercase flex items-center gap-2 shadow-none`}>
          <StatusIcon size={14} fill="currentColor" className="fill-none" />
          {status.label}
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Status Tracker */}
          <Card className="border-gray-100 shadow-sm overflow-hidden">
            <CardHeader className="bg-gray-50/50 border-b border-gray-100">
              <CardTitle className="text-lg flex items-center gap-2">
                <Package size={20} className="text-emerald-600" />
                Order Status
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-full ${status.color}`}>
                  <StatusIcon size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg mb-1">{status.label}</h4>
                  <p className="text-gray-500 leading-relaxed font-medium">
                    {status.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Items List */}
          <Card className="border-gray-100 shadow-sm overflow-hidden">
            <CardHeader className="bg-gray-50/50 border-b border-gray-100">
              <CardTitle className="text-lg">Order Items</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-100">
                {order.items.map((item) => (
                  <div key={item.productId} className="p-6 flex items-center gap-6">
                    <div className="w-20 h-20 bg-gray-50 rounded-xl overflow-hidden border border-gray-100 flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 mb-1">{item.name}</h4>
                      <p className="text-sm text-gray-500 font-medium">${item.price.toFixed(2)} x {item.quantity}</p>
                    </div>
                    <div className="text-right font-black text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          {/* Order Summary */}
          <Card className="border-gray-100 shadow-sm overflow-hidden">
            <CardHeader className="bg-gray-50/50 border-b border-gray-100">
              <CardTitle className="text-lg flex items-center gap-2">
                <Receipt size={20} className="text-emerald-600" />
                Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="flex justify-between text-gray-500 font-medium">
                <span>Subtotal</span>
                <span className="text-gray-900">${order.totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-500 font-medium">
                <span>Shipping</span>
                <span className="text-emerald-600 font-bold uppercase text-xs">Free</span>
              </div>
              <div className="flex justify-between text-gray-500 font-medium">
                <span>Tax</span>
                <span className="text-gray-900">$0.00</span>
              </div>
              <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                <span className="font-bold text-gray-900">Total</span>
                <span className="text-2xl font-black text-emerald-600">${order.totalAmount.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Payment & Shipping info (Mock) */}
          <Card className="border-gray-100 shadow-sm overflow-hidden">
            <CardContent className="p-6 space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-widest">
                  <MapPin size={14} />
                  Shipping Address
                </div>
                <div className="text-sm font-medium text-gray-600">
                  <p className="font-bold text-gray-900">John Doe</p>
                  <p>123 Grocery Lane, Fresh Market</p>
                  <p>Alexandria, Egypt</p>
                </div>
              </div>

              <div className="space-y-3 pt-6 border-t border-gray-100">
                <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-widest">
                  <CreditCard size={14} />
                  Payment Method
                </div>
                <div className="text-sm font-medium text-gray-600 flex items-center gap-2">
                  <div className="w-8 h-5 bg-gray-100 rounded flex items-center justify-center text-[10px] font-bold">VISA</div>
                  <span>Ending in 4242</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
