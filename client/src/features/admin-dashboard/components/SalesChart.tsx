import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { api } from "../../../services/api";
import type { ChartItem } from "../types/admin-dashboard.types";

export default function SalesChart() {
  const [salesChartData, setSalesChartData] = useState<ChartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const result = await api.getSalesData();
        setSalesChartData(result.data);
      } catch (error) {
        console.error("Failed to fetch sales chart data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSalesData();
  }, []);

  if (loading) {
    return (
      <section className="rounded-md border border-gray-200 bg-gray-50 p-2 shadow-sm flex items-center justify-center h-[380px]">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </section>
    );
  }

  return (
    <section className="rounded-md border border-gray-200 bg-white p-2 shadow-sm">
      <div className="mb-2">
        <h2 className="text-[14px] font-semibold leading-none text-[#222]">
          Total Users & Total Sales
        </h2>

        <div className="mt-1 flex items-center gap-3 text-[11px] text-gray-500">
          <div className="flex items-center gap-1">
            <span className="h-[7px] w-[7px] rounded-full bg-blue-600" />
            <span>Total Users</span>
          </div>

          <div className="flex items-center gap-1">
            <span className="h-[7px] w-[7px] rounded-full bg-green-500" />
            <span>Total Sales</span>
          </div>
        </div>
      </div>

      <div className="h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={salesChartData}
            margin={{ top: 8, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid vertical={false} stroke="#e5e7eb" />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 10, fill: "#6b7280" }}
              tickLine={false}
              axisLine={{ stroke: "#d1d5db" }}
            />
            <YAxis
              tick={{ fontSize: 10, fill: "#6b7280" }}
              tickLine={false}
              axisLine={{ stroke: "#d1d5db" }}
            />
            <Tooltip />

            <Bar
              dataKey="totalSales"
              fill="#22c55e"
              radius={[2, 2, 0, 0]}
              barSize={22}
            />
            <Bar
              dataKey="totalUsers"
              fill="#2563eb"
              radius={[2, 2, 0, 0]}
              barSize={22}
            />
          </BarChart>
        </ResponsiveContainer>

      </div>
      <div className="mt-2 flex items-center justify-center gap-4 text-[11px] text-gray-500">
        <div className="flex items-center gap-1">
          <span className="h-[8px] w-[8px] bg-green-500" />
          <span>TotalSales</span>
        </div>

        <div className="flex items-center gap-1">
          <span className="h-[8px] w-[8px] bg-blue-600" />
          <span>TotalUsers</span>
        </div>

      </div>

    </section>
  );
}