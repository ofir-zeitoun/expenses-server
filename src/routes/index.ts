import { Express } from "express";
import "express-yields";
import expenses from "../features/expenses";
import expensesList from "../features/expenses-list";
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
  app.use(...expensesList);

  app.use(catchAllRequestsLastRouteHandler, errorHandler);
};
