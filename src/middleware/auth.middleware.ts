import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
    sub: string;
    role: string;
    iat: number;
    exp: number;
}

export interface AuthRequest extends Request {
    user?: {
        id: string;
        role: string;
    };
}

export const verifyToken = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        // 1. get token from header
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                message: "Authorization header missing",
            });
        }

        // 2. check Bearer format
        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                message: "Token missing",
            });
        }

        // 3. verify token
        const secretKey = process.env.JWT_SECRET_KEY as string;

        const decoded = jwt.verify(token, secretKey) as JwtPayload;

        // 4. attach user to request
        req.user = {
            id: decoded.sub,
            role: decoded.role,
        };

        // 5. continue
        next();

    } catch (error: any) {
        return res.status(401).json({
            message:
                error.name === "TokenExpiredError"
                    ? "Token expired"
                    : "Invalid token",
        });
    }
};
