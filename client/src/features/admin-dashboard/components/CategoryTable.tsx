import { useMemo, useState, Fragment } from "react";
import { Search, Plus, Loader2, Trash2, XCircle, ChevronDown, ChevronRight, Hash } from "lucide-react";
import { useAddSubCategories, useCategories, useCreateCategory, useDeleteCategory, useDeleteSubCategory } from "../../../hooks/useCategories";
import { cn } from "@/lib/utils";

type CategoryData = {
  id: string;
  category: string;
  subCategory: string;
  subCategoriesList: string[];
  productCount: number;
};

export default function CategoryTable() {
  const [search, setSearch] = useState("");
  const [newCatName, setNewCatName] = useState("");
  const [selectedParentId, setSelectedParentId] = useState<string>("new");
  const [newSubCatName, setNewSubCatName] = useState("");
  const [expandedCats, setExpandedCats] = useState<Record<string, boolean>>({});
  
  const { data: fetchedCategories = [], isLoading } = useCategories();
  const createCategoryMutation = useCreateCategory();
  const deleteCategoryMutation = useDeleteCategory();
  const deleteSubCategoryMutation = useDeleteSubCategory();
  const addSubCategoryMutation = useAddSubCategories();

  const toggleExpand = (id: string) => {
    setExpandedCats(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    
    const subCats = newSubCatName ? newSubCatName.split(",").map(s => s.trim()).filter(Boolean) : [];
    
    // CASE 1: Adding subcategories to an existing category
    if (selectedParentId !== "new") {
      if (subCats.length === 0) {
        alert("Please enter at least one subcategory!");
        return;
      }

      addSubCategoryMutation.mutate({
        id: selectedParentId,
        subCats
      }, {
        onSuccess: () => {
          setNewSubCatName("");
          alert(`Added subcategories successfully!`);
        },
        onError: (err: any) => {
          alert("Failed to add subcategories: " + (err?.response?.data?.message || err.message));
        }
      });
      return;
    }

    // CASE 2: Creating a brand new category
    if (!newCatName.trim()) {
      alert("Please enter a category name!");
      return;
    }

    // Check if category already exists locally to prevent duplicates
    const existingCat = fetchedCategories.find((c: any) => c.name.toLowerCase() === newCatName.toLowerCase());
    if (existingCat) {
      alert(`Category "${newCatName}" already exists! Select it from the dropdown to add subcategories.`);
      return;
    }

    createCategoryMutation.mutate({
      name: newCatName,
      subCategories: subCats,
      image: "https://picsum.photos/200" // placeholder
    }, {
      onSuccess: (data: any) => {
        setNewCatName("");
        setNewSubCatName("");
        setSelectedParentId(data._id); // Auto-select the new category
        alert("Category created successfully!");
      },
      onError: (err: any) => {
        alert("Failed to create category: " + (err?.response?.data?.message || err.message));
      }
    });
  };

  const handleDeleteCategory = (id: string, name: string, hasSubs: boolean) => {
    if (hasSubs) {
      alert(`Cannot delete category "${name}" because it has subcategories. Please remove all subcategories first.`);
      return;
    }

    if (window.confirm(`Are you sure you want to delete the category "${name}"?`)) {
      deleteCategoryMutation.mutate(id, {
        onError: (err: any) => {
          alert("Failed to delete category: " + (err?.response?.data?.message || err.message));
        }
      });
    }
  };

  const handleDeleteSubCategory = (id: string, subName: string) => {
    if (window.confirm(`Are you sure you want to remove the subcategory "${subName}"?`)) {
      deleteSubCategoryMutation.mutate({ id, subName }, {
        onError: (err: any) => {
          alert("Failed to remove subcategory: " + (err?.response?.data?.message || err.message));
        }
      });
    }
  };

  const categoriesData = useMemo(() => {
    const records: CategoryData[] = [];
    
    fetchedCategories.forEach((cat: any) => {
      records.push({
        id: cat._id,
        category: cat.name,
        subCategoriesList: cat.subCategories || [],
        subCategory: cat.subCategories && cat.subCategories.length > 0 ? cat.subCategories.join(", ") : "-",
        productCount: 0,
      });
    });

    return records;
  }, [fetchedCategories]);


  const filteredCategories = useMemo(() => {
    return categoriesData.filter((item) => {
      const keyword = search.toLowerCase();
      return (
        item.category.toLowerCase().includes(keyword) ||
        item.subCategory.toLowerCase().includes(keyword)
      );
    });
  }, [categoriesData, search]);

  return (
    <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="flex flex-col gap-3 border-b border-gray-200 px-4 py-3 md:flex-row md:items-center md:justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Categories & Subcategories</h2>

        <div className="relative w-full md:w-[280px] lg:w-[320px]">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search category or subcategory..."
            className="h-10 w-full rounded-md border border-gray-200 bg-gray-50 pl-9 pr-3 text-sm outline-none placeholder:text-gray-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
          />
        </div>
      </div>
      
      {/* ADD CATEGORY INLINE FORM */}
      <div className="bg-gray-50 border-b border-gray-200 px-4 py-4">
        <form onSubmit={handleAddCategory} className="space-y-4">
          <div className="flex flex-col md:flex-row items-end gap-4">
            <div className="flex-[2] w-full">
              <label className="text-[11px] font-bold text-gray-500 mb-1.5 block uppercase tracking-wider">Parent Category</label>
              <select 
                value={selectedParentId}
                onChange={(e) => setSelectedParentId(e.target.value)}
                className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
              >
                <option value="new">+ Create New Category</option>
                {fetchedCategories.map((cat: any) => (
                  <option key={cat._id} value={cat._id}>{cat.name}</option>
                ))}
              </select>
            </div>

            {selectedParentId === "new" && (
              <div className="flex-[2] w-full animate-in fade-in slide-in-from-left-2 duration-300">
                <label className="text-[11px] font-bold text-gray-500 mb-1.5 block uppercase tracking-wider">New Category Name</label>
                <input 
                  type="text" 
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  placeholder="e.g. Groceries"
                  className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
            )}

            <div className="flex-[3] w-full">
              <label className="text-[11px] font-bold text-gray-500 mb-1.5 block uppercase tracking-wider">
                Subcategories {selectedParentId !== "new" ? "to add" : "(optional)"}
              </label>
              <input 
                type="text" 
                value={newSubCatName}
                onChange={(e) => setNewSubCatName(e.target.value)}
                placeholder="e.g. Fruits, Vegetables"
                className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            <button 
              type="submit"
              disabled={createCategoryMutation.isPending || addSubCategoryMutation.isPending}
              className="h-10 px-6 bg-[#11b886] hover:bg-[#0fa679] text-white text-sm font-semibold rounded-md flex items-center justify-center gap-2 transition-all disabled:opacity-70 whitespace-nowrap shadow-sm hover:shadow-md active:transform active:scale-95"
            >
              {createCategoryMutation.isPending || addSubCategoryMutation.isPending ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Plus size={18} />
              )}
              {selectedParentId === "new" ? "Create Category" : "Add Subcategories"}
            </button>
          </div>
          {selectedParentId !== "new" && (
            <p className="text-[11px] text-gray-500 italic">
              Linking subcategories to: <span className="font-semibold text-emerald-600">
                {fetchedCategories.find((c: any) => c._id === selectedParentId)?.name}
              </span>
            </p>
          )}
        </form>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold uppercase text-gray-500">
              <th className="px-6 py-4">Category Name</th>
              <th className="px-6 py-4">SubCategory Name</th>
              <th className="px-6 py-4 text-center">Total Products</th>
              <th className="px-6 py-4 text-right pr-10">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                  <Loader2 size={24} className="animate-spin mx-auto text-emerald-500" />
                </td>
              </tr>
            ) : filteredCategories.length > 0 ? (
              filteredCategories.map((item) => (
                <Fragment key={item.id}>
                  {/* Parent Row */}
                  <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => toggleExpand(item.id)}
                          className={cn(
                            "p-1 hover:bg-gray-100 rounded transition-transform duration-200",
                            expandedCats[item.id] && "rotate-0"
                          )}
                        >
                          {item.subCategoriesList.length > 0 ? (
                            expandedCats[item.id] ? <ChevronDown size={16} className="text-emerald-600" /> : <ChevronRight size={16} className="text-gray-400" />
                          ) : (
                            <div className="w-4" />
                          )}
                        </button>
                        <span className="font-bold text-gray-900 flex items-center gap-1.5">
                          {item.category}
                          <span className="text-[10px] bg-emerald-50 text-emerald-600 px-1.5 py-0.5 rounded border border-emerald-100">Parent</span>
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-xs italic">
                      {item.subCategoriesList.length} subcategories
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-xs font-medium text-gray-800">
                        {item.productCount}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right pr-10">
                      <button
                        onClick={() => handleDeleteCategory(item.id, item.category, item.subCategoriesList.length > 0)}
                        disabled={deleteCategoryMutation.isPending}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                        title="Delete whole category"
                      >
                        {deleteCategoryMutation.isPending ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={18} />}
                      </button>
                    </td>
                  </tr>

                  {/* Subcategory Rows (Tree View) */}
                  {expandedCats[item.id] && item.subCategoriesList.map((sub) => (
                    <tr key={`${item.id}-${sub}`} className="bg-emerald-50/20 border-b border-emerald-50/50 animate-in fade-in slide-in-from-top-1 duration-200">
                      <td className="px-6 py-3 pl-14">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-l-2 border-b-2 border-emerald-200 rounded-bl-md -mt-4 mr-0.5" />
                          <Hash size={12} className="text-emerald-400" />
                          <span className="text-sm font-medium text-gray-700">{sub}</span>
                        </div>
                      </td>
                      <td className="px-6 py-3 text-gray-400 text-xs pl-14">
                        Linked to {item.category}
                      </td>
                      <td className="px-6 py-3 text-center">
                        <span className="text-[10px] text-gray-400 italic">Linked</span>
                      </td>
                      <td className="px-6 py-3 text-right pr-10">
                        <button 
                          onClick={() => handleDeleteSubCategory(item.id, sub)}
                          className="p-1 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded transition-all"
                          title={`Delete subcategory ${sub}`}
                        >
                          <XCircle size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </Fragment>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                  No categories found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
