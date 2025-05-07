import { Router } from "express";
import { authController } from "./auth.controller";

const authRouter = Router();

authRouter.post('/login', authController.loginUser)

authRouter.post('/refresh-Token', authController.refreshToken)

export default authRouter