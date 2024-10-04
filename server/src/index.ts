import express, { Request, Response } from "express";
import userRouter from "./routers/user.router";
import taskRouter from "./routers/task.router";
import connectDB from "./config/mongoDB";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRouter);
app.use("/task", taskRouter);


app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log(`Server running at http://localhost:${PORT}`);
  } catch (err) {
    console.log("Error :", err);
  }
});
