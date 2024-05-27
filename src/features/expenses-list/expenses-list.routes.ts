import { Router, Request, Response } from "express";
import status from "http-status";
import { validateResource } from "../../routes/middlewares";
import { Pagination, paginationSchema } from "./expenses-list.routes-schema";
import type { Expense } from "../expenses/expenses.model";
import { ExpensesListModel } from "./expenses-list.model";

export const router = Router();

router.get(
  "/",
  validateResource(paginationSchema),
  async (req: Request<any, any, any, Pagination>, res: Response) => {
    console.log("Received request for fetching expense lists.");

    const offsetNumber = parseInt(req.query.offset);
    const limitNumber = parseInt(req.query.limit);

    try {
      const lists = await ExpensesListModel.find({})
        .populate("creator", "name image")
        .populate({
          path: "expenses",
          populate: {
            path: "creator",
            select: "name image",
          },
        })
        .sort({ createdAt: req.query.sortOrder === "asc" ? 1 : -1 })
        .skip(offsetNumber)
        .limit(limitNumber);

      const listsWithTotal = lists.map((list) => {
        const totalExpenses = list.expenses.reduce(
          (total: number, expense: Expense) => total + expense.price,
          0
        );

        return {
          ...list.toObject(),
          totalExpenses,
        };
      });

      const totalLists = await ExpensesListModel.countDocuments();

      res.status(status.OK).json({
        offset: offsetNumber,
        limit: limitNumber,
        sortOrder: req.query.sortOrder,
        total: totalLists,
        data: listsWithTotal,
      });
    } catch (error) {
      console.error("Failed to fetch expenses lists:", error);
      res.status(status.INTERNAL_SERVER_ERROR).send("Internal Server Error");
    }
  }
);

export default ["/api/expenses-list", router] as [string, Router];
