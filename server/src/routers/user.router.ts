import { Router } from "express";
import { addUser, loginUser, updateUser, validUser } from "../controllers/user.controller";
import multer from "multer";
import { checkEmailUnique } from "../middlewares/uniqueEmail.mw";
import { verifyToken } from "../jwt/jwt";

const userRouter = Router();
const upload = multer();

// userRouter.get("/", getUser);

userRouter.post("/login", loginUser);
userRouter.get('/verify', verifyToken, validUser)
userRouter.post("/register", upload.single("profilePic"), checkEmailUnique, addUser);
userRouter.put("/update/:_id", upload.single("profilePic"), updateUser);


export default userRouter;
