import { Router } from "express";
import status from "http-status";
import { validateResource } from "../../routes/middlewares";
import { querySchema } from "./expenses-list.routes-schema";
import { ExpensesModel, Expense } from "../expenses/expenses.model";
import { ExpensesListModel, ExpensesList } from "./expenses-list.model";

export const router = Router();

router.get("/", validateResource(querySchema), async (req, res) => {
  console.log("Received request for fetching expense lists.");

  const parsedQuery = querySchema.safeParse(req.query);
  if (!parsedQuery.success) {
    return res
      .status(status.BAD_REQUEST)
      .json({ errors: parsedQuery.error.errors });
  }

  const { offset = "0", limit = "10", sortOrder = "desc" } = parsedQuery.data;
  const offsetNumber = parseInt(offset, 10);
  const limitNumber = parseInt(limit, 10);

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
      .sort({ createdAt: sortOrder === "asc" ? 1 : -1 })
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
      sortOrder: sortOrder,
      total: totalLists,
      data: listsWithTotal,
    });
  } catch (error) {
    console.error("Failed to fetch expenses lists:", error);
    res.status(status.INTERNAL_SERVER_ERROR).send("Internal Server Error");
  }
});

export default ["/api/expenses-list", router] as [string, Router];
