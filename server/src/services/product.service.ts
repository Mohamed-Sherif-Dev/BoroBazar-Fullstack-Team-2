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


export interface SearchOptions {
  q?: string;
  category?: string;
  subCategory?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  sort?: string;
  page?: number;
  limit?: number;
}

export const searchProductsService = async (options: SearchOptions) => {
  const {
    q,
    category,
    subCategory,
    minPrice,
    maxPrice,
    minRating,
    sort,
    page = 1,
    limit = 20
  } = options;

  const filter: any = {};

  if (q) {
    filter.name = { $regex: q, $options: "i" };
  }

  if (category) {
    filter.category = category;
  }

  if (subCategory) {
    filter.subCategory = subCategory;
  }

  if (minPrice !== undefined || maxPrice !== undefined) {
    filter.price = {};
    if (minPrice !== undefined) filter.price.$gte = minPrice;
    if (maxPrice !== undefined) filter.price.$lte = maxPrice;
  }

  if (minRating !== undefined) {
    filter.rating = { $gte: minRating };
  }

  const skip = (page - 1) * limit;

  let sortQuery: any = { name: 1 }; // Default A-Z
  if (sort === "desc") {
    sortQuery = { name: -1 };
  } else if (sort === "priceAsc") {
    sortQuery = { price: 1 };
  } else if (sort === "priceDesc") {
    sortQuery = { price: -1 };
  } else if (sort === "rating") {
    sortQuery = { rating: -1 };
  }

  const products = await Product.find(filter)
    .sort(sortQuery)
    .skip(skip)
    .limit(limit)
    .populate("category");

  const total = await Product.countDocuments(filter);

  return {
    products,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit)
  };
};