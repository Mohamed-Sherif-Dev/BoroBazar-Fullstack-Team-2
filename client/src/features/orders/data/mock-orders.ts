import type { IOrder } from "@/types/order.types";

export const MOCK_ORDERS: IOrder[] = [
  {
    _id: "order_1",
    orderNumber: "ORD-2024-001",
    items: [
      {
        productId: "prod_1",
        name: "Premium Organic Green Tea",
        image: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?q=80&w=200&auto=format&fit=crop",
        price: 24.99,
        quantity: 2
      },
      {
        productId: "prod_2",
        name: "Artisan Coffee Beans",
        image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=200&auto=format&fit=crop",
        price: 18.50,
        quantity: 1
      }
    ],
    totalAmount: 68.48,
    status: "Delivered",
    createdAt: "2024-03-15T10:30:00Z",
    updatedAt: "2024-03-18T14:20:00Z"
  },
  {
    _id: "order_2",
    orderNumber: "ORD-2024-002",
    items: [
      {
        productId: "prod_3",
        name: "Himalayan Pink Salt",
        image: "https://images.unsplash.com/photo-1518110925495-5fe2fda0442c?q=80&w=200&auto=format&fit=crop",
        price: 12.00,
        quantity: 3
      }
    ],
    totalAmount: 36.00,
    status: "Processing",
    createdAt: "2024-03-25T08:15:00Z",
    updatedAt: "2024-03-25T08:15:00Z"
  },
  {
    _id: "order_3",
    orderNumber: "ORD-2024-003",
    items: [
      {
        productId: "prod_4",
        name: "Extra Virgin Olive Oil",
        image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=200&auto=format&fit=crop",
        price: 35.00,
        quantity: 1
      }
    ],
    totalAmount: 35.00,
    status: "Shipped",
    createdAt: "2024-03-20T16:45:00Z",
    updatedAt: "2024-03-22T09:10:00Z"
  }
];
