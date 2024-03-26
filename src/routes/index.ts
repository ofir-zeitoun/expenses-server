import { Express } from "express";
import "express-yields";
import expenses from "../features/expenses";
import { healthCheck } from "../features/health-check";
import {
  errorHandler,
  catchAllRequestsLastRouteHandler,
  checkJwt,
} from "./middlewares";
import userRoutes from "../features/users/users.routes";

export const routes = (app: Express) => {
  app.use(...userRoutes);
  app.get(...healthCheck);
  app.use(...expenses);
  app.use(checkJwt, () => {});
  // add custom error handler middleware as the last middleware
  app.use(catchAllRequestsLastRouteHandler, errorHandler);
};
