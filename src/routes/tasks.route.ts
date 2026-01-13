import { Router } from "express";
import {
  createTask,
  deleteAllTasks,
  deleteTask,
  getAllTasks,
  getSingleTask,
  updateTask,
} from "../controllers/tasks.controller.js";
import { protect } from "../middlewares/protect.js";
import { validate } from "../middlewares/validate.js";
import {
  createTaskSchema,
  updateTaskSchema,
} from "../validations/task.validate.js";
import { publicLimiter } from "../middlewares/rate-limit.js";

const router = Router();

router
  .route("/")
  .post(protect, validate(createTaskSchema), publicLimiter, createTask)
  .get(protect, publicLimiter, getAllTasks)
  .delete(protect, publicLimiter, deleteAllTasks);

router
  .route("/:taskId")
  .patch(protect, validate(updateTaskSchema), publicLimiter, updateTask)
  .get(protect, publicLimiter, getSingleTask)
  .delete(protect, publicLimiter, deleteTask);

export default router;
