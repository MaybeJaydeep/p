import express from "express";
import { register, login, refreshAccessToken } from "../controllers/auth.Controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refreshAccessToken);

export default router;
