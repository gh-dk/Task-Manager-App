import { Request, Response } from 'express';
import UserModel from '../models/user.model';

interface ITaskRequest extends Request {
  user_id: string,
  taskData: Object
}

export const getAllTasks = async (req: Request, res: Response): Promise<any> => {
  const { user_id } = req.body;
  console.log(req.body);

  try {
    const user = await UserModel.findById(user_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ tasks: user.tasks });
  } catch (error) {
    console.error("error :", error);
    res.status(500).json({ message: "server error" });
  }
};

export const addTask = async (req: ITaskRequest, res: Response): Promise<any> => {
  try {
    const { user_id, ...taskData } = req.body
    console.log(user_id);
    
    const user = await UserModel.findById(user_id);

    if (!user) return res.status(404).json({ message: "User not found" });

    user.tasks.push(taskData);
    await user.save();
    const addedTask = user.tasks[user.tasks.length - 1];

    res.status(201).json({ message: "Task added successfully", task: addedTask });
  } catch (error) {
    console.error("error :", error);
    res.status(500).json({ message: "server error" });
  }
}

export const moveTaskForward = async (req: Request, res: Response): Promise<any> => {
  const { taskId } = req.params;
  const { user_id } = req.body
  try {
    const user = await UserModel.findById(user_id);
    console.log(user);

    if (!user) return res.status(404).json({ message: "User not found" });
    const task = user.tasks.find((task) => task._id.toString() === taskId);

    if (!task) return res.status(404).json({ message: "Task not found" });
    if (task.stage == 3) return res.status(400).json({ message: "Task is already in the last stage" });

    console.log(task);

    task.stage = Number(task.stage) + 1;
    console.log('stage' + task.stage);

    await user.save();

    res.status(200).json({ message: "Task moved forward successfully" });
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};

export const moveTaskBackward = async (req: Request, res: Response): Promise<any> => {
  const { taskId } = req.params;
  const { user_id } = req.body
  try {
    const user = await UserModel.findById(user_id);
    console.log(user);

    if (!user) return res.status(404).json({ message: "User not found" });
    const task = user.tasks.find((task) => task._id.toString() === taskId);

    if (!task) return res.status(404).json({ message: "Task not found" });
    if (task.stage == 0) return res.status(400).json({ message: "Task is already in the first stage" });

    console.log(task);

    task.stage = Number(task.stage) - 1;
    console.log('stage' + task.stage);

    await user.save();

    res.status(200).json({ message: "Task moved Back successfully" });
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};

export const updateTask = async (req: Request, res: Response): Promise<any> => {
  const { taskId } = req.params;
  const { user_id } = req.body
  const taskData = req.body;

  try {
    const user = await UserModel.findById(user_id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const taskIndex = user.tasks.findIndex((task) => task._id.toString() === taskId);

    if (taskIndex === -1) {
      return res.status(404).json({ message: "Task not found" });
    }

    user.tasks[taskIndex] = { ...user.tasks[taskIndex], ...taskData };
    await user.save();

    return res.status(200).json({ message: "Task updated successfully", task: user.tasks[taskIndex] });
  } catch (error) {
    console.error("errpr", error);
    return res.status(500).json({ message: "server error" });
  }
};

export const deleteTask = async (req: Request, res: Response): Promise<any> => {
  const { taskId } = req.params;
  const { user_id } = req.body

  try {
    const user = await UserModel.findById(user_id);

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    const taskIndex = user.tasks.findIndex((task) => task._id.toString() === taskId);

    if (taskIndex === -1) {
      return res.status(404).json({ message: "Task not found" });
    }
    user.tasks.splice(taskIndex, 1);
    await user.save();

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "server error" });
  }
}