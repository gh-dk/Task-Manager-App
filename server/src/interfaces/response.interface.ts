import { IUser } from "../models/user.model";

export interface ISuccessResponse {
    user?: IUser;
    accessToken: string;
    refreshToken: string;
}

export interface ILoginSuccessResponse extends ISuccessResponse {
    message: string;
}

export interface IErrorResponse {
    message: string;
}