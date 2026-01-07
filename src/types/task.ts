import { Document, Types } from "mongoose";
import { Priority } from "./priority";

export interface ITask extends Document {
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  completed: boolean;
  userId: Types.ObjectId | string;
  dueTo: Date;
  priority: Priority;
}

export interface TaskDocument extends ITask, Document {}
