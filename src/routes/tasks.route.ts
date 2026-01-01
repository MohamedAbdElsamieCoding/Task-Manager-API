import { Router } from "express";
import { getAllTasks } from "../controllers/tasks.controller";

const router = Router();

router.route("/getAllTasks").get(getAllTasks);

export default router;
