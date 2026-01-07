import type { Request, Response, NextFunction } from "express";
import { Auth } from "../models/auth.model.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import { AppError } from "../utils/appError.js";
import { httpStatusText } from "../utils/httpStatusText.js";
import { sendResponse } from "../utils/response.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt.js";
import bcrypt from "bcrypt";
import { UpdateUserDTO } from "../types/update-user-DTO.js";

// Register controller
export const register = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return next(
        new AppError("Fields are required", httpStatusText.FAIL, 400)
      );

    const existingUser = await Auth.findOne({ email });
    if (existingUser)
      return next(
        new AppError("Email already registered", httpStatusText.FAIL, 409)
      );

    const user = await Auth.create({
      name,
      email,
      password,
    });

    // Generate tokens
    const accessToken = generateAccessToken(user._id.toString());

    const refreshToken = generateRefreshToken(user._id.toString());
    user.refreshToken = refreshToken;

    await user.save();
    sendResponse(res, 201, "User created successfully", {
      accessToken: accessToken,
      refreshToken: refreshToken,
      user: { id: user._id, name: user.name, email: user.email },
    });
  }
);

// Login controller
export const login = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    if (!email || !password)
      return next(
        new AppError("Fields are required", httpStatusText.FAIL, 400)
      );
    const user = await Auth.findOne({ email: email }).select("+password");
    if (!user)
      return next(
        new AppError("Invalid email or password", httpStatusText.FAIL, 401)
      );
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return next(
        new AppError("Invalid email or password", httpStatusText.FAIL, 401)
      );
    // Generate tokens
    const accessToken = generateAccessToken(user._id.toString());

    const refreshToken = generateRefreshToken(user._id.toString());
    user.refreshToken = refreshToken;

    await user.save();

    sendResponse(res, 200, "Login successful", {
      name: user.name,
      email: user.email,
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  }
);

// Update profile controller
export const updateMe = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?._id;
    const { ...data }: UpdateUserDTO = req.body;

    if (data.password)
      return next(
        new AppError(
          "This route is not for updating password",
          httpStatusText.ERROR,
          499
        )
      );
    const updatedUser = await Auth.findByIdAndUpdate(
      userId,
      {
        $set: { name: data.name, email: data.email },
      },
      { new: true, runValidators: true }
    ).select("-password");
    sendResponse(res, 200, "Profile updated successfully", {
      user: updatedUser,
    });
  }
);

// Change password controller
export const changePassword = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?._id;
    const { currentPassword, newPassword } = req.body;

    const user = await Auth.findById(userId);
    if (!user)
      return next(new AppError("User not found", httpStatusText.ERROR, 400));

    const isCorrect = await user.comparePassword(currentPassword);
    if (!isCorrect)
      return next(
        new AppError("Incorrect current password", httpStatusText.FAIL, 401)
      );
    user.password = newPassword;
    await user.save();

    sendResponse(res, 200, "Password updated successfully");
  }
);

// Refresh token
export const refreshToken = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { refreshToken } = req.body;
    if (!refreshToken)
      return next(
        new AppError("Refresh token is required", httpStatusText.FAIL, 400)
      );

    const decoded = verifyRefreshToken(refreshToken);
    if (!decoded)
      return next(
        new AppError(
          "Invalid or expired refresh token",
          httpStatusText.FAIL,
          401
        )
      );

    const user = await Auth.findById(decoded.id).select("+refreshToken");
    if (!user || user.refreshToken !== refreshToken)
      return next(
        new AppError(
          "Token mismatch or user not found",
          httpStatusText.FAIL,
          403
        )
      );

    const newAccessToken = generateAccessToken(user._id.toString());

    sendResponse(res, 200, "Token refreshed successfully", {
      accessToken: newAccessToken,
    });
  }
);
