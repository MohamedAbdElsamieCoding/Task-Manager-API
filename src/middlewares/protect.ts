import type { Request, Response, NextFunction } from "express";
import { httpStatusText } from "../utils/httpStatusText.js";
import { asyncHandler } from "./asyncHandler.js";
import { AppError } from "../utils/appError.js";
import { verifyToken, type JwtPayload } from "../utils/jwt.js";
import { Auth } from "../models/auth.model.js";

export const protect = asyncHandler(
  async (req: Request, _res: Response, next: NextFunction) => {
    const authHeaders = req.headers.authorization;
    if (!authHeaders || !authHeaders.startsWith("Bearer"))
      return next(new AppError("Not authorized", httpStatusText.ERROR, 401));

    const token: string = authHeaders.split(" ")[1];
    const decoded = verifyToken(token) as JwtPayload;

    if (!decoded)
      return next(new AppError("Invalid Token", httpStatusText.FAIL, 401));

    const user = await Auth.findById(decoded.id);
    if (!user) {
      return next(
        new AppError("User no longer exists", httpStatusText.FAIL, 401)
      );
    }

    req.user = user;
    next();
  }
);
