import { Express } from "express";
import { healthCheck } from "../features/health-check";
import expanses from "../features/expanses";
import { errorHandler, catchAllRequestsLastRouteHandler } from "./middlewares";

export const routes = (app: Express) => {
  app.get(...healthCheck);

  app.use(...expanses);
  // add custom error handler middleware as the last middleware
  app.use(catchAllRequestsLastRouteHandler, errorHandler);
};
