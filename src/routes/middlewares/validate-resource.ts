import { NextFunction, Request, Response } from "express";
import status from "http-status";
import { AnyZodObject } from "zod";

export const validateResource = (schema: AnyZodObject) => 
  (req: Request, res: Response, next: NextFunction) => {
    try {
      switch (req.method) {
        case 'POST':
          schema.parse({ body: req.body });
          break;
        case 'GET':
        case 'PUT':
          schema.parse({
            body: req.body,
            query: req.query,
            params: req.params,
          });
          break;
        default:
          throw new Error(`Unsupported request method: ${req.method}`);
      }
      next();
    } catch (e: any) {
      return res.status(status.BAD_REQUEST).send(e.errors);
    }
  };