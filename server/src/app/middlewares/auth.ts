import { NextFunction, Request, Response } from "express";
import config from "../config";
import { prisma } from "../config/prisma";
import AppError from "../errors/AppError";
import catchAsync from "../utils/catchAsync";
import { httpStatus } from "../utils/httpStatus";
import { verifyToken } from "../utils/jwtHelper";
import { JwtPayload } from "jsonwebtoken";
import { Role } from "@prisma/client";

// Custom JWT Payload interface
interface MyJwtPayload extends JwtPayload {
  id: string;
  email: string;
  role: Role;
}

export const auth = (...requiredRoles: Role[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized..!!");
    }

    // Type assertion with custom payload
    const decoded = verifyToken(token, config.jwt.jwt_secret as string) as MyJwtPayload;

    const { email, role, id } = decoded;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new AppError(httpStatus.UNAUTHORIZED, "User not found");
    }

    if (requiredRoles.length && !requiredRoles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized..!");
    }

    // Attach to req.user with correct type
    req.user = { id, email, role };
    next();
  });
};
