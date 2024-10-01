import { Router, Request, Response } from "express";

const taskRouter = Router();

taskRouter.get("/", (req: Request, res: Response) => {
  res.send("Task Router");
});

export default taskRouter;
