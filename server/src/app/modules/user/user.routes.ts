import { Router } from "express";

import { userController } from "./user.controller";
import { userValidation } from "./user.validation";
import validatedRequest from "../../middlewares/validateRequest";


const UserRouter = Router();

UserRouter.post(
  "/",
  validatedRequest(userValidation.createUserSchema),
  userController.createUser
);

export default UserRouter;
