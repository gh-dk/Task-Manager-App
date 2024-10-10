import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

interface jwtAuthRequest extends Request {
  _id: string;
}

// jwt TOKEN Generation
export const jwtSignInAccessToken = (id: string): any => {
  return jwt.sign({ userId: id }, process.env.JWT_ACCESS_TOKEN, {
    expiresIn: "1m",
  });
};

export const jwtSignInRefreshToken = (id: string): any => {
  return jwt.sign({ userId: id }, process.env.JWT_REFRESH_TOKEN, {
    expiresIn: "30m",
  });
};

// jwt verfication
export const verifyToken = (
  req: jwtAuthRequest,
  res: Response,
  next: NextFunction
): any => {
  console.log(req.header);

  const authHeader = req.headers["authorization"];

  console.log("im jwt mw", authHeader);

  if (!authHeader) {
    return res.status(403).json({ message: "No token provided", valid: false });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(
    token,
    process.env.JWT_ACCESS_TOKEN as string,
    async (err: any, decoded: any) => {
      if (err) {
        return res
          .status(401)
          .json({ message: "Invalid or expired token", valid: false });
      }

      req.body.user_id = decoded.userId;
      next();
    }
  );
};

export const verifyRefreshToken = async (
  req: jwtAuthRequest,
  res: Response,
  next: NextFunction
):Promise<any> => {
  console.log("im jwt refresh token");

  const authHeader = req.headers["authorization"];

  console.log("im jwt mw", authHeader);

  if (!authHeader) {
    return res.status(403).json({ message: "No token provided", valid: false });
  }

  const token = authHeader.split(" ")[2];

  // const { token } = req.params;
  jwt.verify(
    token,
    process.env.JWT_REFRESH_TOKEN as string,
    async (err: any, decoded: any) => {
      if (err) {
        return res.status(401).json({
          message: "Invalid or expired token msg",
          valid: false,
          error: err,
          token: token,
        });
      }

      req.body.user_id = decoded.userId;
      return next();
    }
  );
};

export const assignToken = async (
  req: jwtAuthRequest,
  res: Response
): Promise<any> => {
  console.log("im assigntoekm");

  const accessToken = jwtSignInAccessToken(req.body.user_id);

  return res.status(200).json({ accessToken, valid: true });
};
