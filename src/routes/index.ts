import { Express } from "express";
import "express-yields";
import expenses from "../features/expenses";
import expensesList from "../features/expenses-list";
import { healthCheck } from "../features/health-check";
import stats from "../features/stats";
import {
  errorHandler,
  catchAllRequestsLastRouteHandler,
  checkJwt,
  checkUserExists,
  extractUserInfo,
} from "./middlewares";
import users from "../features/users";

export const routes = (app: Express) => {
  app.get(...healthCheck);
  app.use(checkJwt, () => {});
  app.use(extractUserInfo);
  app.use(...users);
  app.use(checkUserExists);
  app.use(...expenses);
  app.use(...expensesList);
  app.use(...stats);

  app.use(catchAllRequestsLastRouteHandler, errorHandler);
};
