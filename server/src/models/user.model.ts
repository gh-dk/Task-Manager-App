import mongoose from "mongoose";
import { ITask, TaskSchema } from "./task.model";

var UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    contact: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      data: Buffer,
      contentType: String,
    },
    tasks: [TaskSchema],
  },
  { timestamps: true }
);

export interface IUser extends Document {
  username: string;
  email: string;
  contact: String;
  password: string;
  profilePic?: String;
  tasks: ITask[];
  createdAt: Date | number;
  updatedAt: Date | number;
}

const UserModel = mongoose.model<IUser>("user", UserSchema);

export default UserModel;
