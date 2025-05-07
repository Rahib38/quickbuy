import { Router } from "express";
import UserRouter from "../modules/user/user.routes";
import productRouter from "../modules/products/product.routes";
import authRouter from "../modules/auth/auth.routes";

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
  {
    path: "/auth",
    route: authRouter,
  },
];

moduleRoutes.forEach((route)=>router.use(route.path, route.route))

export default router