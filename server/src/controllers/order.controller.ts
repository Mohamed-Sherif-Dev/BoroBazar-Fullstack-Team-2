import { Request, Response } from 'express';
import Order from '../models/Order.model';
import Cart from '../models/Cart.model';

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { userId, shippingAddress, paymentMethod } = req.body;

    const cart = await Cart.findOne({ userId });
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "العربة فارغة، لا يمكن إتمام الطلب" });
    }

    const newOrder = await Order.create({
      userId,
      items: cart.items,
      totalPrice: cart.totalPrice,
      shippingAddress,
      paymentMethod
    });

    await Cart.findOneAndDelete({ userId });

    res.status(201).json({ message: "تم تسجيل الطلب بنجاح", newOrder });
  } catch (error) {
    res.status(500).json({ message: "خطأ أثناء إتمام الطلب", error });
  }
};

export const getUserOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "خطأ في جلب الطلبات", error });
  }
};