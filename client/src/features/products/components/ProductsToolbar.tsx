import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface IProps{
    totalProducts:number
}

export default function ProductsToolbar({ totalProducts }: IProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between bg-[#f3f4f6] px-6 py-4 rounded-md mb-8 gap-4">
      {/* Product Number*/}
      <p className="text-gray-600 font-medium">
        There are <span className="text-emerald-600 font-bold">{totalProducts}</span> products.
      </p>

      {/* Product Sorting*/}
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <span className="text-gray-500 text-sm whitespace-nowrap">Sort By:</span>
        <Select defaultValue="name-az">
          <SelectTrigger className="w-full sm:w-[180px] bg-white border-none shadow-sm rounded-lg h-10 focus:ring-emerald-500">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="name-az">Name A to Z</SelectItem>
            <SelectItem value="name-za">Name Z to A</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}