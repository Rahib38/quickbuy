import { Role } from "@prisma/client";
import bcrypt from "bcrypt";
import { Secret } from "jsonwebtoken";
import config from "../../config";
import { prisma } from "../../config/prisma";
import AppError from "../../errors/AppError";
import { httpStatus } from "../../utils/httpStatus";
import { genarateToken, verifyToken } from "../../utils/jwtHelper";

const loginUser = async (payload: { email: string; password: string }) => {
  const userData = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });

  const isPasswordCorrect: boolean = await bcrypt.compare(
    payload.password,
    userData?.password as string
  );

  if (!isPasswordCorrect) {
    throw new AppError(httpStatus.FORBIDDEN, "Invalid Credentials");
  }

  const accessToken = genarateToken(
    {
      email: userData?.email as string,
      role: userData?.role as Role,
      name: userData?.name as string,
    },
    config.jwt.jwt_secret as string,
    config.jwt.jwt_expiration as string
  );
  const refreshToken = genarateToken(
    {
      email: userData?.email as string,
      role: userData?.role as Role,
      name: userData?.name as string,
    },
    config.jwt.refresh_secret as string,
    config.jwt.jwt_refresh_expiration as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string) => {
  let decodedData;
  try {
    decodedData = verifyToken(token, config.jwt.refresh_secret as Secret);
  } catch (error) {
    throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized..!");
  }
  const userData = await prisma.user.findUnique({
    where: {
      email: decodedData.email,
    },
  });
  const accessToken = genarateToken(
    {
      email: userData?.email as string,
      role: userData?.role as Role,
      name: userData?.name as string,
    },
    config.jwt.jwt_secret as string,
    config.jwt.jwt_expiration as string
  );
  return {
    accessToken
  }
};


export const authService={
    loginUser,
    refreshToken
}