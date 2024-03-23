import { Router, Request, Response } from "express";
import status from "http-status";
import { validateResource } from "../../routes/middlewares";
import { ExpensesListModel, ExpensesList } from "./expenses-list.model";
import {
  baseExpensesListSchemaNoId,
  expensesListIdSchema,
  updateExpensesListSchema,
} from "./expenses-list.routes-schema";
import { ExpansesModel } from "../expenses/expenses.model";


export const router = Router();

router.get("/", async (_req, res) => {
  const lists = await ExpensesListModel.find({});
  res.status(status.OK).json(lists);
});

router.post(
  "/",
  validateResource(baseExpensesListSchemaNoId),
  async (req: Request<{}, {}, ExpensesList>, res: Response) => {
    const expensesIds = req.body.expenses_ids.map((id) => id.toString());
    const validExpensesIds = await Promise.all(
      expensesIds.map((id) => ExpansesModel.exists({ _id: id }))
    );
    const allExpensesExist = validExpensesIds.every(Boolean);
    if (!allExpensesExist) {
      return res
        .status(400)
        .json({
          message: "One or more of the provided expenses_ids do not exist.",
        });
    }

    const newList = await ExpensesListModel.create(req.body);
    res.status(status.CREATED).json(newList);
  }
);

router.get(
  "/:id",
  validateResource(expensesListIdSchema),
  async (req: Request, res: Response) => {
    const list = await ExpensesListModel.findById(req.params.id)
                  .populate({
                    path: 'expenses_ids', 
                    model: 'expenses' 
                  });

    if (!list) {
      return res.sendStatus(status.NOT_FOUND);
    }

    res.status(status.OK).json(list);
  }
);

router.put(
  "/:id",
  validateResource(updateExpensesListSchema),
  async (req: Request, res: Response) => {
    const updatedList = await ExpensesListModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedList) {
      return res.sendStatus(status.NOT_FOUND);
    }

    res.status(status.OK).json(updatedList);
  }
);

router.delete(
  "/:id",
  validateResource(expensesListIdSchema),
  async (req: Request, res: Response) => {
    const deletedList = await ExpensesListModel.findByIdAndDelete(
      req.params.id
    );

    if (!deletedList) {
      return res.sendStatus(status.NOT_FOUND);
    }
    res.status(status.OK).json(deletedList);
  }
);

export default ["/api/expenses-lists", router] as [string, Router];
