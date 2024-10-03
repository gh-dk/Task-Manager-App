import { Router, Request, Response } from "express";
import { addTask, deleteTask, getAllTasks, moveTaskBackward, moveTaskForward, updateTask } from '../controllers/task.controller';

const taskRouter = Router();

taskRouter.get("/", (req: Request, res: Response) => {
  res.send("Task Router");
});

taskRouter.get("/:user_id", getAllTasks)
taskRouter.post("/", addTask);
taskRouter.put('/move-forward/:userId/:taskId', moveTaskForward);
taskRouter.put('/move-backward/:userId/:taskId', moveTaskBackward);
taskRouter.put('/:userId/:taskId', updateTask);
taskRouter.delete('/:user_id/:taskId', deleteTask);


export default taskRouter;
