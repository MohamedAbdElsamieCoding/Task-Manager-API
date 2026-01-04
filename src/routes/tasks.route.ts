import { Router } from "express";
import {
  createTask,
  deleteTask,
  getAllTasks,
  getSingleTask,
  updateTask,
} from "../controllers/tasks.controller";
import { protect } from "../middlewares/protect";

const router = Router();

router.route("/").post(protect, createTask);
router.route("/").get(protect, getAllTasks);
router
  .route("/:taskId")
  .patch(protect, updateTask)
  .get(protect, getSingleTask)
  .delete(protect, deleteTask);

export default router;
