import { Router } from "express";
import { promises as fs } from "fs";
import path from "path";

export interface Expense {
  _id: string;
  createdAt: string;
  name: string;
  price: number;
  creator: {
    _id: string;
    name: string;
    image: string;
  };
}

export interface ExpenseList {
  _id: string;
  name: string;
  createdAt: string;
  creator: {
    _id: string;
    name: string;
    image: string;
  };
  expenses: Expense[];
}

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
    let expensesListData: { expensesList: ExpenseList[] };

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
    const totalExpenses = expensesListData.expensesList.reduce(
      (sum, list) => sum + list.expenses.length,
      0
    );
    const totalPrice = expensesListData.expensesList.reduce((sum, list) => {
      const listTotal = list.expenses.reduce(
        (sum, expense: Expense) => sum + expense.price,
        0
      );
      return sum + listTotal;
    }, 0);
    const uniqueUserIds = new Set(
      expensesListData.expensesList.map((list) => list.creator._id)
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
