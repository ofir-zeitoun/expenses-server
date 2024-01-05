import { Express } from "express";
import { healthCheck } from "../features/health-check";
import { errorHandler, catchAllRequestsLastRouteHandler } from "./middlewares";

export const routes = (app: Express) => {
  app.get(...healthCheck);

  // add custom error handler middleware as the last middleware
  app.use(catchAllRequestsLastRouteHandler, errorHandler);
};
