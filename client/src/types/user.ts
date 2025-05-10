export interface IUser {
  name: string;
  email: string;
  image:string;
  role: "USER" | "ADMIN";
  iat?: number;
  exp?: number;
}
