import { prisma } from "../../config/prisma";
import { IProducts } from "./product.interface";

const createProduct = async (user: unknown, payload: IProducts) => {
  console.log(payload, "payload");
  const result = await prisma.product.create({
    data: {
      title: payload.title,
      description: payload.description,
      price: payload.price,
      images: payload.images || [],
    },
  });

  return result;
};

const getAllProduct = async () => {
  const result = await prisma.product.findMany();
  return result;
};

export const productService = {
  createProduct,
  getAllProduct,
};
