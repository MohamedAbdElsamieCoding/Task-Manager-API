import { rateLimit } from "express-rate-limit";
import { Request, Response } from "express";
import { httpStatusText } from "../utils/httpStatusText.js";
import { RateLimitOptions } from "../types/rate-limit.js";

export const createRateLimiter = ({
  windowMs,
  max,
  message,
}: RateLimitOptions) =>
  rateLimit({
    windowMs,
    max,
    message: message || "Too many requests",
    legacyHeaders: false,
    standardHeaders: true,
    handler: (_req: Request, res: Response) => {
      res.status(429).json({
        status: httpStatusText.FAIL,
        message: message,
        retryAfter: Math.ceil(windowMs / 1000),
      });
    },
  });
// Limiter for server
export const globalLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests, please try again later",
});
// Limiter for authentication
export const authLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Too many authentication attempts",
});
// Limiter for OTPs for sensitive actions
export const strictLimiter = createRateLimiter({
  windowMs: 10 * 60 * 1000,
  max: 3,
  message: "Too many attempts, wait before retrying",
});
// Limiter for public APIs
export const publicLimiter = createRateLimiter({
  windowMs: 1 * 60 * 1000,
  max: 60,
  message: "Rate limit exceeded",
});
