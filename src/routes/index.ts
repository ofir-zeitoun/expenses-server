import { Express } from "express";
import "express-yields";
import expenses from "../features/expenses";
import expensesList from "src/features/expenses-list";
import expensesListMock from "../features/expenses-list/expenses-list.routes-mock";
import { healthCheck } from "../features/health-check";
import stats from "../features/stats";
import {
  errorHandler,
  catchAllRequestsLastRouteHandler,
  checkJwt,
} from "./middlewares";

export const routes = (app: Express) => {
  app.get(...healthCheck);
  app.use(checkJwt, () => {});
  app.use(...expenses);
  // app.use(...expensesList);
  app.use(...expensesListMock);
  app.use(...stats);
  app.use(catchAllRequestsLastRouteHandler, errorHandler);
};
