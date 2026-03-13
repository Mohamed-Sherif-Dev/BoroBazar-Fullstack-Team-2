import { Request, Response } from 'express';
import Cart from '../models/Cart.model';

export const addToCart = async (req: Request, res: Response) => {
  try {
    const { userId, productId, quantity, price } = req.body;

    let cart = await Cart.findOne({ userId });

    if (cart) {

      const itemIndex = cart.items.findIndex(p => p.productId.toString() === productId);

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        
        cart.items.push({ productId, quantity, price });
      }
      
     
      cart.totalPrice += price * quantity;
      await cart.save();
      return res.status(200).json(cart);

    } else {
     
      const newCart = await Cart.create({
        userId,
        items: [{ productId, quantity, price }],
        totalPrice: price * quantity
      });
      return res.status(201).json(newCart);
    }
  } catch (error) {
    res.status(500).json({ message: "Error adding to cart", error });
  }
};


export const getCart = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
   
    const cart = await Cart.findOne({ userId }).populate('items.productId');
    
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart", error });
  }
};

export const deleteFromCart = async (req: Request, res: Response) => {
  try {
    const { userId, productId } = req.params;

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

  
    const itemToDelete = cart.items.find(item => item.productId.toString() === productId);
    
    if (itemToDelete) {
 
        cart.totalPrice -= itemToDelete.price * itemToDelete.quantity;
        
        cart.items = cart.items.filter(item => item.productId.toString() !== productId);
        
        await cart.save();
        return res.status(200).json({ message: "Product removed", cart });
    }

    res.status(404).json({ message: "Product not found in cart" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting item", error });
  }
};