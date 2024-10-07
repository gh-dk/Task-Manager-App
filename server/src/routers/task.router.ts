import { Router, Request, Response } from "express";
import { addTask, deleteTask, getAllTasks, moveTaskBackward, moveTaskForward, updateTask } from '../controllers/task.controller';
import { verifyToken } from '../jwt/jwt';

const taskRouter = Router();

taskRouter.get("/", verifyToken, getAllTasks)
taskRouter.post("/", verifyToken, addTask);
taskRouter.put('/move-forward/:taskId', verifyToken, moveTaskForward);
taskRouter.put('/move-backward/:taskId', verifyToken, moveTaskBackward);
taskRouter.put('/:taskId', verifyToken, updateTask);
taskRouter.delete('/:taskId', verifyToken, deleteTask);


export default taskRouter;
