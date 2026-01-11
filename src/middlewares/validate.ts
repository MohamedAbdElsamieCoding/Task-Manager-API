import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/appError";
import { ZodError, ZodObject } from "zod";
import { httpStatusText } from "../utils/httpStatusText";

export const validate =
  (schema: ZodObject) =>
  async (req: Request, _res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        const message = error.issues
          .map((err) => `${err.path.join(".")} : ${err.message}`)
          .join(", ");
        return next(new AppError(message, httpStatusText.ERROR, 400));
      }
      return next(error);
    }
  };
