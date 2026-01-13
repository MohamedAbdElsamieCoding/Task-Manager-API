import { Router } from "express";
import {
  createTask,
  deleteAllTasks,
  deleteTask,
  getAllTasks,
  getSingleTask,
  updateTask,
} from "../controllers/tasks.controller";
import { protect } from "../middlewares/protect";
import { validate } from "../middlewares/validate";
import {
  createTaskSchema,
  updateTaskSchema,
} from "../validations/task.validate";
import { publicLimiter } from "../middlewares/rate-limit";

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
