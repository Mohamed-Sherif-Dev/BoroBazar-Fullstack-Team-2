import Category from "../models/Category.models";

export const createCategoryService = async (data: {
  name: string;
  image: string;
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