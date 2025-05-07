import { NextFunction, Request, Response, Router } from "express";
import { uploadFile } from "../../utils/imageUploder";
import { productController } from "./product.controller";
import { Role } from "@prisma/client";
import { auth } from "../../middlewares/auth";

const productRouter = Router();

productRouter.post(
  "/",
  uploadFile.array("images", 5),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },auth(Role.ADMIN),
  productController.createProduct
);

productRouter.get("/",productController.getAllProduct)

productRouter.get("/:id",productController.getSingleProduct)

productRouter.delete("/:id", auth(Role.ADMIN),productController.deleteProduct)
export default productRouter