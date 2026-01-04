import type { Request, Response, NextFunction } from "express";
import { Auth } from "../models/auth.model.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import { AppError } from "../utils/appError.js";
import { httpStatusText } from "../utils/httpStatusText.js";
import { sendResponse } from "../utils/response.js";
import { generateToken } from "../utils/jwt.js";
import bcrypt from "bcrypt";

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

    const token = generateToken(user._id.toString());

    sendResponse(res, 201, "User created successfully", {
      user: { id: user._id, name: user.name, email: user.email },
      token,
    });
  }
);

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
    const token = generateToken(user._id.toString());
    await user.save();

    sendResponse(res, 200, "Login successful", {
      name: user.name,
      email: user.email,
      token: token,
    });
  }
);
