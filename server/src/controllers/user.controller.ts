import { Response, Request } from "express";
import UserModel from "../models/user.model";
import { UserInterface } from "../interfaces/user.interface";
import bcrypt from "bcrypt";
import { jwtSignInAccessToken, jwtSignInRefreshToken } from "../jwt/jwt";

// interface responseMessage {
//   message?: String;
//   user?: UserInterface;
// }

export const getUser = (req: Request, res: Response) => {
  res.json({ message: "got data" });
};

export const addUser = async (req: Request, res: Response) => {
  try {
    // const profilePic = req.file ? req.file.buffer : null;
    const newProfilePic = req.file
      ? { data: req.file.buffer, contentType: req.file.mimetype }
      : null;

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = await new UserModel<UserInterface>({
      ...req.body,
      password: hashedPassword,
      profilePic: newProfilePic,
    }).save();

    const refreshToken = jwtSignInRefreshToken(user._id.toString());
    const accessToken = jwtSignInAccessToken(user._id.toString());

    await UserModel.updateOne(
      { _id: user._id },
      {
        $set: {
          refreshToken,
          accessToken,
        },
      }
    );

    res.json({ user, accessToken, refreshToken });
  } catch (err) {
    console.log(err);
    res.json({ message: "some thing went wrong" });
  }
};
