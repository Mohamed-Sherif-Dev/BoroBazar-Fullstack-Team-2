import { Request, Response } from "express";
import { registerUser, loginUser, forgotPassword, verifyOtp, resetPassword } from "../services/auth.service";


export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const user = await registerUser(name, email, password);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};


export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const result = await loginUser(email, password);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};




export const forgotPasswordController = async (req: Request, res: Response) => {
  try {

    const { email } = req.body;

    const result = await forgotPassword(email);

    res.status(200).json({
      success: true,
      message: result.message
    });

  } catch (error: any) {

    res.status(400).json({
      success: false,
      message: error.message
    });

  }
};


export const verifyOtpController = async (req: Request, res: Response) => {
  try {

    const { email, otp } = req.body;

    const result = await verifyOtp(email, otp);

    res.status(200).json({
      success: true,
      message: result.message
    });

  } catch (error: any) {

    res.status(400).json({
      success: false,
      message: error.message
    });

  }
};



export const resetPasswordController = async (req: Request, res: Response) => {
  try {

    const { email, newPassword } = req.body;

    const result = await resetPassword(email, newPassword);

    res.status(200).json({
      success: true,
      message: result.message
    });

  } catch (error: any) {

    res.status(400).json({
      success: false,
      message: error.message
    });

  }
};