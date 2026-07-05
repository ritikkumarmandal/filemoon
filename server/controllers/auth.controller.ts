import { Request, Response, NextFunction } from "express";
import authService from "../services/auth.service";
import {
  loginSchema,
  registerSchema,
} from "../validators/auth.validator";

class AuthController {
  /**
   * Register User
   */
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const data = registerSchema.parse(req.body);

      const result = await authService.register(data);

      res.cookie("refreshToken", result.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.status(201).json({
        success: true,
        message: "User registered successfully",
        user: result.user,
        accessToken: result.accessToken,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Login User
   */
  async login(req: Request, res: Response, next: NextFunction) {
  try {
    const data = loginSchema.parse(req.body);

    const result = await authService.login(data);

    // ✅ Access Token Cookie
    res.cookie("accessToken", result.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    // ✅ Refresh Token Cookie
    res.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: result.user,
    });
  } catch (error) {
    next(error);
  }
}

  /**
   * Logout User
   */
  async logout(req: Request, res: Response) {
    res.clearCookie("refreshToken");

    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  }
}

export const getCurrentUser = async (
  req: Request,
  res: Response
) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

export default new AuthController();