import bcrypt from 'bcrypt';
import userModel from '../models/user.model';
import jwt from 'jsonwebtoken';
import { geenerateOTP } from '../utils/generateOtp';


export const registerUser = async (name: string, email: string, password: string) => {
    const existinguser = await userModel.findOne({ email });
    if (existinguser) {
        throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({ name, email, password: hashedPassword });
    return user;
}


export const loginUser = async (email: string, password: string) => {
  const user = await userModel.findOne({ email });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET as string,
    { expiresIn: "7d" }
  );

  return { user, token };
};


// export const forgotPassword = async (email: string) => {
//   const user = await userModel.findOne({ email });

//   if (!user) {
//     throw new Error("User not found");
//   }

//   const otp = geenerateOTP();
//   user.otp = otp;
//   user.otpExpires = new Date(Date.now() + 10 * 60 * 1000); // OTP valid for 10 minutes
//   await user.save();

//   return {
//     message: "OTP sent to email",
//     otp, // In production, you would send this OTP via email instead of returning it in the response
//   }
// }

export const forgotPassword = async (email: string) => {

  const user = await userModel.findOne({ email });

  if (!user) {
    throw new Error("User not found");
  }

  const otp = "444222"; // OTP ثابت مؤقت

  user.otp = otp;

  user.otpExpires = new Date(Date.now() + 10 * 60 * 1000);

  await user.save();

  return {
    message: "OTP sent successfully"
  };
};


export const verifyOtp = async (email: string, otp: string) => {

  const user = await userModel.findOne({ email });

  if (!user) {
    throw new Error("User not found");
  }

  if (user.otp !== otp) {
    throw new Error("Invalid OTP");
  }

  if (user.otpExpires && user.otpExpires < new Date()) {
    throw new Error("OTP expired");
  }

  return {
    message: "OTP verified successfully"
  };
};



export const resetPassword = async (
  email: string,
  newPassword: string
) => {

  const user = await userModel.findOne({ email });

  if (!user) {
    throw new Error("User not found");
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  user.password = hashedPassword;

  user.otp = undefined;
  user.otpExpires = undefined;

  await user.save();

  return {
    message: "Password reset successfully"
  };
};