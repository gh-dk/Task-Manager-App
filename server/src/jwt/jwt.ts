import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { ObjectId } from "mongoose";
import { UserInterface } from "../interfaces/user.interface";
import UserModel from "../models/user.model";


interface jwtAuthRequest extends Request {
  _id: string;
}


const secret: string = process.env.SECRET_CODE;

// JWT TOKEN Generation
export const jwtSignInAccessToken = (id: string): any => {
  return jwt.sign({ userId: id }, process.env.JWT_ACCESS_TOKEN, {
    expiresIn: "1h",
  });
};

export const jwtSignInRefreshToken = (id: string): any => {
  return jwt.sign({ userId: id }, process.env.JWT_REFRESH_TOKEN, {
    expiresIn: "2d",
  });
};

// JWT Verfication
export const JWT_MIDDLEWARE = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies["jwt-token"];

  if (!token) {
    return res.status(401).json({ data: "Unauthorized" });
  }

  try {
    const value = jwt.verify(token, secret);
    if (!value) {
      return res.status(401).json({ data: "Unauthorized" });
    }
    // req.jwtId = value;
    next();
  } catch (err) {
    return res.status(401).json({ data: "Unauthorized" });
  }
};

export const verifyToken = (req: jwtAuthRequest, res: Response): Promise<any> => {
  return new Promise((resolve, reject) => {
    console.log(req.header);

    const authHeader = req.headers['authorization'];

    console.log(authHeader);

    if (!authHeader) {
      return resolve(res.status(403).json({ message: "No token provided", valid: false }));
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_ACCESS_TOKEN as string, async (err: any, decoded: any) => {
      if (err) {
        return resolve(res.status(403).json({ message: "Invalid or expired token", valid: false }));
      }

      const user = await UserModel.findById(decoded.userId)
      console.log(decoded.userId);

      req._id = decoded.userId;
      resolve(res.status(200).json({ valid: true, user: user }));
    });
  });
};