import type { Request, Response, NextFunction } from "express";
export const getAllTasks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.send("Hello from getAllTasks");
};
