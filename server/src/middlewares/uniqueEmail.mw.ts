import { Request, Response, NextFunction } from "express";
import UserModel from "../models/user.model";

export const checkEmailUnique = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { email } = req.body;
    console.log(email);


    // if (!email) {
    //     return res.status(400).json({ message: "Email is required" });
    // }

    // try {
    //     const existingUser = await UserModel.findOne({ email });
    //     if (existingUser) {
    //         return res.status(409).json({ message: "Email is already in use" });
    //     }

    next();
    // } catch (err) {
    //     console.error(err);
    //     return res.status(500).json({ message: "Something went wrong" });
    // }
};
