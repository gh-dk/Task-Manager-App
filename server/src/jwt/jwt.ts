import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import UserModel from "../models/user.model";


interface jwtAuthRequest extends Request {
  _id: string;
}


// jwt TOKEN Generation
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

// jwt verfication
export const verifyToken = (req: jwtAuthRequest, res: Response, next: NextFunction): Promise<any> => {
  return new Promise((resolve, reject) => {
    console.log(req.header);

    const authHeader = req.headers['authorization'];

    console.log('im jwt mw', authHeader);

    if (!authHeader) {
      return resolve(res.status(403).json({ message: "No token provided", valid: false }));
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_ACCESS_TOKEN as string, async (err: any, decoded: any) => {
      if (err) {
        return resolve(res.status(403).json({ message: "Invalid or expired token", valid: false }));
      }

      req.body.user_id = decoded.userId;
      resolve(next());
    });
  });
};