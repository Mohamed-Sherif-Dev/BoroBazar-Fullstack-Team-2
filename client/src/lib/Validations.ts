// import { z } from "zod";

// export const loginSchema = z.object({
//   email: z
//     .string()
//     .min(1, "Email is required")
//     .email("Enter a valid email address"),
//   password: z
//     .string()
//     .min(1, "Password is required")
//     .min(6, "Password must be at least 6 characters"),
//   rememberMe: z.boolean().optional(),
// });

// export const registerSchema = z
//   .object({
//     name: z
//       .string()
//       .min(1, "Name is required")
//       .min(2, "Name must be at least 2 characters"),
//     email: z
//       .string()
//       .min(1, "Email is required")
//       .email("Enter a valid email address"),
//     password: z
//       .string()
//       .min(1, "Password is required")
//       .min(6, "Password must be at least 6 characters")
//       .regex(/[A-Z]/, "Must contain at least one uppercase letter")
//       .regex(/[0-9]/, "Must contain at least one number"),
//     // confirmPassword: z.string().min(1, "Please confirm your password"),
//     rememberMe: z.boolean().optional(),
//   })
//   // .refine((data) => data.password === data.confirmPassword, {
//   //   message: "Passwords do not match",
//   //   path: ["confirmPassword"],
//   // });

// export const forgotPasswordSchema = z.object({
//   email: z
//     .string()
//     .min(1, "Email is required")
//     .email("Enter a valid email address"),
// });

// export const verifyOTPSchema = z.object({
//   otp: z
//     .string()
//     .min(1, "OTP is required")
//     .length(6, "OTP must be exactly 6 digits")
//     .regex(/^\d+$/, "OTP must contain only numbers"),
// });

// export type LoginSchema = z.infer<typeof loginSchema>;
// export type RegisterSchema = z.infer<typeof registerSchema>;
// export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
// export type VerifyOTPSchema = z.infer<typeof verifyOTPSchema>;




import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().optional(),
});

export const registerSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[0-9]/, "Must contain at least one number"),
  rememberMe: z.boolean().optional(),
});

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
});

export const verifyOTPSchema = z.object({
  otp: z
    .string()
    .min(1, "OTP is required")
    .length(6, "OTP must be exactly 6 digits")
    .regex(/^\d+$/, "OTP must contain only numbers"),
});

export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
export type VerifyOTPSchema = z.infer<typeof verifyOTPSchema>;