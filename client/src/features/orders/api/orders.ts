import { MOCK_ORDERS } from "../data/mock-orders";
import type { IOrder } from "@/types/order.types";

export const getOrders = async (): Promise<IOrder[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800));
  return MOCK_ORDERS;
};

export const getOrderById = async (id: string): Promise<IOrder | undefined> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return MOCK_ORDERS.find((order) => order._id === id);
};
