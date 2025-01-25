// src/middlewares/auth.middleware.ts

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { errorResponse } from '../utils/response.util';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET ?? 'defaultsecret';

// Extend Express Request so we can attach a `user` property
export interface AuthRequest extends Request {
    user?: {
        userId: string;
    };
}

export const authMiddleware = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): void => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            // Call your error helper (which returns a Response), but don't "return" that object
            errorResponse(res, 'No token provided', 401);
            return;
        }

        const token = authHeader.split(' ')[1]; // "Bearer <token>"
        if (!token) {
            errorResponse(res, 'Invalid token format', 401);
            return;
        }

        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
        req.user = { userId: decoded.userId };

        // If everything is fine, call next()
        next();
    } catch (error: any) {
        // Again, do not return the `Response`; just call it and then `return;`
        errorResponse(res, 'Token is invalid or expired', 401, error);
        return;
    }
};
