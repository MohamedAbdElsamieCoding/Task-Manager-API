import { Document, Types } from "mongoose";

export interface ITask extends Document {
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  completed: boolean;
  userId: Types.ObjectId | string;
}
