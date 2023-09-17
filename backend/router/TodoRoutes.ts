import express from "express"
import { fetchAllTasks } from "../controllers/TodoController";


const router = express.Router();

router.get("/fetchAllTasks",fetchAllTasks)

export default router