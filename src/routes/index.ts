import { Express } from "express";
import "express-yields";
import expenses from "../features/expenses";
import expensesList from "../features/expenses-list";
import { healthCheck } from "../features/health-check/health-check";
import stats from "../features/stats";
import {
  errorHandler,
  catchAllRequestsLastRouteHandler,
  checkJwt,
  swagger,
} from "./middlewares";
import users from "../features/users";

export const routes = (app: Express) => {
  app.get(...healthCheck);
  app.use(...stats);
  app.use(...swagger);
  app.use(checkJwt, () => { });
  app.use(...users);
  app.use(...expenses);
  app.use(...expensesList);

  app.use(catchAllRequestsLastRouteHandler, errorHandler);
};
