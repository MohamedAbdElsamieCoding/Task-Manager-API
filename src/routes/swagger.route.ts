import { Router } from "express";
import { swaggerDocument } from "../config/swagger.js";

const router = Router();
router.get("/api-docs.json", (_req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerDocument);
});

export default router;
