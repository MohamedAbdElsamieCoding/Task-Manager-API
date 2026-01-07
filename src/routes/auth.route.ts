import { Router } from "express";
import {
  changePassword,
  login,
  refreshToken,
  register,
  updateMe,
} from "../controllers/auth.controller.js";
import {
  changePasswordSchema,
  loginSchema,
  registerSchema,
  updateProfileSchema,
} from "../validations/auth.validate.js";
import { validate } from "../middlewares/validate.js";
import { protect } from "../middlewares/protect.js";

const router = Router();

router.route("/register").post(validate(registerSchema), register);
router.route("/login").post(validate(loginSchema), login);
router
  .route("/update-me")
  .patch(protect, validate(updateProfileSchema), updateMe);
router
  .route("/update-password")
  .patch(protect, validate(changePasswordSchema), changePassword);
router.route("/refresh").post(refreshToken);

export default router;
