import { Request, Response } from "express";
import status from "http-status";

export const catchAllRequestsLastRouteHandler = (
  _req: Request,
  res: Response
) => {
  res.status(status.NOT_FOUND).send();
};
