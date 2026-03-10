import express from "express";
import {
  register,
  login,
  refreshAccessToken,
  getMe,
} from "../controllers/auth.Controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refreshAccessToken);
router.get("/me", protect, getMe);

export default router;
