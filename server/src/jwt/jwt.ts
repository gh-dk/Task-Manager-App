import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { ObjectId } from "mongoose";

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
    req.jwtId = value;
    next();
  } catch (err) {
    return res.status(401).json({ data: "Unauthorized" });
  }
};
