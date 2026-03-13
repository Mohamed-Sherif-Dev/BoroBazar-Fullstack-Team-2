import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Wishlist from '../models/Wishlist.model'; 
export const toggleWishlist = async (req: Request, res: Response) => {
  try {
    const { userId, productId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(productId)) {
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

export const getWishlist = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const wishlist = await Wishlist.findOne({ userId }).populate('products');
    
    if (!wishlist) return res.status(404).json({ message: "Wishlist empty" });
    res.status(200).json(wishlist);
  } catch (error) {
    res.status(500).json({ message: "Error fetching wishlist", error });
  }
};

export const removeFromWishlist = async (req: Request, res: Response) => {
  try {
    const { userId, productId } = req.params;

    // بنحدث الـ Wishlist ونشيل الـ productId من الـ array باستخدام $pull
    const wishlist = await Wishlist.findOneAndUpdate(
      { userId },
      { $pull: { products: productId } },
      { new: true } // عشان يرجع الـ wishlist بعد التعديل
    );

    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    res.status(200).json({ message: "Product removed from wishlist", wishlist });
  } catch (error) {
    res.status(500).json({ message: "Error removing from wishlist", error });
  }
};