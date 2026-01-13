import express from "express";
import cors from "cors";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import { fileURLToPath } from "url";

import "dotenv/config";

import { errorHandler } from "./middlewares/errorHandler.js";

import swaggerRouter from "./routes/swagger.route.js";
import authRouter from "./routes/auth.route.js";
import taskRouter from "./routes/tasks.route.js";
import { globalLimiter } from "./middlewares/rate-limit.js";
import path from "path";

const app = express();

app.use(express.json());

app.use(cors());
app.use(helmet());

// Swagger Documentation
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/docs", express.static(path.join(__dirname, "docs")));
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(null, {
    explorer: true,
    customCss: `
      .swagger-ui .topbar { 
        display: none; 
      }
      .swagger-ui .information-container {
        margin: 20px 0;
      }
    `,
    customSiteTitle: "Task Manager API",
    customfavIcon: "/favicon.ico",
    swaggerOptions: {
      url: "/docs/swagger.yaml",
    },
  })
);
app.use(swaggerRouter);

// Global Rate Limiter
app.set("trust proxy", 1);
app.use(globalLimiter);

// All Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/task", taskRouter);

// Global Error Handler
app.use(errorHandler);

export default app;
