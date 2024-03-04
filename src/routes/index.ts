import { Express } from "express";
import "express-yields";
import { healthCheck } from "../features/health-check";
import expenses from "../features/expenses";
import  authentication  from "../features/authentication";
import { errorHandler, catchAllRequestsLastRouteHandler } from "./middlewares";


export const routes = (app: Express) => {
  app.get(...healthCheck);
  app.use(...authentication);
  app.use(...expenses);

  // add custom error handler middleware as the last middleware
  app.use(catchAllRequestsLastRouteHandler, errorHandler);
};
