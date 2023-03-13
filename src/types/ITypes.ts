import { JwtPayload } from "jsonwebtoken";

// MIDDLEWARE
export interface IValidateToken {
    cookies: string | any;
    user: string | JwtPayload;
    authenticated: boolean;
}

// USER
export interface IUser {
    id?: string;
    username?: string;
    email?: string;
    password?: string;
    createdAt?: NativeDate;
    updatedAt?: NativeDate;
}
