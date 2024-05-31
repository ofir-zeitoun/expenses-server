import { Router, Request, Response } from "express";
import status from "http-status";
import { ID, returnNew } from "../../db";
import { validateResource } from "../../routes/middlewares";
import { ExpensesModel, Expense } from "./expenses.model";
import {
  baseExpensesSchemaNoId,
  expenseIdSchema,
  updateExpensesSchema,
} from "./expenses.routes-schema";

export const router = Router();

router.get("/", async (_req, res) => {
  const items = await ExpensesModel.find({}).populate("creator", "name image");
  res.status(status.OK).json(items);
});

router.post(
  "/",
  validateResource(baseExpensesSchemaNoId),
  async (req: Request<unknown, unknown, Expense>, res: Response) => {
    const newExpense = await ExpensesModel.create(req.body);
    await newExpense.populate("creator", "name image");
    res.status(status.CREATED).json(newExpense);
  }
);

router.get(
  "/:id",
  validateResource(expenseIdSchema),
  async (req: Request<ID>, res: Response) => {
    const item = await ExpensesModel.findById(req.params.id).populate(
      "creator",
      "name image"
    );

    if (!item) {
      return res.sendStatus(status.NOT_FOUND);
    }

    res.status(status.OK).json(item);
  }
);

router.put(
  "/:id",
  validateResource(updateExpensesSchema),
  async (req: Request<ID>, res: Response) => {
    const updatedExpense = await ExpensesModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      returnNew
    ).populate("creator", "name image");

    if (!updatedExpense) {
      return res.sendStatus(status.NOT_FOUND);
    }

    res.status(status.OK).json(updatedExpense);
  }
);

router.delete(
  "/:id",
  validateResource(expenseIdSchema),
  async (req: Request<ID>, res: Response) => {
    const deletedExpense = await ExpensesModel.findByIdAndDelete(req.params.id);

    if (!deletedExpense) {
      return res.sendStatus(status.NOT_FOUND);
    }
    res.status(status.OK).json(deletedExpense);
  }
);

export default ["/api/expenses", router] as [string, Router];
