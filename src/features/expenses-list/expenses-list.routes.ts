import { Router, Request, Response } from "express";
import status from "http-status";
import { validateResource } from "../../routes/middlewares";
import { ExpensesListModel, ExpensesList } from "./expenses-list.model";
import { baseExpensesListSchemaNoId, expensesListIdSchema, updateExpensesListSchema } from "./expenses-list.routes-schema";

export const router = Router();

router.get("/", async (_req, res) => {
  const lists = await ExpensesListModel.find({});
  res.status(status.OK).json(lists);
});

router.post(
  "/",
  validateResource(baseExpensesListSchemaNoId),
  async (req: Request<{}, {}, ExpensesList>, res: Response) => {
    const newList = await ExpensesListModel.create(req.body);
    res.status(status.CREATED).json(newList);
  }
);

router.get("/:_id", validateResource(expensesListIdSchema), async (req: Request, res: Response) => {
  const list = await ExpensesListModel.findById(req.params._id);
  
  if (!list) {
    return res.sendStatus(status.NOT_FOUND);
  }
  
  res.status(status.OK).json(list);
});

router.put("/:_id", validateResource(updateExpensesListSchema), async (req: Request, res: Response) => {
  const updatedList = await ExpensesListModel.findByIdAndUpdate(
    req.params._id,
    req.body,
    { new: true }
    ); 
    
    if (!updatedList) {
      return res.sendStatus(status.NOT_FOUND);
  }
  
  res.status(status.OK).json(updatedList);
});

router.delete("/:_id", validateResource(expensesListIdSchema), async (req: Request, res: Response) => {
  const deletedList = await ExpensesListModel.findByIdAndDelete(req.params._id);

  if (!deletedList) {
    return res.sendStatus(status.NOT_FOUND);
  }
  res.status(status.OK).json(deletedList);
});

export default ["/api/expenses-lists", router] as [string, Router];