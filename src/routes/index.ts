import { Express } from "express";
import "express-yields";
import expenses from "../features/expenses";
import { healthCheck } from "../features/health-check";
import {
  errorHandler,
  catchAllRequestsLastRouteHandler,
  checkJwt,
} from "./middlewares";

export const routes = (app: Express) => {
  app.get(...healthCheck);
  app.use(checkJwt, () => {});
  app.use(...expenses);
  // add custom error handler middleware as the last middleware
  app.use(catchAllRequestsLastRouteHandler, errorHandler);
};
