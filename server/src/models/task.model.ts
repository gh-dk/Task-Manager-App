import mongoose from "mongoose";

export const TaskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    stage: {
      type: String,
      enum: [0, 1, 2, 3],
      required: true,
    },
    priority: {
      type: String,
      enum: [0, 1, 2],
      required: true,
    },
    deadline: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

export interface ITask {
  _id?: string;
  name: string;
  stage: number;
  priority: number;
  deadline: Date;
  createdAt: Date | number;
  updatedAt: Date | number;
}
