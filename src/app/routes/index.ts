import { Router } from "express";
import UserRouter from "../modules/user/user.routes";
import productRouter from "../modules/products/product.routes";

const router = Router();

const moduleRoutes = [
  {
    path: "/users",
    route: UserRouter,
  },
  {
    path: "/products",
    route: productRouter,
  },
];

moduleRoutes.forEach((route)=>router.use(route.path, route.route))

export default router