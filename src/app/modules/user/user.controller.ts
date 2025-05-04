import catchAsync from "../../utils/catchAsync";
import { httpStatus } from "../../utils/httpStatus";
import sendResponse from "../../utils/sendResponse";
import { userService } from "./user.service";

const createUser = catchAsync(async (req, res) => {
  console.log(req.body, "reqbody")
  const result = await userService.createUser(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: "User created successfully!",
    data: result,
  });
});

export const userController = {
  createUser,
};
