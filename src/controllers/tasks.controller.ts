import type { Request, Response, NextFunction } from "express";
import { Task } from "../models/task.model";
import { QueryFilter } from "mongoose";
import { ITask } from "../types/task";
import { asyncHandler } from "../middlewares/asyncHandler";
import { AppError } from "../utils/appError";
import { httpStatusText } from "../utils/httpStatusText";
import { sendResponse } from "../utils/response";
import { agenda } from "../config/agenda";

// Create task
export const createTask = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?._id;
    if (!userId)
      return next(new AppError("Not allowed", httpStatusText.ERROR, 403));

    const { title, content, reminderDate, token } = req.body;
    if (!title || !content)
      return next(
        new AppError("Fields are required", httpStatusText.FAIL, 404)
      );
    const task = await Task.create({
      title,
      content,
      userId,
    });

    // Schedule notification if reminderDate and token are provided
    if (reminderDate && token) {
      await agenda.schedule(new Date(reminderDate), "send-push-notification", {
        userId,
        title: `Reminder ${task.title}`,
        body: task.content,
        token,
      });
    }

    sendResponse(res, 201, "Task created successfully", {
      title: task.title,
      content: task.content,
    });
  }
);

//Get all tasks for the user
export const getAllTasks = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?._id;
    if (!userId)
      return next(new AppError("Not allowed", httpStatusText.ERROR, 403));

    const { page = 1, limit = 10, completed } = req.query;
    const filter: QueryFilter<ITask> = { userId };
    if (completed !== undefined) filter.completed = completed === "true";

    const tasks = await Task.find(filter)
      .limit(Number(limit))
      .sort({ createdAt: -1 })
      .skip((Number(page) - 1) * Number(limit));
    if (!tasks || tasks.length === 0)
      return next(new AppError("No tasks found", httpStatusText.FAIL, 404));
    sendResponse(res, 200, "Tasks are fetched", {
      tasks,
      count: tasks.length,
      page: Number(page),
    });
  }
);

// Update task to complete
export const updateTask = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?._id;
    if (!userId)
      return next(new AppError("User not found", httpStatusText.FAIL, 404));
    const { taskId } = req.params;
    if (!taskId)
      return next(
        new AppError("Task ID is required ", httpStatusText.FAIL, 404)
      );

    const updatedTask = await Task.findOneAndUpdate(
      { _id: taskId, userId },
      { completed: true },
      { new: true, runValidators: true }
    );

    if (!updatedTask)
      return next(
        new AppError(
          "Task not found or not authorized",
          httpStatusText.FAIL,
          404
        )
      );
    sendResponse(res, 200, "Task marked as completed", {
      title: updatedTask.title,
      content: updatedTask.content,
      completed: updatedTask.completed,
    });
  }
);

// Get single task
export const getSingleTask = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?._id;
    if (!userId)
      return next(new AppError("User not found", httpStatusText.FAIL, 404));

    const { taskId } = req.params;
    if (!taskId)
      return next(new AppError("Task ID not found", httpStatusText.FAIL, 404));

    const task = await Task.findOne({ _id: taskId, userId });
    if (!task)
      return next(
        new AppError(
          "Task not found or not authorized",
          httpStatusText.FAIL,
          404
        )
      );

    sendResponse(res, 200, "Task fetched successfully", {
      title: task.title,
      content: task.content,
      completed: task.completed,
    });
  }
);

// Delete single task
export const deleteTask = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?._id;
    if (!userId)
      return next(new AppError("User not found", httpStatusText.FAIL, 404));

    const { taskId } = req.params;
    if (!taskId)
      return next(new AppError("Task ID not found", httpStatusText.FAIL, 404));

    const task = await Task.findOneAndDelete({ _id: taskId, userId });
    if (!task)
      return next(
        new AppError(
          "Task not found or not authorized",
          httpStatusText.FAIL,
          404
        )
      );

    sendResponse(res, 200, "Task deleted successfully");
  }
);

// Edit single task
export const editTask = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?._id;
    const { taskId } = req.params;
    const { title, content } = req.body;
    const task = await Task.findOneAndUpdate(
      { _id: taskId, userId },
      { title, content },
      { new: true, runValidators: true }
    );
    if (!task) {
      return next(
        new AppError(
          "Task not found or not authorized",
          httpStatusText.FAIL,
          404
        )
      );
    }
    sendResponse(res, 200, "Task updated successfully", {
      title: task.title,
      content: task.content,
    });
  }
);
