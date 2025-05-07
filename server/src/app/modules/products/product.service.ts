import { prisma } from "../../config/prisma";
import { IProducts } from "./product.interface";

const createProduct = async (user: unknown, payload: IProducts) => {
  // console.log(payload, "payload");
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

const getSingleProduct = async (id: string) => {
  const result = await prisma.product.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const deleteProduct = async (id: string) => {
  const result = await prisma.product.delete({
    where: {
      id,
    },
  });
  return result;
};

export const productService = {
  createProduct,
  getAllProduct,
  getSingleProduct,
  deleteProduct,
};
