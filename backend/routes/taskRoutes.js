import express from "express";
import { createTask, getTasks, updateTask, deleteTask } from "../controllers/taskController.js";
import { isAuth } from "../middleware/auth.js";

const router = express.Router();

router.post("/create", isAuth, createTask);
router.get("/list", isAuth, getTasks);
router.put("/:id", isAuth, updateTask);
router.delete("/:id", isAuth, deleteTask);

export default router;
