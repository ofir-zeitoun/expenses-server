import { Express } from "express";
import "express-yields";
import swaggerUi from "swagger-ui-express";
import expenses from "../features/expenses";
import expensesList from "../features/expenses-list";
import { healthCheck } from "../features/health-check";
import stats from "../features/stats";
import {
  errorHandler,
  catchAllRequestsLastRouteHandler,
  checkJwt,
} from "./middlewares";
import users from "../features/users";
import { swaggerDocument, swaggerOptions } from "../swagger";

export const routes = (app: Express) => {
  app.get(...healthCheck);
  app.use(...stats);
  app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, swaggerOptions)
  );
  app.use(checkJwt, () => { });
  app.use(...users);
  app.use(...expenses);
  app.use(...expensesList);

  app.use(catchAllRequestsLastRouteHandler, errorHandler);
};
