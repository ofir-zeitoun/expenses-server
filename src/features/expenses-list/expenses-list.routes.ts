import { Router, Request, Response } from "express";
import status from "http-status";
import { validateResource } from "../../routes/middlewares";
import { ExpensesListModel, ExpensesListDocument } from "./expenses-list.model";
import {
  baseExpensesListSchemaNoId,
  expensesListIdSchema,
  updateExpensesListSchema,
} from "./expenses-list.routes-schema";
import { ExpensesModel } from "../expenses/expenses.model";

export const router = Router();

router.get("/", async (req, res) => {
  try {
    console.log("Received request for fetching expense lists.");

    const offset = parseInt(req.query.offset as string, 10) || 0;
    const limit = parseInt(req.query.limit as string, 10) || 10;
    const sortOrder = (req.query.sortOrder as "asc" | "desc") || "desc";

    const lists = await ExpensesListModel.find({})
      .populate("creator", "name image")
      .populate({
        path: "expenses",
        populate: {
          path: "creator",
          select: "name image",
        },
      })
      .sort({ createdAt: sortOrder === "asc" ? 1 : -1 })
      .skip(offset)
      .limit(limit);

    const listsWithTotal = lists.map((list) => {
      const totalExpenses = list.expenses.reduce(
        (total: number, expense: { price: number }) => total + expense.price,
        0
      );
      return {
        ...list.toObject(),
        totalExpenses,
      };
    });

    const totalLists = await ExpensesListModel.countDocuments();

    res.status(status.OK).json({
      offset: offset,
      limit: limit,
      sortOrder: sortOrder,
      total: totalLists,
      data: listsWithTotal,
    });
  } catch (error) {
    console.error("Failed to fetch expenses lists:", error);
    res.status(500).send("Internal Server Error");
  }
});

export default ["/api/expenses-list", router] as [string, Router];
