import { NextFunction, Request, Response, Router } from "express";
import { uploadFile } from "../../utils/imageUploder";
import { productController } from "./product.controller";

const productRouter = Router();

productRouter.post(
  "/",
  uploadFile.array("images", 5),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  productController.createProduct
);

productRouter.get("/",productController.getAllProduct)

productRouter.get("/:id",productController.getSingleProduct)

productRouter.delete("/:id",productController.deleteProduct)
export default productRouter