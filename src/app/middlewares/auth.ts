import { NextFunction, Request, Response } from "express";
import config from "../config";
import { prisma } from "../config/prisma";
import AppError from "../errors/AppError";
import catchAsync from "../utils/catchAsync";
import { httpStatus } from "../utils/httpStatus";
import { verifyToken } from "../utils/jwtHelper";

export const auth = (...requiredRoles: string[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized..!!");
    }

    const decoded = verifyToken(token, config.jwt.jwt_secret as string);

    const { email, role } = decoded;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized..!");
    }

    if (requiredRoles.length && !requiredRoles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized..!");
    }
    req.user = { ...decoded, id: user.id };
    next();
  });
};
