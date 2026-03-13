


const CATEGORIES = [
    { name: "Fruits & Vegetables", icon: "🍎" },
    { name: "Meats & Seafood", icon: "🍖" },
    { name: "Breakfast & Dairy", icon: "🍳" },
    { name: "Breads & Bakery", icon: "🍞" },
    { name: "Beverages", icon: "🥤" },
    { name: "Frozen Foods", icon: "🍦" },
    { name: "Biscuits & Snacks", icon: "🍪" },
    { name: "Grocery & Staples", icon: "📦" },
    { name: "Baby & Pregnancy", icon: "🍼" },
    { name: "Healthcare", icon: "💊" },
];

export default function TopCategories() {
    return (
        <section id="top-categories" className="mt-10 mb-12">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-baseline gap-3">
                    <h2 className="text-xl sm:text-2xl font-bold text-heading">
                        Top Categories
                    </h2>
                    <span className="text-xs text-body hidden sm:inline">
                        New products with updated stocks.
                    </span>
                </div>
                <a
                    href="#"
                    className="text-sm font-medium text-body hover:text-primary transition-colors flex items-center gap-1"
                >
                    View All
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 5l7 7-7 7"
                        />
                    </svg>
                </a>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-4">
                {CATEGORIES.map((cat, index) => (
                    <div
                        key={index}
                        className="group cursor-pointer flex flex-col items-center"
                    >
                        <div className="w-full aspect-square rounded-xl bg-gray-50 flex items-center justify-center mb-3 transition-all group-hover:bg-white group-hover:shadow-md border border-transparent group-hover:border-gray-100">
                            <span className="text-3xl group-hover:scale-110 transition-transform duration-300">
                                {cat.icon}
                            </span>
                        </div>
                        <span className="text-[11px] sm:text-xs font-medium text-heading text-center line-clamp-2 leading-tight">
                            {cat.name}
                        </span>
                    </div>
                ))}
            </div>
        </section>
    );
}
