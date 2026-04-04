import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  image: string;
  price: number;
  oldPrice?: number;
  rating: number;
  category: mongoose.Types.ObjectId | string;
  subCategory?: string;
  brand?: string;
  stock?: number;
  sales?: number;
  isFeatured: boolean;
  isPopular: boolean;
}

const ProductSchema = new Schema(
{
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },

  image: {
    type: String,
    required: true
  },

  price: {
    type: Number,
    required: true
  },

  oldPrice: {
    type: Number
  },

  rating: {
    type: Number,
    default: 4
  },

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true
  },

  subCategory: {
    type: String
  },

  brand: {
    type: String,
    default: ""
  },

  stock: {
    type: Number,
    default: 0
  },

  sales: {
    type: Number,
    default: 0
  },

  isFeatured: {
    type: Boolean,
    default: false
  },

  isPopular: {
    type: Boolean,
    default: false
  }

},
{ timestamps: true }
);

export default mongoose.model<IProduct>("Product", ProductSchema);