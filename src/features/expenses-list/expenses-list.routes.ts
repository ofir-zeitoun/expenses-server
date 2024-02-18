import { Router, Request, Response } from "express";
import status from "http-status";
import { validateResource } from "../../routes/middlewares";
import { ExpensesListModel, ExpensesList } from "./expenses-list.model";
import { baseExpensesListSchemaNoId, expensesListIdSchema, updateExpensesListSchema } from "./expenses-list.routes-schema";
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
    // בדוק אם המערך expenses_ids קיים והוא מערך
    if (!req.body.expenses_ids || !Array.isArray(req.body.expenses_ids)) {
      return res.status(status.BAD_REQUEST).json({ message: "expenses_ids is required and must be an array" });
    }

    // המר את כל ה-ids למחרוזות (בהנחה שהם כבר בפורמט הנכון)
    const expensesIds = req.body.expenses_ids.map(id => id.toString());

    // בדוק אם כל ה-expenses_ids קיימים במסד הנתונים
    const expensesPromises = expensesIds.map(id => ExpansesModel.findById(id).exec());
    const expensesResults = await Promise.all(expensesPromises);

    const allExpensesExist = expensesResults.every(expense => expense !== null);
    if (!allExpensesExist) {
      return res.status(status.BAD_REQUEST).json({ message: "One or more expenses_ids do not exist" });
    }

    // יצירת רשימת ההוצאות החדשה לאחר שוודאת שכל ה-expenses_ids קיימים
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