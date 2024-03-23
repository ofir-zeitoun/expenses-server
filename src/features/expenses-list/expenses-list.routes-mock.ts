import { Router } from "express";
import { promises as fs } from "fs";
import path from "path";
export const router = Router();

router.get("/", async (req, res) => {
  let jsonPath = path.join(
    __dirname,
    "..",
    "..",
    "mock",
    "expensesListsMock.json"
  );

  try {
    const data = await fs.readFile(jsonPath, "utf8");
    let expensesListData = JSON.parse(data);

    expensesListData.expenseLists = expensesListData.expenseLists.map(
      (list: { expenses: any[] }) => {
        // console.log(list.expenses);
        const expenseTotal = list.expenses.reduce(
          (sum: any, { price }: any) => sum + price,
          0
        );

        return { ...list, expenseTotal };
      }
    );

    const offset = parseInt(req.query.offset as string, 10) || 0;
    const limit =
      parseInt(req.query.limit as string, 10) ||
      expensesListData.expenseLists.length;
    const sortOrder = (req.query.sortOrder as "asc" | "desc") || "desc";

    expensesListData.expenseLists.sort(
      (
        a: { createdAt: string | number | Date },
        b: { createdAt: string | number | Date }
      ) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();

        if (sortOrder === "asc") {
          return dateA - dateB;
        } else {
          return dateB - dateA;
        }
      }
    );

    const paginatedData = expensesListData.expenseLists.slice(
      offset,
      offset + limit
    );

    res.json({
      offset: offset,
      limit: limit,
      sortOrder: sortOrder, // Add sortOrder to the response
      total: expensesListData.expenseLists.length,
      data: paginatedData,
    });
  } catch (error) {
    console.error("Failed to read the expenses list file:", error);
    res.status(500).send("Internal Server Error");
  }
});

export default ["/mock/expense-lists", router];
