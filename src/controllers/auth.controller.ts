import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";

import UserService from "../services/user.service";
import logger from "../globals/logger";
import { createTokens } from "../middlewares/auth.middleware";

/**
 * @description
 * Register user function
 * @body
 * username, email, password
 */
export const RegisterUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password)
            throw new Error("Incomplete input!");

        const isUserNameExist = await UserService.findUserName({ username });
        const isEmailExist = await UserService.findUserEmail({ email });

        if (isUserNameExist || isEmailExist)
            throw new Error("Username or email is taken!");

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await UserService.createUser({
            username,
            email,
            password: hashedPassword,
        });

        logger.info(`User successfully registered: ${newUser}`);
        return res
            .status(200)
            .json({ message: "User successfully registered!" });
    } catch (error: any) {
        logger.error(error.message);
        next(error);
    }
};

/**
 * @description
 * Login user function
 * @body
 * email, password
 */
export const LoginUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { email, password } = req.body;

        const user = await UserService.findUserEmail({ email });
        if (!user) throw new Error("User does not exist!");

        const match = await bcrypt.compare(password, user.password);
        if (!match) throw new Error("Wrong credentials!");

        const accessToken = createTokens(user);
        res.cookie("access-token", accessToken, {
            // let us set the expiration to 24 hr
            maxAge: 60 * 60 * 24 * 1000,
            // httpOnly: true,
        });

        logger.info(`User successfully logged in: ${user}`);
        return res
            .status(200)
            .json({ message: "User successfully logged in!" });
    } catch (error: any) {
        logger.error(error.message);
        next(error);
    }
};
