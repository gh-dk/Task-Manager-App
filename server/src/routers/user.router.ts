import { Router } from "express";
import { addUser, getUser, loginUser } from "../controllers/user.controller";
import multer from "multer";
import { checkEmailUnique } from "../middlewares/uniqueEmail.mw";
import { verifyToken } from "../jwt/jwt";

const userRouter = Router();
const upload = multer();

userRouter.get("/", getUser);

userRouter.post("/login", loginUser);
userRouter.get('/verifyJWT', verifyToken)
userRouter.post("/register", upload.single("profilePic"), checkEmailUnique, addUser);

export default userRouter;
