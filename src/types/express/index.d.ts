// src/types/express/index.d.ts
import { Role } from "@prisma/client";
import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?:  {
        id: string;
        email: string;
        role: Role;
      };
    }
  }
}

export {};
