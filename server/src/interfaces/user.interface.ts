import { ObjectId } from "mongoose";

export interface UserInterface {
  _id: ObjectId;
  username: String;
  email: String;
  contact: Number;
  password: String;
  createdAt: String;
  updatedAt: String;
}
