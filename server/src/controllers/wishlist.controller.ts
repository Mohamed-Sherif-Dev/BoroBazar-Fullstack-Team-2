import { Response } from 'express';
import mongoose from 'mongoose';
import Wishlist from '../models/Wishlist.model'; 
import { AuthRequest } from '../middlewares/auth.middleware';

export const toggleWishlist = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    const { productId } = req.body;

    if (!userId || !mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid User or Product ID" });
    }

    let wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      wishlist = await Wishlist.create({ 
        userId, 
        products: [productId] 
      });
      return res.status(201).json({ message: "Added to wishlist", wishlist });
    } else {
      const productIndex = wishlist.products.indexOf(productId);

      if (productIndex > -1) {
        wishlist.products.splice(productIndex, 1);
        await wishlist.save();
        return res.status(200).json({ message: "Removed from wishlist", wishlist });
      } else {
        wishlist.products.push(productId);
        await wishlist.save();
        return res.status(200).json({ message: "Added to wishlist", wishlist });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Error in wishlist toggle", error });
  }
};

export const getWishlist = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    const wishlist = await Wishlist.findOne({ userId }).populate('products');
    
    if (!wishlist) return res.status(404).json({ message: "Wishlist empty" });
    res.status(200).json(wishlist);
  } catch (error) {
    res.status(500).json({ message: "Error fetching wishlist", error });
  }
};

export const removeFromWishlist = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    const { productId } = req.params;

    const wishlist = await Wishlist.findOneAndUpdate(
      { userId },
      { $pull: { products: productId } },
      { new: true }
    );

    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    res.status(200).json({ message: "Product removed from wishlist", wishlist });
  } catch (error) {
    res.status(500).json({ message: "Error removing from wishlist", error });
  }
};