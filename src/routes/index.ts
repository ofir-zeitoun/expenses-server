import { Express } from "express";
import "express-yields";
import { healthCheck } from "../features/health-check";
import expenses from "../features/expenses";
import expensesList from "../features/expenses-list";
import { errorHandler, catchAllRequestsLastRouteHandler } from "./middlewares";


export const routes = (app: Express) => {
  app.get(...healthCheck);

  app.use(...expenses);
  app.use(...expensesList);

  app.use(catchAllRequestsLastRouteHandler, errorHandler);
};
