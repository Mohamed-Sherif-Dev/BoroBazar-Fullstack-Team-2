import {
  Clock3,
  Gift,
  CircleDollarSign,
  Tag,
  BarChart3,
  Loader2,
} from "lucide-react";

interface DashboardStatsProps {
  stats: {
    totalSales: number;
    totalUsers: number;
    totalOrders: number;
    totalProducts: number;
  };
  loading?: boolean;
}

export default function DashboardStats({ stats, loading }: DashboardStatsProps) {
  if (loading) {
    return (
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="flex items-center justify-center rounded-md px-4 py-8 bg-gray-200 animate-pulse text-gray-400"
          >
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
        ))}
      </section>
    );
  }

  const statItems = [
    {
      id: 1,
      title: "Total Users",
      value: stats.totalUsers,
      bg: "bg-emerald-500",
      leftIcon: Clock3,
      rightIcon: BarChart3,
    },
    {
      id: 2,
      title: "Total Orders",
      value: stats.totalOrders,
      bg: "bg-blue-500",
      leftIcon: Gift,
      rightIcon: Clock3,
    },
    {
      id: 3,
      title: "Total Products",
      value: stats.totalProducts,
      bg: "bg-indigo-500",
      leftIcon: Tag,
      rightIcon: BarChart3,
    },
    {
      id: 4,
      title: "Total Sales",
      value: `$${stats.totalSales}`,
      bg: "bg-pink-500",
      leftIcon: CircleDollarSign,
      rightIcon: BarChart3,
    },
  ];

  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {statItems.map((item) => {
        const LeftIcon = item.leftIcon;
        const RightIcon = item.rightIcon;

        return (
          <div
            key={item.id}
            className={`${item.bg} flex items-center justify-between rounded-md px-4 py-4 text-white`}
          >
            <div className="flex items-start gap-3">
              <LeftIcon size={20} strokeWidth={2} className="mt-1" />

              <div>
                <p className="text-sm font-medium text-white/90">{item.title}</p>
                <h3 className="text-[26px] font-bold leading-tight">
                  {item.value}
                </h3>
              </div>
            </div>

            <RightIcon size={24} strokeWidth={2} className="text-white/90" />
          </div>
        );
      })}
    </section>
  );
}