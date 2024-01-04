import { NextFunction, Request, Response } from "express";
import status from "http-status";

function isNext(
  responseOrNext: Response | NextFunction
): responseOrNext is NextFunction {
  return typeof responseOrNext === "function";
}

function isRequest(
  requestOrResponse: Request | object
): requestOrResponse is Request {
  return "body" in requestOrResponse || "query" in requestOrResponse;
}

// this can be two cases:
// no route handled this request -> (req: Request, res: Response, next: NextFunction)
// some route had throw an error -> (err: TypeError, req: Request, res: Response)
export const errorHandler = (
  errorOrRequest: TypeError | Request,
  _requestOrResponse: Request | Response,
  responseOrNext: Response | NextFunction
) => {
  if (isNext(responseOrNext)) {
    // no error, but we ended up here, because no route handled it
    responseOrNext();
    return;
  }
  if (isRequest(errorOrRequest)) {
    return;
  }
  responseOrNext.status(
    responseOrNext?.statusCode ?? status.INTERNAL_SERVER_ERROR
  );

  responseOrNext.json({
    message: errorOrRequest?.message || errorOrRequest,
    stack: process.env.ENV_MODE === "production" ? null : errorOrRequest.stack,
  });
};

