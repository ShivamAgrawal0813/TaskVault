import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { createTask } from "../controllers/task.controller.js";

const router = express.Router();

router.post("/", authMiddleware, createTask);

export default router;