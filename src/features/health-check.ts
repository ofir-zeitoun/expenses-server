import { Request, RequestHandler, Response } from "express";
import status from "http-status";

export const healthCheck: [string, RequestHandler] = [
  "/health-check",
  (_req: Request, res: Response) => {
    res.sendStatus(status.OK);
  },
];
