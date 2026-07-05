import { Router } from "express";
import authController from "../controllers/auth.controller";
import {getCurrentUser} from "../controllers/auth.controller"
import { protect } from "../middleware/auth.middleware";
const router = Router();
console.log("authController =", authController);
console.log("protect =", protect);
console.log("getCurrentUser =", getCurrentUser);
// Authentication
router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.get("/me", protect, getCurrentUser);

export default router;