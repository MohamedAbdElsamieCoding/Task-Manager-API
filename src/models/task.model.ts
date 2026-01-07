// Title , content , data with timestamps , notification

import { Schema, model } from "mongoose";
import { ITask } from "../types/task.js";
import { Priority } from "../types/priority.js";

const taskSchema = new Schema<ITask>(
  {
    title: String,
    content: String,
    completed: { type: Boolean, default: false },
    userId: { type: Schema.Types.ObjectId, ref: "Auth" },
    priority: {
      type: String,
      enum: Object.values(Priority),
      default: Priority.MEDIUM,
    },
    dueTo: { type: Date, required: false },
  },
  { timestamps: true, versionKey: false }
);

export const Task = model<ITask>("Task", taskSchema);
