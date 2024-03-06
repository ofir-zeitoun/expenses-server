import { Express } from "express";
import "express-yields";
import authentication from "../features/authentication";
import expenses from "../features/expenses";
import { healthCheck } from "../features/health-check";
import { errorHandler, catchAllRequestsLastRouteHandler } from "./middlewares";

export const routes = (app: Express) => {
  app.get(...healthCheck);
  app.use(...authentication);
  app.use(...expenses);

  app.use(catchAllRequestsLastRouteHandler, errorHandler);
};
