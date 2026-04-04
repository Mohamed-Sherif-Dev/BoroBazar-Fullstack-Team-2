import { heroData } from "../../../features/hero/data/hero.data";

type SectionHeaderProps = {
  title: string;
  subtitle?: string;
  categories?: string[];
  activeCategory?: string;
  onCategoryChange?: (category: string) => void;
  showViewAll?: boolean;
  onViewAll?: () => void;
};

export default function SectionHeader({
  title,
  subtitle,
  categories = [],
  activeCategory,
  onCategoryChange,
  showViewAll = false,
  onViewAll,
}: SectionHeaderProps) {
  return (
    <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div className="shrink-0">
        <h2 className="text-[22px] font-semibold leading-tight text-black">
          {title}
        </h2>

        {subtitle && (
          <p className="mt-1 text-[13px] text-gray-500">{subtitle}</p>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-end gap-5 overflow-x-auto border-b border-gray-200">
          {categories.map((category) => {
            const isActive = activeCategory === category;

            return (
              <button
                key={category}
                onClick={() => onCategoryChange?.(category)}
                className={`whitespace-nowrap pb-3 text-[12px] md:text-[13px] transition ${isActive
                  ? "border-b-2 border-[#56c4b4] text-[#3d3d3d]"
                  : "text-gray-500 hover:text-gray-700"
                  }`}
              >
                {category}
              </button>
            );
          })}

          {showViewAll && (
            <button
              onClick={onViewAll}
              className="ml-2 whitespace-nowrap pb-3 text-[12px] md:text-[13px] text-gray-500 hover:text-black"
            >
              View All
            </button>
          )}
          {(showViewAll || categories.length > 0) && (
            <button
              className="whitespace-nowrap pb-3 text-[18px] leading-none text-gray-500 hover:text-black"
              aria-label="Next"
            >
              <img className="h-4 w-4 object-contain opacity-50 hover:opacity-100" src={heroData.arrowImage} alt="arrow" />
            </button>
          )}

        </div>
      </div>
    </div>
  );
}