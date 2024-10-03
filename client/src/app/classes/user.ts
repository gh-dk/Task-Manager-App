import { Task } from "./task";

export class User {
  constructor(
    public _id: string = '',
    public username: string = '',
    public email: string = '',
    public contact: number = 0,
    public password: string = '',
    public profilePic?: any,
    public tasks: Task[] = [],
    public refreshToken?: string,
    public accessToken?: string,
    public createdAt?: Date
  ) {
    this._id = _id;
    this.username = username;
    this.email = email;
    this.contact = contact;
    this.password = password;
    this.profilePic = profilePic;
    this.refreshToken = refreshToken;
    this.accessToken = accessToken;
    this.createdAt = createdAt;
  }
}
