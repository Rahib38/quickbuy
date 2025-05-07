import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

const validatedRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validateBody = await schema.parseAsync({
        body: req.body,
        cookis: req.cookies,
        query: req.query,
      });
      req.body = validateBody.body;
      return next();
    } catch (err) {
      next(err);
    }
  };
};
export default validatedRequest;
