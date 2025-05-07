import catchAsync from "../../utils/catchAsync";
import { httpStatus } from "../../utils/httpStatus";
import { sendImageToCloudinary } from "../../utils/imageUploder";
import sendResponse from "../../utils/sendResponse";
import { productService } from "./product.service";

const createProduct = catchAsync(async (req, res) => {
  const payload = req.body;
  payload.images = [];
  // console.log(payload, "payload");

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

  const result = await productService.createProduct(req.user, payload);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: "product create successfully",
    data: result,
  });
});

const getAllProduct = catchAsync(async (req, res) => {
  const result = await productService.getAllProduct();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Get all product successfully",
    data: result,
  });
});

const getSingleProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await productService.getSingleProduct(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Get Single product successfully",
    data: result,
  });
});

const deleteProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await productService.deleteProduct(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Product delete successfully",
    data: result,
  });
});

export const productController = {
  createProduct,
  getAllProduct,
  getSingleProduct,
  deleteProduct,
};
