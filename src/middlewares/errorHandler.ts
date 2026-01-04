import type { Request, Response, NextFunction } from "express";
import { httpStatusText } from "../utils/httpStatusText.js";
import { AppError } from "../utils/appError.js";

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  const statusCode = (err as AppError).statusCode || 500;
  const statusText = (err as AppError).statusText || httpStatusText.ERROR;

  console.log(
    `${req.id || "no id"} ${err.message} , ${req.method} , ${
      req.originalUrl
    }\n${err.stack}`
  );
  res.status(statusCode).json({
    status: statusText,
    message: err.message || "Something went wrong",
  });
};
