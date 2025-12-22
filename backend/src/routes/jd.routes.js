import express from "express";
import multer from "multer";
import { protect } from "../middleware/auth.middleware.js";
import { uploadJD, getMyJDs } from "../controllers/jd.controller.js";

const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post("/upload", protect, upload.single("file"), uploadJD);
router.get("/my", protect, getMyJDs);

export default router;
