import { Response, Request } from "express";
import UserModel from "../models/user.model";
import { UserInterface } from "../interfaces/user.interface";
import bcrypt from "bcrypt";
import { jwtSignInAccessToken, jwtSignInRefreshToken } from "../jwt/jwt";
import {
  IErrorResponse,
  ILoginSuccessResponse,
  ISuccessResponse,
} from "../interfaces/response.interface";

// interface responseMessage {
//   message?: String;
//   user?: UserInterface;
// }

// export const getUser = (req: Request, res: Response) => {
//   res.json({ message: "got data" });
// };

export const addUser = async (req: Request, res: Response): Promise<any> => {
  try {
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

    return res.json({ user, accessToken, refreshToken });
  } catch (err) {
    console.log(err);
    return res.json({ message: "some thing went wrong" });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;
    console.log(req.body);

    const user = await UserModel.findOne({ email }).select("-password");
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "invalid credentials" });
    }

    // generate tokens
    const accessToken = jwtSignInAccessToken(user._id.toString());
    const refreshToken = jwtSignInRefreshToken(user._id.toString());

    const loginResponse: ILoginSuccessResponse = {
      user,
      accessToken,
      refreshToken,
      message: "Login successful",
    };
    return res.json(loginResponse);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "omething went wrong" });
  }
};

export const updateUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const updateData: Partial<UserInterface> = { ...req.body };

    // if (req.body.password) {
    //   const hashedPassword = await bcrypt.hash(req.body.password, 10);
    //   updateData.password = hashedPassword;
    // }
    if (req.file) {
      updateData.profilePic = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };
    }
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.params._id,
      updateData
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({
      user: updatedUser,
      message: "User Updated Successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const validUser = async (req: Request, res: Response): Promise<any> => {
  if (req.body.user_id) {
    const user = await UserModel.findById(req.body.user_id).select('-password');
    return res.status(200).json({ valid: true, user: user });
  } else {
    return res.status(401).json({ valid: false, message: "" });
  }
};