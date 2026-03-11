import Product from "../models/Product.model";


export const getLatestProductsService = async () => {

 return await Product.find()
 .sort({ createdAt: -1 })
 .limit(10)
 .populate("category");

};

export const getFeaturedProductsService = async () => {

 return await Product.find({
  isFeatured: true
 }).populate("category");

};

export const getPopularProductsService = async () => {

 return await Product.find({
  isPopular: true
 }).populate("category");

};

export const getProductsByCategoryService = async (categoryId: string) => {

 return await Product.find({
  category: categoryId
 }).populate("category");

};


export const getProductByIdService = async (productId: string) => {

 return await Product.findById(productId)
 .populate("category");

};

export const getRelatedProductsService = async (productId: string) => {

  const product = await Product.findById(productId);

  if (!product) {
    throw new Error("Product not found");
  }

  const relatedProducts = await Product.find({
    category: product.category,
    _id: { $ne: productId } // exclude the same product
  })
  .limit(6)
  .populate("category");

  return relatedProducts;
};


export const searchProductsService = async (query: string) => {

  return await Product.find({
    name: { $regex: query, $options: "i" } // case-insensitive search
  })
  .limit(10)
  .populate("category");

};