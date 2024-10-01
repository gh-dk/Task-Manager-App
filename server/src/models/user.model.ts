import mongoose from "mongoose";
// import { UserInterface } from "../interfaces/user.interface";

var UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
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
    refreshToken: String,
    accessToken: String,
  },
  { timestamps: true }
);

export interface IUser extends Document {
  username: string;
  email: string;
  contact: String;
  password: string;
  profilePic?: String;
  refreshToken: String;
  accessToken: String;
  createdAt: Date | number;
  updatedAt: Date | number;
}

const UserModel = mongoose.model<IUser>("user", UserSchema);

export default UserModel;
