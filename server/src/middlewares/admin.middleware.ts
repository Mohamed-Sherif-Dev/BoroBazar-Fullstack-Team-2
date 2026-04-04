import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth.middleware";

/**
 * Middleware to check if the authenticated user has an admin role.
 * Should be used AFTER authMiddleware.
 */
export const adminMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: "Access denied: Admin privileges required",
    });
  }
};
