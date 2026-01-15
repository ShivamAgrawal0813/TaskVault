import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { createTask } from "../controllers/task.controller.js";
import {getTasks} from "../controllers/task.controller.js";

const router = express.Router();

router.post("/", authMiddleware, createTask);
router.get("/",authMiddleware,getTasks);

export default router;