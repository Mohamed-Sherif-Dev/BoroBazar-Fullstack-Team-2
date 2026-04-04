import {
    LayoutGrid,
    Image,
    Grid2x2,
    Package,
    Circle,
    Users,
    ShoppingBag,
    Images,
    LogOut,
    ChevronDown,
    ChevronUp,
    ShoppingCart,
} from "lucide-react";
import { useState } from "react";

export type MenuItemId =
    | "dashboard" | "add-product" | "edit-product" | "add-user" | "edit-user" | "view-product"
    | "users" | "orders" | "banners" | "cart" | "logout" | "home-slides" | "category" | string;

type SidebarProps = {
    currentView?: MenuItemId;
    onNavigate?: (view: MenuItemId) => void;
};

const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutGrid },
    {
        label: "Home Slides", icon: Image, hasArrow: true,
        children: [{ id: "home-slides", label: "Slides List" }]
    },
    {
        label: "Category", icon: Grid2x2, hasArrow: true,
        children: [{ id: "category", label: "Category List" }]
    },
    {
        label: "Products",
        icon: Package,
        hasArrow: true,
        children: [
            { id: "dashboard", label: "Products List" },
            { id: "add-product", label: "Add Product" }
        ],
    },
    {
        label: "Users",
        icon: Users,
        hasArrow: true,
        children: [
            { id: "users", label: "Users List" },
            { id: "add-user", label: "Add User" }
        ]
    },
    { id: "orders", label: "Orders", icon: ShoppingBag },
    { id: "banners", label: "Banners", icon: Images },
    { id: "cart", label: "Cart", icon: ShoppingCart },
    { id: "logout", label: "Logout", icon: LogOut },
];

export default function Sidebar({ currentView = "dashboard", onNavigate = () => { } }: SidebarProps) {
    const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({
        "Products": true,
    });

    const handleMenuClick = (item: { id?: string; label: string; children?: { id: string; label: string }[]; hasArrow?: boolean }) => {
        if (item.id === "dashboard") {
            onNavigate("dashboard");
            return;
        }

        if (item.children || item.hasArrow) {
            setOpenMenus(prev => ({ ...prev, [item.label]: !prev[item.label] }));
        } else if (item.id) {
            onNavigate(item.id);
        }
    };

    return (
        <aside className="min-h-screen w-[250px] border-r border-gray-200 bg-white px-4 py-5 shrink-0">
            <div
                className="mb-8 flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => onNavigate("dashboard")}
            >
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-emerald-500 text-white">
                    <ShoppingBag size={22} />
                </div>
                <h1 className="text-[20px] font-bold text-gray-900">BoroBazar</h1>
            </div>

            <nav className="space-y-2">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isOpen = openMenus[item.label];
                    const isActive = item.id === currentView;

                    return (
                        <div key={item.label}>
                            <div
                                onClick={() => handleMenuClick(item)}
                                className={`flex cursor-pointer items-center justify-between rounded-md px-2 py-3 transition-colors ${isActive ? 'bg-emerald-50 text-emerald-600' : 'text-gray-700 hover:bg-gray-50'}`}
                            >
                                <div className="flex items-center gap-3">
                                    <Icon size={18} strokeWidth={1.8} className={isActive ? 'text-emerald-600' : ''} />
                                    <span className={`text-[15px] ${isActive ? 'font-medium' : ''}`}>{item.label}</span>
                                </div>

                                {item.hasArrow &&
                                    (isOpen ? (
                                        <ChevronUp size={16} strokeWidth={1.8} />
                                    ) : (
                                        <ChevronDown size={16} strokeWidth={1.8} />
                                    ))}
                            </div>

                            {item.children && isOpen && (
                                <div className="mt-1 ml-8 space-y-2">
                                    {item.children.map((child) => {
                                        const isChildActive = child.id === currentView;
                                        return (
                                            <div
                                                key={child.label}
                                                onClick={() => onNavigate(child.id)}
                                                className={`flex cursor-pointer items-center gap-3 py-2 text-sm transition-colors ${isChildActive ? 'text-emerald-600 font-medium' : 'text-gray-500 hover:text-gray-900'}`}
                                            >
                                                <Circle
                                                    size={10}
                                                    fill="currentColor"
                                                    strokeWidth={0}
                                                    className={isChildActive ? "text-emerald-500" : "text-gray-300"}
                                                />
                                                <span>{child.label}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    );
                })}
            </nav>
        </aside>
    );
}