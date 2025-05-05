import catchAsync from "../../utils/catchAsync";
import { httpStatus } from "../../utils/httpStatus";
import { sendImageToCloudinary } from "../../utils/imageUploder";
import sendResponse from "../../utils/sendResponse";
import { productService } from "./product.service";

const createProduct = catchAsync(async (req, res) => {
  const payload = req.body;
  payload.images = [];
console.log(payload,"payload")

  if (req.files && req.files instanceof Array) {
    const imagesUrls = await Promise.all(
      req.files.map(async (file) => {
        const uniqueSuffix = Date.now() + Math.round(Math.random() * 1e3);
        const imageName = `${uniqueSuffix}-${req.user?.email.split("@")[0]}`;

        const path = file?.buffer;

        const { secure_url } = await sendImageToCloudinary(imageName, path);
        return secure_url;
      })
    );
    payload.images = imagesUrls;
  }

  const result = await productService.createProduct(req.user,payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "product create successfully",
    data: result,
  });
});


export const productController ={
    createProduct
}