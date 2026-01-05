import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret";

export interface JwtPayload {
  id: string;
}

export const generateToken = (userId: string): string => {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: "30d" });
};

export const verifyToken = (token: string): JwtPayload | null => {
  try {
    const decoded: JwtPayload = jwt.verify(token, JWT_SECRET) as JwtPayload;
    return decoded;
  } catch (error) {
    return null;
  }
};
