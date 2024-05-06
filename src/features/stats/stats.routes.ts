import { Router } from "express";
import { promises as fs } from "fs";
import path from "path";
// import { ExpenseList, Expense } from "../types"; // Assuming you have these types defined somewhere

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
  const jsonPath = path.join(
    __dirname,
    "..",
    "..",
    "mock",
    "expensesListsMock.json"
  );

  try {
    const data = await fs.readFile(jsonPath, "utf8");
    const expensesListData: { expenseLists: ExpenseList[] } = JSON.parse(data);

    const totalLists = expensesListData.expenseLists.length;
    const totalExpenses = expensesListData.expenseLists.reduce(
      (sum, list) => sum + list.expenses.length,
      0
    );
    const totalAmount = expensesListData.expenseLists.reduce((sum, list) => {
      const listTotal = list.expenses.reduce(
        (sum, expense: Expense) => sum + expense.price,
        0
      );
      return sum + listTotal;
    }, 0);
    const uniqueUserIds = new Set(
      expensesListData.expenseLists.map((list) => list.creator._id)
    );
    const totalUsers = uniqueUserIds.size;

    res.json({
      totalLists,
      totalExpenses,
      totalAmount,
      totalUsers,
    });
  } catch (error) {
    console.error("Failed to read the expenses list file:", error);
    res.status(500).send("Internal Server Error");
  }
});

export default ["/mock/stats", router];
