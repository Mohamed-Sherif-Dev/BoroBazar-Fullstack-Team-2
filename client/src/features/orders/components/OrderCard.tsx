import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Package, Calendar, ArrowRight, CheckCircle2, Clock, Truck, XCircle } from "lucide-react";
import { Link } from "react-router-dom";
import type { IOrder, OrderStatus } from "@/types/order.types";

const statusConfig: Record<OrderStatus, { label: string; color: string; icon: any }> = {
  Pending: { label: "Pending", color: "bg-amber-100 text-amber-700 border-amber-200", icon: Clock },
  Processing: { label: "Processing", color: "bg-blue-100 text-blue-700 border-blue-200", icon: Package },
  Shipped: { label: "Shipped", color: "bg-purple-100 text-purple-700 border-purple-200", icon: Truck },
  Delivered: { label: "Delivered", color: "bg-emerald-100 text-emerald-700 border-emerald-200", icon: CheckCircle2 },
  Cancelled: { label: "Cancelled", color: "bg-rose-100 text-rose-700 border-rose-200", icon: XCircle },
};

export default function OrderCard({ order }: { order: IOrder }) {
  const status = statusConfig[order.status];
  const StatusIcon = status.icon;
  
  const date = new Date(order.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Card className="group w-full ring-0 rounded-xl border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full flex flex-col overflow-hidden bg-white">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider block">
              Order {order.orderNumber}
            </span>
            <div className="flex items-center gap-2 text-gray-500">
              <Calendar size={14} />
              <span className="text-xs font-medium">{date}</span>
            </div>
          </div>
          <Badge className={`${status.color} border px-2 py-0.5 text-[10px] font-bold uppercase flex items-center gap-1 shadow-none`}>
            <StatusIcon size={10} fill="currentColor" className="fill-none" />
            {status.label}
          </Badge>
        </div>

        {/* Order Items Preview */}
        <div className="flex -space-x-3 mb-6 overflow-hidden">
          {order.items.map((item, index) => (
            <div 
              key={`${order._id}-item-${index}`}
              className="w-12 h-12 rounded-lg border-2 border-white bg-gray-50 flex items-center justify-center overflow-hidden shadow-sm"
            >
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-full object-cover"
              />
            </div>
          ))}
          {order.items.length > 3 && (
            <div className="w-12 h-12 rounded-lg border-2 border-white bg-emerald-50 text-emerald-700 flex items-center justify-center text-xs font-bold shadow-sm z-10">
              +{order.items.length - 3}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500 font-medium">Items</span>
            <span className="text-sm font-bold text-gray-800">
              {order.items.reduce((acc, item) => acc + item.quantity, 0)} Products
            </span>
          </div>
          
          <div className="flex items-center justify-between pt-2 border-t border-gray-50">
            <span className="text-sm text-gray-500 font-medium">Total Amount</span>
            <span className="text-xl font-extrabold text-gray-900">${order.totalAmount.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0 border-none mt-auto">
        <Link to={`/orders/${order._id}`} className="w-full">
          <Button
            variant="outline"
            className="w-full border-gray-200 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 text-gray-700 font-bold py-5 text-sm rounded-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 group/btn"
          >
            View Order Details
            <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
