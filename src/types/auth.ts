import { Document } from "mongoose";

export interface IAuth extends Document {
  name: string;
  email: string;
  password: string;
  refreshToken: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(password: string): Promise<boolean>;
}
