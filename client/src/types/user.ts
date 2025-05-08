export interface IUser {
  name: string;
  email: string;
  role: "USER" | "ADMIN";
  iat?: number;
  exp?: number;
}
