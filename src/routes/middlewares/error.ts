import { Request, Response, NextFunction } from "express";
import status from "http-status";

export const errorHandler = (
  err: TypeError,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.headersSent) {
    return next(err);
  }

  res.status(res?.statusCode ?? status.INTERNAL_SERVER_ERROR).json({
    message: err?.message || err,
    stack: process.env.ENV_MODE === "production" ? null : err.stack,
  });
};
