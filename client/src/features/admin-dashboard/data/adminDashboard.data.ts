import type {
  ChartItem,
  ProductItem,
  StatCardItem,
  UserItem,
} from "../types/admin-dashboard.types";

export const stats: StatCardItem[] = [
  { id: 1, title: "Total Sales", value: "$2859" },
  { id: 2, title: "New Orders", value: 837 },
  { id: 3, title: "Total Products", value: 50 },
  { id: 4, title: "New Users", value: 8 },
];

export const products: ProductItem[] = [];

export const users: UserItem[] = [];

export const salesData: ChartItem[] = [];
