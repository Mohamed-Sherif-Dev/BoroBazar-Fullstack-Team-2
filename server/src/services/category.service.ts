import Category from "../models/Category.models";

export const createCategoryService = async (data: {
  name: string;
  image: string;
  subCategories?: string[];
}) => {
  const category = await Category.create(data);
  return category;
};

export const getAllCategoriesService = async () => {
  const categories = await Category.find({ isActive: true }).sort({
    createdAt: -1,
  });

  return categories;
};

export const deleteCategoryById = async (id: string) => {
  return await Category.findByIdAndDelete(id);
};

export const removeSubCategoryByName = async (id: string, subName: string) => {
  return await Category.findByIdAndUpdate(
    id,
    { $pull: { subCategories: subName } },
    { new: true }
  );
};

export const addSubCategoriesService = async (id: string, subCats: string[]) => {
  return await Category.findByIdAndUpdate(
    id,
    { $addToSet: { subCategories: { $each: subCats } } },
    { new: true }
  );
};