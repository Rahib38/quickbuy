import { Order, Role } from "@prisma/client";

export type TUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
//   orders: Order[];
  createdAt?: Date;
  updatedAt?: Date;
};
