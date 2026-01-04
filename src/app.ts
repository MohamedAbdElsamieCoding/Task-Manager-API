import express from "express";
import cors from "cors";
import helmet from "helmet";

import "dotenv/config";

import { errorHandler } from "./middlewares/errorHandler.js";

import authRouter from "./routes/auth.route.js";
import taskRouter from "./routes/tasks.route.js";

const app = express();

app.use(express.json());

app.use(cors());
app.use(helmet());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/task", taskRouter);

app.use(errorHandler);

export default app;
