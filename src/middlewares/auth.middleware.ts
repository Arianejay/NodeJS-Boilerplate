import { Request, Response, NextFunction } from "express";
import { sign, verify } from "jsonwebtoken";

import { IUser, IValidateToken } from "../types/ITypes";

import cfg from "../globals/config";
import logger from "../globals/logger";

/**
 * @description
 * Creates a token for the user and returns that token
 * @param {{user}} user
 */
export const createTokens = (user: IUser) => {
    const accessToken = sign(
        { username: user.username, id: user.id },
        cfg.JWTsecretToken
    );

    logger.info("Successfully set the access token!");
    return accessToken;
};

/**
 * @description
 * Validator token function, verify  the user's token
 */
export const validateToken = (
    req: IValidateToken,
    res: Response,
    next: NextFunction
) => {
    const accessToken = req.cookies["access-token"];

    if (!accessToken) {
        throw new Error("User not authenticated!");
    }

    try {
        const validateToken = verify(accessToken, cfg.JWTsecretToken);
        req.user = validateToken;

        if (validateToken) {
            req.authenticated = true;
            logger.info("User access token validated!");
            return next();
        }
    } catch (error: any) {
        throw new Error(error);
    }
};
