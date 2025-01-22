import { Request, Response } from "express";
import status from "http-status";
import { env } from "../../utils";

export const errorHandler = (err: TypeError, _req: Request, res: Response) => {
  res.status(res?.statusCode ?? status.INTERNAL_SERVER_ERROR).json({
    message: err?.message || err,
    stack: env.envMode === "production" ? null : err.stack,
  });
};
