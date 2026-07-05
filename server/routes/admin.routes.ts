import { Router } from "express";
import adminController from "../controllers/admin.controller";
import { protect } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";

const router = Router();

router.get(
  "/dashboard",
  protect,
  authorize("ADMIN"),
  adminController.dashboard
);

export default router;