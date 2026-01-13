import { Router } from "express";
import { swaggerDocument } from "../config/swagger.js";

const router = Router();
router.get("/api-docs.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerDocument);
});

export default router;
