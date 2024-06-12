import { NextFunction, Request, Response } from "express";
import status from "http-status";
import { AnyZodObject } from "zod";

interface CustomRequest extends Request {
  user?: {};
}

export const validateResource =
  (schema: AnyZodObject) =>
  (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
        user: req.user,
      });
      next();
    } catch (e: any) {
      return res.status(status.BAD_REQUEST).send(e.errors);
    }
  };
