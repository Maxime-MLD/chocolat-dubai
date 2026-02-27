import { Router } from "express";
import authController from "../controllers/auth.controller.js";
import {
  validateRegister,
  validateLogin,
} from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", validateRegister, authController.registerUser);
router.post("/login", validateLogin, authController.login);

export default router;
