import { Response } from "express";
import Address from "../models/address.model";
import { AuthRequest } from "../middlewares/auth.middleware";

export const getAddresses = async (req: AuthRequest, res: Response) => {
  try {
    const addresses = await Address.find({ userId: req.user?.userId });
    res.status(200).json({ success: true, data: addresses });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const addAddress = async (req: AuthRequest, res: Response) => {
  try {
    const { title, address, city, state, zipCode, country, phone, isDefault } = req.body;

    // If this address is set as default, unset others
    if (isDefault) {
      await Address.updateMany({ userId: req.user?.userId }, { isDefault: false });
    }

    const newAddress = await Address.create({
      userId: req.user?.userId,
      title,
      address,
      city,
      state,
      zipCode,
      country,
      phone,
      isDefault
    });

    res.status(201).json({ success: true, message: "Address added successfully", data: newAddress });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateAddress = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { title, address, city, state, zipCode, country, phone, isDefault } = req.body;

    // Check ownership
    const existingAddress = await Address.findOne({ _id: id, userId: req.user?.userId });
    if (!existingAddress) {
      return res.status(404).json({ success: false, message: "Address not found or unauthorized" });
    }

    if (isDefault) {
      await Address.updateMany({ userId: req.user?.userId }, { isDefault: false });
    }

    const updatedAddress = await Address.findByIdAndUpdate(
      id,
      { title, address, city, state, zipCode, country, phone, isDefault },
      { new: true, runValidators: true }
    );

    res.status(200).json({ success: true, message: "Address updated successfully", data: updatedAddress });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteAddress = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const address = await Address.findOneAndDelete({ _id: id, userId: req.user?.userId });
    if (!address) {
      return res.status(404).json({ success: false, message: "Address not found or unauthorized" });
    }

    res.status(200).json({ success: true, message: "Address deleted successfully" });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};
