import { Router } from "express";
import { promises as fs } from "fs";
import path from "path";
import { ExpensesModel, Expense } from "../expenses/expenses.model";
import { ExpensesList } from "../expenses-list/expenses-list.model";

export const router = Router();

router.get("/", async (req, res) => {
  const jsonPath = path.resolve(
    __dirname,
    "..",
    "..",
    "..",
    "scripts",
    "mock",
    "expensesListsMock.json"
  );
  console.log(jsonPath);

  try {
    const data = await fs.readFile(jsonPath, "utf8");
    let expensesListData: { expensesList: ExpensesList[] };

    try {
      expensesListData = JSON.parse(data);
    } catch (parseError) {
      throw new Error("Invalid JSON format");
    }

    if (
      !expensesListData.expensesList ||
      !Array.isArray(expensesListData.expensesList)
    ) {
      throw new Error("Invalid JSON structure");
    }

    const totalLists = expensesListData.expensesList.length;

    // Load all expenses
    const allExpenses = await ExpensesModel.find({});
    const expenseMap = new Map<string, Expense>(
      allExpenses.map((expense) => [expense._id.toString(), expense])
    );

    const totalExpenses = expensesListData.expensesList.reduce(
      (sum, list) => sum + list.expenses.length,
      0
    );

    const totalPrice = expensesListData.expensesList.reduce((sum, list) => {
      const listTotal = list.expenses.reduce((sum, expenseId) => {
        const expense = expenseMap.get(expenseId.toString());
        return expense ? sum + expense.price : sum;
      }, 0);
      return sum + listTotal;
    }, 0);

    const uniqueUserIds = new Set(
      expensesListData.expensesList.map((list) => list.creator.toString())
    );
    const totalUsers = uniqueUserIds.size;

    res.json({
      totalLists,
      totalExpenses,
      totalPrice,
      totalUsers,
    });
  } catch (error) {
    console.error(
      "Failed to read the expenses list file:",
      (error as Error).message
    );
    res.status(500).send("Internal Server Error");
  }
});

export default ["/api/stats", router] as [string, Router];
