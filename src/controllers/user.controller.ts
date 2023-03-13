import { Request, Response, NextFunction } from "express";

import logger from "../globals/logger";
import UserService from "../services/user.service";

/**
 * @description
 * Fetch all user function
 */
export const GetUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const users = await UserService.findUsers();
        return res.status(200).json(users);
    } catch (error: any) {
        logger.error(error.message);
        next(error);
    }
};
