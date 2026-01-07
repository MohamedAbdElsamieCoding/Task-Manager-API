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

const router = Router();

router
  .route("/")
  .post(protect, validate(createTaskSchema), createTask)
  .get(protect, getAllTasks)
  .delete(protect, deleteAllTasks);

router
  .route("/:taskId")
  .patch(protect, validate(updateTaskSchema), updateTask)
  .get(protect, getSingleTask)
  .delete(protect, deleteTask);

export default router;
