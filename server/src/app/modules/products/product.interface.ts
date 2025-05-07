import { Order } from "@prisma/client";

export type IProducts = {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
  orders: Order[];
};
