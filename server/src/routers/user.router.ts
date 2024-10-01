import { Router } from "express";
import { addUser, getUser } from "../controllers/user.controller";
import multer from "multer";

const userRouter = Router();
const upload = multer();

userRouter.get("/", getUser);

userRouter.post("/add", upload.single("profilePic"), addUser);

export default userRouter;
